const express = require('express');
const router = express.Router();
const requiredLogin = require('../middleware/requireLogin')
const Post = require('../models/Post')

//Route-0 to get all posts of a person
router.get('/allpost', requiredLogin, (req, res) => {
    // console.log(res.json());
    Post.find().populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts })
            // console.log(posts)
        })
        .catch(err => {
            console.log(err)
        })
})


//Route- 1 to create a post ,path: post:routes/post/createpost
router.post('/createpost', requiredLogin, (req, res) => {
    const { title, body, pic } = req.body;
    // console.log(req.body);
    if (!title || !body || !pic) {

        return res.status(402).json({ error: "Plz add all the fields" })
    }
    const post = new Post({
        title,
        body,
        photo: pic, postedBy: req.user
    })

    post.save().then(result => {

        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})


//Route- 2 to view all the posts ,path: post:api/post/viewpost
router.get('/viewpost', requiredLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

//Route-3 To find a post sgned by user
router.get('/mypost', requiredLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => {
            console.log(err)
        })
})

//Route-4 API for likes
router.put('/like', requiredLogin, (req, res) => {
    // Post.findByIdAndUpdate(req.body.postId)
    //     .then(posts => {
    //         // posts[0].likes+=1
    //         res.json({ posts })
    //         console.log(posts)
    //         // console.log("posts")
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // .populate("postedBy", "_id name")

    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {

        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            console.log("liked")
            try { res.json(result) }
            catch { (err) => { console.log(err) } }
            return result
        }
    })


})

//Route-5  Unlikes
router.put('/unlike', requiredLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                // res.join(result)
                // console.log(result.likes)
                console.log("unliked")
                try { res.json(result) }
                catch { (err) => { console.log(err) } }
                return result
            }
        })

})

//Route-6 updating comments
router.put('/comment', requiredLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                try { res.json(result) }
                catch { (err) => { console.log(err) } }
            }
        })

})
module.exports = router
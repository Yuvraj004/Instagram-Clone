const express =require('express');
const mongoose =require('mongoose');
const router = express.Router();
const requireLogin =require('../middleware/requireLogin')
const Post = require('../models/post')


//Route- 1 to create a post ,path: post:api/post/createpost
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(402).json({error:"Plz add all the fields"})
    }
    const post = new Post({
        title,body,postedBy:"undefined"
    })

    post.save().then(result=>{

        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


//Route- 2 to view all the posts ,path: post:api/post/viewpost
router.get('/viewpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Route-3 To find a post sgned by user
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router
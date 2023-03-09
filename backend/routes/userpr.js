const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const requiredLogin = require('../middleware/requireLogin')
const Post = require('../models/post')
const User = require('../models/user')

//Route-1 to view the profile of other user
router.get('/userprofile/:id', requiredLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")//so that we do not send the password to server side
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

// Route-2 To follow some other user
router.put('/follow', requiredLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, 
    ((err, re) => {
        if (err) {
            return res.status(422).json({ error: err });
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true })
            .select("-password")
            .then(result => {
                res.json(result);
                // console.log(result);
            })
            .catch(err => {
                return res.status(422).json({ error: err });
            });
    })
    )
})

// Route-3 To unfollow some other user
router.put('/unfollow', (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, ((err) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, { new: true }).then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })
    }))
})


module.exports = router

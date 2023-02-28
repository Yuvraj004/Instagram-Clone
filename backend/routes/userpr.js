const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const requiredLogin = require('../middleware/requireLogin')
const Post = require('../models/Post')
const User = require('../models/User')

//Route-1 to view the profile of other user
router.get('/userprofile/:id',requiredLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")//so that we do not send the password to server side
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


module.exports =router

const express =require('express');
const mongoose =require('mongoose');
const router = express.Router();
const requireLogin =require('../middleware/requireLogin')
const Post = require('../models/post')


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


module.exports = router
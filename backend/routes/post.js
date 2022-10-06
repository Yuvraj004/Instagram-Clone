import { Router } from "express";
import mongoose from "mongoose";
import Post from "../models/post";
const router = Router();


router.post('/createpost',(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(402).json({error:"Plz add all the fields"})
    }
    const post = new Post({
        title,body,postedBy:req.user 
    })

    post.save().then(result=>{

        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


export default router
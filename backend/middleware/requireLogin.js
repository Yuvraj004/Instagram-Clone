const jwt=require("jsonwebtoken");

//taking out the jwt key
require("dotenv").config();
const KEY=process.env.JWT_KEY;


//accessing the user model
const mongoose=require("mongoose")
const User = require("../models/User");



module.exports =async (req,res,next)=>{
    const {auth} =await req.body
    //auth === Bearer ewedfanwoir
    if(!auth){res.status(401).json({error:"You must be auth logged in"})}
    
    //destructuring the token
    const token =auth.replace("Bearer ",'');

    //verifying the token
    jwt.verify(token,KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }
        //finding the userdata using the id from above
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
    })
}
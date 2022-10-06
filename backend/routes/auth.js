const express =require('express');
const router =express.Router()
const mongoose =require('mongoose');
var bcrypt = require('bcryptjs');

//importing Router function in express
const User=require('../models/User')
router.get('/',(req,res)=>{
    res.send("hello")
})

//ROUTE-1 create a User using : POST "/api/auth/signup". Doesn't require auth
router.post('/signup',async (req,res)=>{
    const {name,email,password}=req.body;
    // if(!email || !pass){
    //     res.status(201).json({error:"Please add all fields"})
    // }
    // console.log(res.body.name);
    await User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }

        //crypting password here
        bcrypt.hash(password,10)//ten is the salt here
        .then(hp=>{
            const user = new User({
                name, email, password: hp
            })
            user.save().then(user=>{
                res.json({message:"User Saved Succesfully"})
            })
            .catch(err=>{
                console.error("Not saved Error",err.message)
            })
        })
        
    })
    .catch(err=>{console.error(err.message)})
    
})
module.exports = router;
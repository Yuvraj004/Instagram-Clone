const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requiredLogin = require("../middleware/requireLogin");

//using and accessing important keys in env file
require("dotenv").config();
const JWT = "" + process.env.JWT_KEY;

//using nodemailer to reset password for an user
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(""+process.env.SendGridApi);


//importing Router function in express
const User = require("../models/user");
router.get("/", requiredLogin, (req, res) => {
  res.send("hello");
});

//ROUTE-1 create a User using : POST "/api/auth/signup". Doesn't require auth
router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password) {
    res.status(201).json({ error: "Please add all fields" })
  }
  // console.log(res.body.name);
  await User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exists" });
      }

      //crypting password here
      bcrypt.hash(password, 10) //ten is the salt here
        .then((hp) => {
          const user = new User({
            name,
            email,
            password: hp,
            pic
          });
          user.save()
            .then((user) => {
              sgMail.send({
                to: user.email,
                from: "cateye@gmail.com",
                subject: "signup success",
                html: "<h1>Welcome to Instagram</h1>"
              }, function (err, info) {
                if (err) { console.log(err.message); }
                else {
                  console.log("Email Sent Success");
                }
              })
              res.json({ message: "User Saved Succesfully" });
              windows.alert("User succesfully Saved");
            })
            .catch((err) => {
              console.error("Not saved Error", err.message);
            });
        });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

//Route-2 login the user using POST "/api/auth/login" . Authentication required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(), //custom msg can also be done
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors,returning bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("Error in validation")
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        // console.log("Error in userfinding")
        return res
          .status(400)
          .json({ error: "Please use correct credentials" });
      }
      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passCompare) {
        // console.log("Error in passcomparision")
        return res
          .status(400)
          .json({ success, error: "Please use correct credentials" });
      }
      //creating a token for a particular user
      const token = jwt.sign({ _id: user._id }, JWT);
      const { _id, name, email, followers, following, pic } = user;
      //return that token
      success = true
      return res.json({ success, token, user: { _id, name, email, followers, following, pic } })
      // return res.status(200).json({ message: "Correct credentials" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error Occured");
    }
  }
);

//Route-3 protected api for testing problem with requirelogin
router.get('/protected', requiredLogin, (req, res) => {
  res.send("Hello user")
})

//we need a token  to veriffy user therefore we use crypto module inbuilt in node js
const crypto = require('crypto')


//Route-4 Reset Password
router.post('/reset-password', (req, res) => {
  // console.log(req.body.email);
  crypto.randomBytes(32, (err, buffer) => {
    if (err) { console.log(err) }
    else {
      const token = buffer.toString("hex");
      // console.log(token);
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(422).json({ error: "User does not exists" })
          }
          user.resetToken = token
          user.expireToken = Date.now() + 300000
          user.save()
          .then(ress => {
            // console.log(ress.email)
            sgMail.send({
              to: ress.email,
              from: "theosworth@tutanota.com",
              subject: "Password RESET",
              html: `<p>You requested for password reset</p>
                <h5>Click on this <a href="http://localhost:3000/reset/${token}>LINK</a>to reset password</h5>
                `
            }, function (err, info) {
              if (err) { console.log(err); }
              else {
                res.json({ message: "Check your Email" })
                console.log(info)
              }
            })
          })
        })
    }
  })
})


//Route-5 New Password
router.post('/new-password',(req,res)=>{
  const newPass=req.body.password
  const sentToken =req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
    if(!user){
      return res.status(422).json(({error:"Trry again session Expired"}))
    }
    bcrypt.hash(newPass,10).then(hashed=>{
      user.password=hashed
      user.resetToken=undefined
      user.expireToken=undefined
      user.save().then(savedUser=>{
        res.json({message:"Password Updated Success"})
      })
    }).catch(err=>{
      console.log(err)
    })
  })
})

module.exports = router;

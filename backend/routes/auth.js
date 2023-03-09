const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requiredLogin = require("../middleware/requireLogin");

//using and accessing important keys in env file
require("dotenv").config();
const JWT = ""+process.env.JWT_KEY;

//importing Router function in express
const User = require("../models/user");
router.get("/",requiredLogin ,(req, res) => {
  res.send("hello");
});

//ROUTE-1 create a User using : POST "/api/auth/signup". Doesn't require auth
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // if(!email || !pass){
  //     res.status(201).json({error:"Please add all fields"})
  // }
  // console.log(res.body.name);
  await User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exists" });
      }

      //crypting password here
      bcrypt
        .hash(password, 10) //ten is the salt here
        .then((hp) => {
          const user = new User({
            name,
            email,
            password: hp,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "User Saved Succesfully" });
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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please use correct credentials" });
      }
      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ success, error: "Please use correct credentials" });
      }
      //creating a token for a particular user
      const token = jwt.sign({ _id: user._id }, JWT);
      const { _id, name, email,followers,following } = user;
      //return that token
      success=true
      return res.json({success,token, user: { _id, name, email,followers,following } })
      // return res.status(200).json({ message: "Correct credentials" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error Occured");
    }
  }
);

//Route-3 protected api for testing problem with requirelogin
router.get('/protected',requiredLogin,(req,res)=>{
  res.send("Hello user")
})

module.exports = router;

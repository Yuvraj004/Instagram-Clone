const mongoose = require('mongoose');
//connection between user and post  models
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ 
        type: ObjectId, 
        ref: "User",
    }],
    comments:[{
        text:{type:String},//js was considering the type string as the type of comment therefore we used the above structure instead of(type:String) only
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    

},{timestamps:true})
const Post = mongoose.model('Post', userSchema);
// //createindexes to uniquely identify each email,repetitve email will not saved separately
// User.createIndexes();
//exporting the model
module.exports = Post
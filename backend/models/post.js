const mongoose =require('mongoose');
//connection between user and post  models
const {ObjectId} = mongoose.Schema.Types 

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})
const Post = mongoose.model('Post',userSchema);
// //createindexes to uniquely identify each email,repetitve email will not saved separately
// User.createIndexes();
//exporting the model
module.exports = Post
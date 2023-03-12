const mongoose =require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/ycloud/image/upload/v1666861217/ugdpdt5jqyzfhrobjmlk.jpg"
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]

})

//creating a model for auth of user
const User = mongoose.model("User",userSchema);
// //createindexes to uniquely identify each email,repetitve email will not saved separately
// User.createIndexes();
//exporting the model
module.exports = User
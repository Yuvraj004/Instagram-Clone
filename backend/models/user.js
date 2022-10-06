const mongoose =require('mongoose');
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
    }
})

//creating a model for auth of user
const User = mongoose.model('User',userSchema);
// //createindexes to uniquely identify each email,repetitve email will not saved separately
// User.createIndexes();
//exporting the model
module.exports = User
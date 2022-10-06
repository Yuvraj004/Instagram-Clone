import { Schema, model } from 'mongoose';

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//creating a model for auth of user
const User = model('user',userSchema,'user');
//createindexes to uniquely identify each email,repetitve email will not saved separately
User.createIndexes();
//exporting the model
export default User
import pkg from 'mongoose';
const { Schema, model } = pkg;
//connection between user and post  models
const {ObjectId} = Schema.Types 

const userSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        requied:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})
const Post = model('User',userSchema);
// //createindexes to uniquely identify each email,repetitve email will not saved separately
// User.createIndexes();
//exporting the model
export default Post

const mongoose =require('mongoose');//importing mongoose functon from mongoose library used for editing mongodb
const mongoURI="mongodb+srv://yuvraj:eOoRCVRuEfSvgclO@cluster0.oofgokz.mongodb.net/?retryWrites=true&w=majority"//connecting while creating a datbase locally

//connectto mongo function to check whether database is connected or not
const client = new mongoose.Mongoose(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongoose.ServerApiVersion });
const connectToMongo = async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo Succesfully");
    })
}

//exporting the connecttoMongo function to other js files 
module.exports=connectToMongo ;
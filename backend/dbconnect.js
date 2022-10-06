
import { connect } from 'mongoose';//importing mongoose functon from mongoose library used for editing mongodb
const mongoURI="mongodb+srv://yuvraj:jsptSsu7ANL3t5hD@cluster0.oofgokz.mongodb.net/?retryWrites=true&w=majority"//connecting while creating a datbase locally

//connectto mongo function to check whether database is connected or not
const connectToMongo = async()=>{
    connect(mongoURI,()=>{
        console.log("Connected to mongo Succesfully");
    })
}

//exporting the connecttoMongo function to other js files 
export default connectToMongo ;
import mongoose from "mongoose";


const url = process.env.DB_URL;

export const connectUsingMongoose = async()=>{
    console.log(url);
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Mongodb using mongoose is connected");
    }catch(err)
    {
        console.log(err);
    }
}
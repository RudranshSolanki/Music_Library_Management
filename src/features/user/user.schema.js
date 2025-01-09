import mongoose from 'mongoose';


export const userSchema = new mongoose.Schema({
    email:{type:String,required:[true,'email is required']},
    password: {type:String,required:[true,'Password is required']},
    role: {type:String,enum:['viewer','editor','admin']}
})
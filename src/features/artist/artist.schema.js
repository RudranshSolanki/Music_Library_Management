import mongoose from "mongoose";

export const artistSchema = new mongoose.Schema({
    name:{type:String,required:[true,'Name is required']},
    grammy:{type:Number,required:[true,'Grammy award is required']},
    hidden:{type:Boolean,required:[true,'Hidden value is required']}
})
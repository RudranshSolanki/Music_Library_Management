import mongoose from "mongoose";

export const trackSchema = new mongoose.Schema({
    artist_id:{type: mongoose.Schema.Types.ObjectId,ref:'Artist',required:[true,'Artist Id required']},
    album_id:{type: mongoose.Schema.Types.ObjectId,ref:'Album',required:[true,'Album Id required']},
    name:{type:String,required:[true,'Track name is required']},
    duration:{type:Number,required:[true,'Track duration is required']},
    hidden:{type:Boolean,required:[true,'Hidden value is required']}
})
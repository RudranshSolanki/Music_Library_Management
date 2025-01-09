import mongoose from "mongoose";

export const albumSchema = new mongoose.Schema({
    artist_id:{type:mongoose.Schema.Types.ObjectId,ref:'Artist',retuired:[true,'Artist id is required']},
    name:{type:String,required:[true,'Name is required']},
    year:{type:Number,required:[true,'Year is required']},
    hidden:{type:Boolean,required:[true,'Hidde is required']}
})
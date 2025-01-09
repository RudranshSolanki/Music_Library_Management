import mongoose from "mongoose";

export const favoriteSchema = new mongoose.Schema({
    category:{type:String,enum:['artist','album','track'],required:[true,'Category is required']},
    item_id:{type:String,required:[true,'Item id required']},
    user_id:{type:String,required:[true,'User not found']}
})
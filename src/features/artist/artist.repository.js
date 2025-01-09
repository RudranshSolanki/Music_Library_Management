import mongoose from "mongoose";
import { artistSchema } from "./artist.schema.js";
import { ApplicationError } from "../../middleware/errorHandler.js";


const artistModel = mongoose.model('Artist',artistSchema);

export class ArtistRepository{
    async getAllArtists(limit,offset,grammy,hidden){
        const filter = {};
        if(grammy)
            filter.grammy = grammy;
        if(hidden != undefined)
            filter.hidden = hidden;
        return await artistModel.find(filter).skip(parseInt(offset)).limit(parseInt(limit));
    }

    async getArtist(id){
        return await artistModel.findById(id);
    }

    async addArtist(artist){
        const newArtist =  new artistModel(artist);
        await newArtist.save();
    }

    async updateArtist(id,name,grammy,hidden){
        const artist = await artistModel.findById(id);
        if(!artist)
            throw new ApplicationError(404,'Artist not found.');
        if(name != null)
            artist.name = name;
        if(grammy !=null)
            artist.grammy = grammy;
        if(hidden !=null)
            artist.hidden = hidden 
        await artist.save();
        return;
    }

    async deleteArtist(id){
        const artist = await artistModel.findById(id);
        if(!artist)
            throw new ApplicationError(404,'Artist not found.');
        await artistModel.deleteOne({_id:id});
    }
}
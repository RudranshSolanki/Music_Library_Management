import mongoose from "mongoose";
import { albumSchema } from "./album.schema.js";

const albumModel = mongoose.model('Album',albumSchema);

export class AlbumRepsitory{
    async getAllAlbums(limit,offset,artist_id,hidden){
        const filter = {}
        if(artist_id)
            filter.artist_id = artist_id
        if(hidden != undefined)
            filter.hidden = hidden;
        const albums = await albumModel.find(filter).skip(parseInt(offset)).limit(parseInt(limit)).populate('artist_id',"name").exec();
        const formattedTracks = albums.map(album => ({
            album_id: album._id,
            artist_name: album.artist_id.name,
            name: album.name,
            year: album.year,
            hidden: album.hidden,
        }));
        return formattedTracks; 
    }

    async getAlbum(id){
        return await albumModel.findById(id).populate('artist_id',"name").exec();
    }

    async addAlbum(album){
        const newAlbum = new albumModel(album);
        await newAlbum.save();

    }

    async updateAlbum(id,name,year,hidden){
        const album = await albumModel.findById(id);
        if(name)
            album.name = name;
        if(year)
            album.year = year;
        if(hidden != undefined)
            album.hidden = hidden;
        await album.save();
    }

    async deleteAlbum(id){
        await albumModel.deleteOne({_id:id});
    }
}
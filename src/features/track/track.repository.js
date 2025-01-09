import mongoose from "mongoose";
import { trackSchema } from "./track.schema.js";

const trackModel = mongoose.model('Track',trackSchema)

export class TrackRepository{
    async getAllTracks(artist_id,album_id,limit,offset,hidden){
        const filter = {}
        if(artist_id)
            filter.artist_id = artist_id;
        if(album_id)
            filter.album_id = album_id;
        if(hidden != undefined)
            filter.hidden = hidden;
        const tracks = await trackModel.find(filter).skip(parseInt(offset)).limit(parseInt(limit)).populate("artist_id", "name")
        .populate("album_id", "name")
        .exec();

        const formattedTracks = tracks.map(track => ({
            track_id: track._id,
            artist_name: track.artist_id.name,
            album_name: track.album_id.name,
            name: track.name,
            duration: track.duration,
            hidden: track.hidden,
        }));
        return formattedTracks;
    }

    async getTrack(id){
        const track = await trackModel.findById(id).populate("artist_id", "name")
        .populate("album_id", "name")
        .exec();
        const formattedTrack = {
            track_id: track._id,
            artist_name: track.artist_id.name,
            album_name: track.album_id.name,
            name: track.name,
            duration: track.duration,
            hidden: track.hidden,
        }
        return formattedTrack;
    }

    async addTrack(track){
        const newTrack = new trackModel(track);
        await newTrack.save();
    }

    async updateTracK(id,name,duration,hidden){
        const track = await trackModel.findById(id);
        if(name)
            track.name = name;
        if(duration)
            track.duration = duration;
        if(hidden != undefined)
            track.hidden = hidden;
        await track.save();
    }

    async deleteTrack(id){
        await trackModel.deleteOne({_id:id});
    }
}
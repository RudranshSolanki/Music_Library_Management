import { AlbumRepsitory } from "../album/album.repostiory.js";
import { ArtistRepository } from "../artist/artist.repository.js";
import { TrackRepository } from "./track.repository.js";

export class TrackController{
    constructor(){
        this.trackRepository = new TrackRepository();
        this.artistRepository = new ArtistRepository();
        this.albumRepository = new AlbumRepsitory();
    }

    async getAllTracks(req,res,next){
        try{
            const {limit=5,offset=0,hidden,artist_id,album_id} = req.body; 
            if(artist_id)
            {
                const validArtist = await this.artistRepository.getArtist(artist_id);
                if(!validArtist)
                    return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            }
            if(album_id)
            {
                const validAlbum = await this.albumRepository.getAlbum(album_id);
                if(!validAlbum)
                    return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            }
            const tracks = await this.trackRepository.getAllTracks(artist_id,album_id,limit,offset,hidden);
            res.status(200).send({status:200,data:tracks,message:'Tracks retrieved successfully.',error:null})
        }
        catch(err){
            next(err)
        }
    }

    async getTrack(req,res,next){
        try{
            const id = req.params.id;
            const track = await this.trackRepository.getTrack(id);
            if(!track)
                return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            res.status(200).send({status:200,data:track,message:'Track retrieved successfully.',error:null})
        }
        catch(err){
            next(err);
        }
    }

    async addTrack(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer' || role == 'editor')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const{artist_id,album_id,name,duration,hidden} = req.body;
            const validArtist = await this.artistRepository.getArtist(artist_id);
            if(!validArtist)
                return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            const validAlbum = await this.albumRepository.getAlbum(album_id);
            if(!validAlbum)
                return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            await this.trackRepository.addTrack({artist_id,album_id,name,duration,hidden});
            res.status(201).send({
                status: 201,
                data: null,
                message: "Track created successfully.",
                error: null
              })
        }   
        catch(err){
            next(err);
        }
    }

    async updateTrack(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            const track = await this.trackRepository.getTrack(id);
            if(!track)
                return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            const{name,duration,hidden} = req.body;
            await this.trackRepository.updateTracK(id,name,duration,hidden);
            res.status(204).send();
        }
        catch(err){
            next(err);
        }
    }

    async deleteTrack(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            const track = await this.trackRepository.getTrack(id);
            if(!track)
                return res.status(404).send({status:404,data:null,message:"Resource Doesn't Exist.",error:null})
            await this.trackRepository.deleteTrack(id);
            res.status(200).send({status:200,data:null,message:'Track deleted successfully.',error:null})
        }
        catch(err){
            next(err);
        }
    }
}
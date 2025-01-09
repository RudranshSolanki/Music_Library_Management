import { ApplicationError } from "../../middleware/errorHandler.js";
import { ArtistRepository } from "../artist/artist.repository.js";
import { AlbumRepsitory } from "./album.repostiory.js";

export class AlbumController{
    constructor(){
        this.albumRepository = new AlbumRepsitory();
        this.artistRepository = new ArtistRepository();
    }
    async getAllAlbums(req,res,next){
        try{
            
            const {limit=5,offset=0,artist_id,hidden} = req.query;
            if(artist_id)
            {
                const validArtist = await this.artistRepository.getArtist(artist_id);
                if(!validArtist)
                    return res.status(404).send({status:404,data:null,message:"Artist not found, not valid artist ID.",error:null})
            }
            const albums = await this.albumRepository.getAllAlbums(limit,offset,artist_id,hidden);
            res.status(200).send({"status": 200,
            "data": albums,
            "message": "Albums retrieved successfully.",
            "error": null})
        }
        catch(err){
            next(err);
        }
    }

    async getAlbum(req,res,next){
        try{
            const id = req.params.id;
            const album = await this.albumRepository.getAlbum(id);
            if(!album)
                throw new ApplicationError(404,`Resource Doesn't Exist.`)
            res.status(200).send({status:200,data:album,message:"Album retrieved successfully.",error:null})
        }
        catch(err){
            next(err);
        }
    }

    async addAlbum(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer' || role == 'editor')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const {artist_id,name,year,hidden} = req.body;
            const artist = await this.artistRepository.getArtist(artist_id);
            if(!artist)
                throw new ApplicationError(404,`Resource Doesn't Exist.`)
            await this.albumRepository.addAlbum({artist_id,name,year,hidden});
            res.status(201).send({
                status: 201,
                data: null,
                message: "Album created successfully.",
                error: null
              })
        }
        catch(err){
            next(err);
        }
    }

    async updateAlbum(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            const album = await this.albumRepository.getAlbum(id);
            if(!album)
                throw new ApplicationError(404,`Resource Doesn't Exist.`)
            const {name,year,hidden} = req.body;
            await this.albumRepository.updateAlbum(id,name,year,hidden);
            res.status(204).send();
        }
        catch(err)
        {
            next(err)
        }
    }

    async deleteAlbum(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            const album = await this.albumRepository.getAlbum(id);
            if(!album)
                throw new ApplicationError(404,`Resource Doesn't Exist.`)
            const albumName = album.name;
            await this.albumRepository.deleteAlbum(id);
            res.status(200).send({status:200,data:null,message:`Album:${albumName} deleted successfully.`,error:null})
        }
        catch(err){

        }
    }
}
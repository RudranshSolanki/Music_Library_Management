import { ArtistRepository } from "./artist.repository.js";


export class ArtistCotroller{
    constructor(){
        this.artistRepository = new ArtistRepository();
    }

    async getAllArtists(req,res,next){
        try{
            const {limit=5,offset=0,grammy,hidden} = req.query;
            const artists = await this.artistRepository.getAllArtists(limit,offset,grammy,hidden);
            res.status(200).send({"status": 200,
            "data": artists,
            "message": "Artists retrieved successfully.",
            "error": null})
        }
        catch(err){
            next(err);
        }
    }

    async getArtist(req,res,next){
        try{
            const artistId = req.params.id; 
            const artist = await this.artistRepository.getArtist(artistId);
            if(artist)
                res.status(200).send({status:200,data:artist,message:"Artist retrieved successfully.",error:null});
            else
                res.status(404).send({status:404,data:null,message:"Artist not found.",error:null})
        }
        catch(err){
            next(err);
        }
    }

    async addArtist(req,res,next){
        try{
            const role = req.userRole;
            if(role =='viewer' || role =='editor')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const {name,grammy,hidden} = req.body;
            await this.artistRepository.addArtist({name,grammy,hidden});
            res.status(201).send({status:201,data:null,message:"Artist created successfully.",error:null})
        }
        catch(err){
            next(err);
        }
    }

    async updateArtist(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            const {name,grammy,hidden} = req.body;
            await this.artistRepository.updateArtist(id,name,grammy,hidden);
            res.status(204).send();
        }
        catch(err){
            next(err);
        }
    }

    async deleteArtist(req,res,next){
        try{
            const role = req.userRole;
            if(role=='viewer')
                return res.status(403).send({status:402,data:null,message:'Forbidden Access.',error:null})
            const id = req.params.id;
            await this.artistRepository.deleteArtist(id);
            res.status(200).send({status:200,data:null,message:"Artist deleted successfully.",error:null});
        }
        catch(err)
        {
            next(err);
        }
    }
}
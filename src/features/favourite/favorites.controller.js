import { FavoriteRepository } from "./favorites.repository.js";


export class FavoriteController{
    constructor(){
        this.favoriteRepository = new FavoriteRepository();
    }     

    async getFavorites(req,res,next){
        try{
            const userId = req.userId;
            const category = req.params.category;
            const {limit = 5,offset = 0} = req.body;
            const favorites = await this.favoriteRepository.getFavorites(userId,category,limit,offset); 
            res.status(200).send({status:200,data:favorites,message:'Favorites retrieved successfully.',error:null})
        }
        catch(err){
            next(err);
        }
    }

    async addFavorite(req,res,next){
        try{
            const userId = req.userId;
            const {category,item_id} =req.body;
            await this.favoriteRepository.addFavorite(userId,category,item_id);
            res.status(201).send({status:201,data:null,message:'Favorite added successfully.',error:null})
        }
        catch(err){
            next(err);
        }
    }

    async deleteFavorite(req,res,next){
        try{
            const id = req.params.favorite_id;
            const userId = req.userId;
            await this.favoriteRepository.deleteFavorite(id,userId);
            res.status(200).send({status:200,data:null,message:'Favorite removed successfully.',error:null})
        }
        catch(err){
            next(err);
        }
    }
}
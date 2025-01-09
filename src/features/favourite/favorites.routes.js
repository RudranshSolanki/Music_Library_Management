import express from 'express'
import { FavoriteController } from './favorites.controller.js';

const favoriteRoute = express.Router();

const favoriteController = new FavoriteController();

favoriteRoute.get('/:category',(req,res,next)=>{
    favoriteController.getFavorites(req,res,next);
})

favoriteRoute.post('/add-favorite',(req,res,next)=>{
    favoriteController.addFavorite(req,res,next);
})

favoriteRoute.delete('/remove-favorite/:favorite_id',(req,res,next)=>{
    favoriteController.deleteFavorite(req,res,next);
})

export default favoriteRoute;
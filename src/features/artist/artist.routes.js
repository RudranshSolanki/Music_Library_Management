import express from 'express';
import { ArtistCotroller } from './artist.controller.js';


const artistController = new ArtistCotroller();

const artistRoute = express.Router();


artistRoute.get('/',(req,res,next)=>{
    artistController.getAllArtists(req,res,next)
})

artistRoute.get('/:id',(req,res,next)=>{
    artistController.getArtist(req,res,next);
})

artistRoute.post('/add-artist',(req,res,next)=>{
    artistController.addArtist(req,res,next);
})

artistRoute.put('/:id',(req,res,next)=>{
    artistController.updateArtist(req,res,next);
})

artistRoute.delete('/:id',(req,res,next)=>{
    artistController.deleteArtist(req,res,next);
})


export default artistRoute;
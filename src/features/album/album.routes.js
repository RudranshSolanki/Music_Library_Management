import express from 'express';
import { AlbumController } from './album.cotroller.js';


const albumRoute = express.Router();

const albumController = new AlbumController();

albumRoute.get('/',(req,res,next)=>{
    albumController.getAllAlbums(req,res,next);
})

albumRoute.get('/:id',(req,res,next)=>{
    albumController.getAlbum(req,res,next);
})

albumRoute.post('/add-album',(req,res,next)=>{
    albumController.addAlbum(req,res,next);
})

albumRoute.put('/:id',(req,res,next)=>{
    albumController.updateAlbum(req,res,next);
})

albumRoute.delete('/:id',(req,res,next)=>{
    albumController.deleteAlbum(req,res,next);
})

export default albumRoute;
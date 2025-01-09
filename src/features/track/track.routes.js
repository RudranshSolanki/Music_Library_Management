import express from 'express'
import { TrackController } from './tracks.controller.js'



const trackController = new TrackController();
const trackRoute = express.Router();


trackRoute.get('/',(req,res,next)=>{
    trackController.getAllTracks(req,res,next);
})

trackRoute.get('/:id',(req,res,next)=>{
    trackController.getTrack(req,res,next);
})

trackRoute.post('/add-track',(req,res,next)=>{
    trackController.addTrack(req,res,next);
})

trackRoute.put('/:id',(req,res,next)=>{
    trackController.updateTrack(req,res,next);
})

trackRoute.delete('/:id',(req,res,next)=>{
    trackController.deleteTrack(req,res,next);
})
export default trackRoute;


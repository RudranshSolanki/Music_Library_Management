import express from "express";

import { UserCotroller } from "./user.controller.js";
import jwtAuth from "../../middleware/jwtAuth.js";

const userController = new UserCotroller();

const userRoute = express.Router();


userRoute.get('/logout',jwtAuth,(req,res,next)=>{
    userController.logOut(req,res,next);
})

userRoute.post('/login',(req,res,next)=>{
    userController.signIn(req,res,next);
})


userRoute.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
})

userRoute.get('/users',jwtAuth,(req,res,next)=>{
    userController.getAllUser(req,res,next);
})

userRoute.post('/users/add-users',jwtAuth,(req,res,next)=>{
    userController.addUser(req,res,next);
})

userRoute.delete('users/:id',jwtAuth,(req,res,next)=>{
    userController.deleteUser(req,res,next);
})

userRoute.put('users/update-password',jwtAuth,(req,res,next)=>{
    userController.updatePassword(req,res,next);
})


export default userRoute;
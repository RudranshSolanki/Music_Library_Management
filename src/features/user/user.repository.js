import mongoose from "mongoose";

import { ApplicationError } from "../../middleware/errorHandler.js";
import { userSchema } from "./user.schema.js";


const UserModel = mongoose.model('User',userSchema);

export class UserRepository{
    async singUp(user){ 
        const userExist =await UserModel.findOne({email:user.email});
        if(userExist)
            throw new ApplicationError(409,'Email already exist');
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async validUser(email){
        const validUser = UserModel.findOne({email:email});
        return validUser;
    }

    async updatePassword(newPass,userId){
        try{
            const user = await UserModel.findById(userId);
            if(user){
                user.password = newPass;
                await user.save();
            }
        }
        catch(err){
            res
        }
    }    

    async findUserById(userId){
            const user = await UserModel.findById(userId);
            return user;
        
    }

    async getAllUser(limit,offset,role){
        const filter = {};
        if(role)
            filter.role = role;
        const users = await UserModel.find(filter, { password: 0 }).skip(parseInt(offset)).limit(parseInt(limit));
        return users;
    }

    async addUser(user){
        const userExist =await UserModel.findOne({email:user.email});
        if(userExist)
            throw new ApplicationError(409,'Email already exist');
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async deleteUser(userId){
        const userExist = await UserModel.findUserById(userId);
        if(!userExist)
            throw new ApplicationError(404,'User not found.');
        await UserModel.deleteOne({_id:userId});
        return;
    }

    async getUsers(){
        return await UserModel.find();
    }
    
    async updateRoles(){

    }
}
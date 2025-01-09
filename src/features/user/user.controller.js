import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from "./user.repository.js";
import { ApplicationError, errorHandlerMiddleware, ValidateError } from '../../middleware/errorHandler.js';

export class UserCotroller{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signUp(req,res,next){
        try{
            const {email,password} = req.body;
            const users = await this.userRepository.getUsers();
            let role = 'viewer';
            if(users.length== 0)
                role = 'admin'
            const hashedPassword = await bcrypt.hash(password,12);
            const newUser = await this.userRepository.singUp({email,password:hashedPassword,role})
            res.status(201).send({status:201,data:null,message:'User Created successfully.',error:null});
        }
        catch(err){
            next(err);
        }

    }

    async signIn(req,res,next){
        try{
            const {email,password} = req.body;
            if(email == null)
                throw new ValidateError(400,'Email is required');
            if(password == null)
                throw new ValidateError(400,'Password is required');
            const user = await this.userRepository.validUser(email);
            if(user)
            {
                const result =await bcrypt.compare(password,user.password);
                if(result)
                {
                    const token = jwt.sign({userId:user._id,userRole:user.role},process.env.JWT_SECRET,{
                        expiresIn:'1h'
                    });
                    res.status(200).cookie('jwtToken',token,{maxAge:90000,httpOnly:false}).send({status:200,data:{token:token},message:'Login successful.',error:null});
                }
                else{
                    throw new ValidateError(400,'Invalid Credentials');
                }
            }
            else{
                throw new ApplicationError(404,'User not found.')
            }
        }
        catch(err){
            next(err);
        }
    }

    async getAllUser(req,res,next){
        try{
            const {limit=5,offset=0,role} = req.query;
            const users = await this.userRepository.getAllUser(limit,offset,role);
            res.status(200).send({status:200,data:users,message:"Users retrieved successfully.",error:null})
        }
        catch(err){
            res.status(400).send({status:400,data:null,message:`Bad Request`,error:null});
        }
    }

    async addUser(req,res,next){
        try{
            if(req.userRole !='admin'){
                return res.status(403).send({status:403,data:null,message:'Forbidden Access/Operation not allowed.',error:null});
            }
            const {email,password,role} = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            const newUser = await this.userRepository.addUser({email,password:hashedPassword,role}) 
            res.status(201).send({
                "status": 201,
                "data": null,
                "message": "User created successfully.",
                "error": null
              })
        }
        catch(err){
            next(err);
        }
    }

    async deleteUser(req,res,next){
        try{
            if(req.userRole =='viewer'){
                return res.status(403).send({status:403,data:null,message:'Forbidden Access/Operation not allowed.',error:null});
            }
            const userId = req.params.id;
            if(userId != req.userId && req.userRole == 'editor')
                return res.status(403).send({status:403,data:null,message:'Forbidden Access/Operation not allowed.',error:null});
            await this.userRepository.deleteUser(userId);
            res.status(200).send({
                "status": 200,
                "data": null,
                "message": "User deleted successfully.",
                "error": null
              })
        }
        catch(err){
            next(err);
        }
    }

    async updatePassword(req,res,next){
        try{
            if(req.userRole =='viewer'){
                return res.status(403).send({status:403,data:null,message:'Forbidden Access/Operation not allowed.',error:null});
            }
            const {old_password,new_password} = req.body;
            const userId = req.userId;
            if(!userId){
                return res.status(403).send({status:403,data:null,message:'Forbidden Access/Operation not allowed.',error:null});
            }
            const validUser = await this.userRepository.findUserById(userId);
            if(validUser)
            {
                const result =await bcrypt.compare(validUser.password,old_password);
                if(result){
                    const hashedPassword = await bcrypt.hash(new_password,12);
                    await this.userRepository.updatePassword(hashedPassword,userId);
                    res.status(204).send({})
                }
                else
                    throw new Error('Invalid Old Password');
            }
            else{
                res.status(404).send({status:404,data:null,message:'User not found.',error:null})
            }
            
        }
        catch(err){
            next(err);
        }
    }

    async logOut(req,res,next){
        try {
            res.clearCookie("jwtToken");
            res.status(200).send({status:200,data:null,message:"User logged out successfully.",error:null})
        } catch (error) {
            next(error);
        }
    }
}
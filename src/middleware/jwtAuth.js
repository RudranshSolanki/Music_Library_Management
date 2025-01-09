import jwt from 'jsonwebtoken';


const jwtAuth =(req,res,next)=>{
    const {jwtToken} = req.cookies;
    if(!jwtToken)
        res.status(401).send({status:401,data:null,message:'Unauthorized Access',error:null});
    try{
        const payload = jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }
    catch(err){
        res.status(401).send({status:401,data:null,message:'Unauthorized Access',error:null});
    }
}

export default jwtAuth;

const blackListTokenModel=require('../models/blackListTokenModel');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
module.exports.isLoggedIn=async(req,res,next)=>{
    
    try{
        let token=req.cookies.token||req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized Access, please login"});
        }
        let blackListToken=await blackListTokenModel.findOne({token});
        if(blackListToken){
            return res.status(401).json({message:"Unauthorized Access, please login"});
        }
        let decoded=jwt.verify(token,process.env.JWT_SECRET);
        let user=await userModel.findOne({email:decoded.email});
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized Access, please login first"});
    }
}
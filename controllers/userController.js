const {validationResult}=require('express-validator');

const userService=require('../services/userServices');
const userModel = require('../models/userModel');
module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }
    let {fullName,email,password}=req.body;
    let {user,token}=await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,password
    })
    res.status(201).json({token,user});
}
module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let{email,password}=req.body;
    if(!email||!password){
        throw new Error("All fields are mandatory");
    }
    let user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"Incorrect email or password"});
    }
    let isMatched=await user.comparePassword(password);
    if(!isMatched){
        return res.status(401).json({message:"Incorrect email or password"});
    }
    let token=await user.generateAuthToken();
    res.status(201).json({token,user});

}
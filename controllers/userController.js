const {validationResult}=require('express-validator');

const userService=require('../services/userServices');
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
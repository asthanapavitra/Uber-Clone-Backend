const { validationResult } = require("express-validator");

const captainService = require("../services/captainServices");
const blackListTokenModel=require('../models/blackListTokenModel');

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { fullName, email, password, vehicle } = req.body;
    let { token, captain } =await  captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    res.cookie("token", token);
    return res.status(201).json({ token, captain });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
module.exports.loginCaptain=async(req,res)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        let {email,password}=req.body;
        let {token,captain}=await captainService.checkCaptain({
            email,password
        })
        res.cookie("token",token);
        return res.status(201).json({ token, captain });
    }
    catch(err){
        return res.status(401).json({ error: err.message });
    }
}

module.exports.getCaptainProfile=(req,res)=>{
    res.status(200).json({captain:req.captain})
}
module.exports.logoutCaptain=async(req,res)=>{
    let token = req.cookies.token || req.headers.authorization.split(" ")[1];
      res.clearCookie("token");
      await blackListTokenModel.create({
        token,
      });
    
      res.status(200).json({ message: "Captain logout successfully" });
}
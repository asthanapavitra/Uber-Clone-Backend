const { validationResult } = require("express-validator");

const userService = require("../services/userServices");

const blackListTokenModel = require("../models/blackListTokenModel");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    let { fullName, email, password } = req.body;
    let { user, token } = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
    });
    res.cookie("token", token);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
module.exports.getUserProfile = (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports.loginUser=async(req,res)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        let {email,password}=req.body;
        let {token,user}=await userService.checkUser({
            email,password
        })
        res.cookie("token",token);
        return res.status(201).json({ token,user });
    }
    catch(err){
        return res.status(401).json({ error: err.message });
    }
}

module.exports.logout = async (req, res) => {
  let token = req.cookies.token || req.headers.authorization.split(" ")[1];
  res.clearCookie("token");
  await blackListTokenModel.create({
    token,
  });

  res.status(200).json({ message: "User logout successfully" });
};

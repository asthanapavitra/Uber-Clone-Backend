const userModel=require('../models/userModel');
module.exports.createUser=async function({
    firstName,lastName,email,password
}){
    if(!firstName||!email||!password){
        throw new Error("All the fields are required");
    }
    let isUserExists=await userModel.findOne({email});
    if(isUserExists){
        throw new Error("Email or password incorrect");
    }
    let hashedPassword=await userModel.hashPassword(password)
    let user=await userModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password:hashedPassword
    })
    const token=user.generateAuthToken();
    return {token,user} ;
}
module.exports.checkUser=async({email,password})=>{
    if(!email||!password){
        throw new Error("All the fields are required");
    }
    let user=await userModel.findOne({email}).select('+password');
    if(!user){
        throw new Error("Email or password incorrect");
    }
    let isMatched=await user.comparePassword(password);
    if(!isMatched){
        throw new Error("Email or password incorrect");
    }
    const token=user.generateAuthToken();
    return {token,user};
}
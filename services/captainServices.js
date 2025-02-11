const captainModel=require('../models/captainModel');

module.exports.createCaptain=async function({
    firstName,lastName,email,password,color,capacity,vehicleType,plate
}){
    if(!firstName||!email||!password||!color||!capacity||!vehicleType||!plate){
        throw new Error("All the fields are required");
    }
    let isCaptainExists=await captainModel.findOne({email});
    if(isCaptainExists){
        throw new Error("Email or password incorrect");
    }
    let hashedPassword=await captainModel.hashPassword(password)
    let captain=await captainModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password:hashedPassword,
        vehicle:{
            color,
            capacity,plate,vehicleType
        }
    })
    const token=captain.generateAuthToken();
    
    return ({token,captain});
}
module.exports.checkCaptain=async({email,password})=>{
    if(!email||!password){
        throw new Error("All the fields are required");
    }
    let captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        throw new Error("Email or password incorrect");
    }
    let isMatched=await captain.comparePassword(password);
    if(!isMatched){
        throw new Error("Email or password incorrect");
    }
    const token=captain.generateAuthToken();
    return {token,captain};
}
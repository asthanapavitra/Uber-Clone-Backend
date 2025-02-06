const userModel=require('../models/userModel');

module.exports.createUser=async function({
    firstName,lastName,email,password
}){
    if(!firstName||!email||!password){
        throw new Error("All the fields are required");
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
    return {user,token};
}
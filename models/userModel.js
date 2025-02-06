const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema=mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"First name must contain atleast 3 or more characters"]
        },
        lastName:{
            type:String,
            minLength:[3,"Lastname must contain atleast 3 or more characters"]
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minLength:[11,"First name must contain atleast 11 or more characters"]
    },
    password:{
        type:String,
        minLength:[6,"Password must be atleast 6 characters long"],
        select:false
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({email:this.email,id:this._id},process.env.JWT_SECRET);

    return token;
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
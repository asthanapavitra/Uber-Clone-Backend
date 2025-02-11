const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const captainSchema=mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    vehicle:{
       color:{
        type:String,
        required:true,
        minLength:[3,"Color must be atleast 3 characters long"]
       } ,
       plate:{
        type:String,
        required:true,
        minLength:[3,"Plate number must be atleast 3 characters long"]
       },
       capacity:{
        type:Number,
        required:true,
        min:[2,'Capacity must be atleast 2 including driver'],
       },
       vehicleType:{
            type:String,
            enum:["car","motorcycle","auto"],
            required:true
       }
    },
    location:{
        lat:{
            type:String
        },
        lng:{
            type:String
        }
    }
})
captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({email:this.email,id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});

    return token;
}
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model('captain',captainSchema);
module.exports=captainModel;
const mongoose=require('mongoose');
const dbgr=require('debug')("development:mongoose")
mongoose
    .connect(process.env.MONGODB_URI+"/uber-clone")
    .then(()=>{
        dbgr("Connected");
    })
    .catch(()=>{
        dbgr(err);
    })
module.exports=mongoose;
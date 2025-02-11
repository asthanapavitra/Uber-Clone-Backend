const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const cookie=require('cookie-parser');
const userRouter=require('./routes/userRouter');
const captainRouter=require('./routes/captainRouter')
const db=require('./config/mongoose-connection')
const app=express();
app.use(cookie());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/users',userRouter);
app.use('/captains',captainRouter);
module.exports=app;
const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captainController')

router.get('/',(req,res)=>{
    res.send('From captain Router');
})
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("Firstname must be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be atleast 3 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate number must be atleast 3 characters long"),
    body('vehicle.capacity').isInt({min:2}).withMessage("Capacity must be atleast 2 including driver"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle Type')
],captainController.registerCaptain
)

module.exports=router;
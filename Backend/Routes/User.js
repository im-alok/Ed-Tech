const express = require('express');
const router = express.Router();

//***************************************************************************************
//                              USER REGISTRATION AND LOGIN
//***************************************************************************************
const {sendOTP,signup,logIn,changePassword} = require('../Controllers/Auth');
const {auth , isAdmin,isStudent,isInstructor} = require('../Middlewares/auth');
const {resetPasswordToken,updatePassword} = require('../Controllers/resetPassword');

router.post('/sendOTP',sendOTP);
router.post('/userRegistration',signup);
router.post('/userLogin',logIn);
router.put('/changePassword',auth,changePassword);

//***************************************************************************************
//                              Reset Password
//***************************************************************************************

router.post('/resetPasswordToken',resetPasswordToken);
router.put('/resetPassword',updatePassword);

module.exports=router;

//***************************************************************************************
//                              TESTING DONE
//***************************************************************************************

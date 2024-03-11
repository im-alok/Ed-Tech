const express = require('express');
const router = express.Router();

//importing the middle ware

const {auth ,isStudent,isAdmin,isInstructor} = require('../Middlewares/auth');
const {capturePayment , verifyPayment,sendPaymentSuccessEmail} = require('../Controllers/Razorpay');

router.post('/capturePayment' ,auth,isStudent,capturePayment);
router.post('/verifyPayment',auth,isStudent,verifyPayment);
router.post('/sendPaymentSuccessEmail',auth,isStudent,sendPaymentSuccessEmail)

module.exports=router;
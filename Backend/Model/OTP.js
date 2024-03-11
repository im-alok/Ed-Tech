const mongoose = require('mongoose');
const mailSender = require('../Utils/mailSender');
const otpTemplate = require('../mailTemplate/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otpValue:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60 * 5
    }
});

async function sendVerificationEmail (email,otpValue){
    try{
        const mailResponse = await mailSender(email,"Verification from Study Notion - Beta Version" ,otpTemplate(otpValue));
        //console.log(mailResponse);
    }
    catch(err){
        console.log("Error While sending Email" , err);
        throw err;
    }
}

OTPSchema.pre("save",async function(next){ 
    await sendVerificationEmail(this.email,this.otpValue);
    next();
})

module.exports = mongoose.model("OTP" , OTPSchema);
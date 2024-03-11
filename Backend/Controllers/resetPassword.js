const user = require('../Model/Users');
const mailSender = require('../Utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

exports.resetPasswordToken = async(req,res) =>{
    try {
        //get the data
        const {email} = req.body;
        //validation
        if(!email){
            return res.status(400).json({
                success:true,
                message:"please enter yout email address"
            })
        }

        //chceck whether user is present or not
        const users = await user.findOne({email});
        if(!users){
            return res.status(400).json({
                success:false,
                message:"Users does not found"
            })
        }
        
        //generating the token 
        const token = crypto.randomUUID();
        //update users by adding token and expiration time
        const updatedDetails = await user.findOneAndUpdate(
                                            {email:email},
                                            {
                                                resetPasswordToken:token,
                                                tokenExpiresIn:Date.now() + 5*60*1000,
                                            },
                                            {new:true});
                                        
        const url = `${process.env.origin}/reset-your-password/${token}`;
        await mailSender(email,"Reset Password" ,`Reset password link : ${url}`);

        return res.status(200).json({
            success:true,
            message:"Token send successfully"
        })

    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while sending the token"
        })
    }
}

exports.updatePassword = async(req,res)=>{
    try {
        
        //get the token from req body
        const {token ,newPassword , confirmNewPassword} = req.body;

        //password validation
        if(!token || !newPassword || !confirmNewPassword){
            return res.status(404).json({
                success:false,
                message:"All details not found"
            })
        }
        if(newPassword!==confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not match"
            })
        }

        //get the user details form the database using token
        const userDetails = await user.findOne({resetPasswordToken : token});
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"No token found or token is invalid"
            })
        }
        if(Date.now() > userDetails.tokenExpiresIn){
            return res.status(400).json({
                success:false,
                message:"Link expires kindly generate link again"
            })
        }

        //checking if old password and new password is same or not
        if(await bcrypt.compare(newPassword,userDetails.password)){
            return res.status(400).json({
                success:false,
                message:"new password cannot be same as old password"
            })
        }

        //hashing the password and create entry into dataBase
        const hashPassword = await bcrypt.hash(newPassword,10);
        const newUpdateDetails = await user.findOneAndUpdate(
                                                {email:userDetails.email},
                                                {
                                                    password:hashPassword,
                                                },{new:true});
        try{
            const mailResponse = await mailSender(userDetails.email,"Reset Password","Password reset Successfully");
        }catch(error){
            console.log("SOmething went wrong while sending email but password updated successfully",error);
        }
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:true,
            message:"Something went wrong while sending token"
        })
    }
}
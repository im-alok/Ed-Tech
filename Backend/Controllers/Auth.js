const user = require('../Model/Users');
const OTP=require('../Model/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile=require('../Model/Profile');
const JWT = require('jsonwebtoken');
const mailSender = require('../Utils/mailSender');

//Sending OTP
exports.sendOTP = async (req,res)=>{
    
    try {
        const {email} = req.body;

        //check whehter the user exists or not
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already Resgister"
            })
        }

        //Generate OTP
        var otp = otpGenerator.generate(4,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        //checking whether the otp is unique or not
        let duplicateOTP = await OTP.findOne({otpValue:otp});
        while(duplicateOTP){
            otp = otpGenerator.generate(4,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            duplicateOTP = await OTP.findOne({otpValue:otp});
        }

        //saving the data to the dataBase
        let otpPayloads = {email,otpValue:otp};
        const otpBody = await OTP.create(otpPayloads);
        // console.log(otpBody);
        // console.log('Otp send Successfully');
        return res.status(200).json({
            success:true,
            message:"OTP sent sucessfully",
            otp:otp
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}

//Signup
exports.signup = async(req,res) =>{
    //fetching the data
    try {
        let {firstName , lastName , email ,password ,confirmPassword,otp ,accountType} = req.body;

        if(!firstName ,!lastName ,!email,!password,!confirmPassword,!otp){
            return res.status(403).json({
                success:false,
                message:"please enter all the details"
            })
        }

        //checking if the password matches or not
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password does not match"
            });
        }

        //checking whether the user already exists or not!
        email = email.toLowerCase();
        // console.log(email);
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }

        //fintding most recent otp stored
        const otpValue = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        if(!otpValue){
            return res.status(400).json({
                success:false,
                message:"Kindly send otp first"
            })
        }
        // console.log(otpValue.otpValue);
        //check if otp matched or not
        if(otpValue.length == 0){
            return res.status(400).json({
                success:false,
                message:"Please enter the Otp"
            })
        }
        else if(otp !== otpValue.otpValue){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP! please re-enter"
            })
        }

        //hashig the password
        const hashPassword = await bcrypt.hash(password,10);

        //creating additionalDetails of users
        const profileDetails = await Profile.create({
            dob:null,
            contactNumber:null,
            gender:null,
            about:null
        })
        //creating entry to the DB
        const dataPayloads = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            accountType:accountType,
            password:hashPassword,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        };
        // console.log(dataPayloads);
        const resgisterUser = await user.create(dataPayloads);
        resgisterUser.password="";
        // console.log(resgisterUser);
        return res.status(200).json({
            success:true,
            message:"User register successfully.Kindly login",
            resgisterUser
        })
    } 
    catch (error) {
        console.log("Something occurs During Signup \n" );
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot register Something went Wrong , please try again"
        })
    }

}

//login
exports.logIn = async(req,res) =>{
    try {
        let {email , password } = req.body;
        
        //checking for email and password;;;
        if(!email ||!password){
            return res.status(403).json({
                success:false,
                message:"Please Enter all your details"
            })
        }

        //chekcing whether th euser exists or not
        email = email.toLowerCase();
        const userDetails = await user.findOne({email}).populate("additionalDetails");
        // console.log(userDetails);
        if(!userDetails){
            return res.status(401).json({
                success:true,
                message:"User does not exists kindly Sign up"
            })
        }

        //matching the passward and generate the JWT token
        if(await bcrypt.compare(password,userDetails.password)){
            payload={
                email:userDetails.email,
                id:userDetails._id,
                role:userDetails.accountType
            }
            const token = JWT.sign(payload, process.env.JWT_SECRET , {
                expiresIn:'10h'
            });
            // console.log(JWT.verify(token,process.env.JWT_SECRET));
            userDetails.token = token;
            userDetails.password=undefined;

            //create cookie and send response
            options ={
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token" , token ,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                token,
                userDetails
            })
            
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }



    } catch (error) {
        console.log("Something occurs in login \n" , error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong please login again"
        })
    }
}



//changePassword


exports.changePassword = async(req,res) =>{
    try {
        
        const {oldPassword , newPassword ,confirmNewPassword} = req.body;
        if(!oldPassword ||!newPassword||!confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(newPassword!==confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword doesnot match"
            })
        }

        const userId = req.user.id;

        if(!userId){
            return res.json({
                success:false,
                message:"User is not login"
            });
        }
        //get the user details
        const userDetails = await user.findById(userId);
        if(!await bcrypt.compare(oldPassword,userDetails.password)){
            return res.status(400).json({
                success:false,
                message:"Old password does not match"
            })
        }

        //hashing the new password
        const hashPassword = await bcrypt.hash(newPassword,10);
        await user.findOneAndUpdate({email:userDetails.email},{password:hashPassword});

        //now send the email for password updation
        try{
            const mailResponse = await mailSender(userDetails.email,"Reset Password","Password updated Successfully");
        }catch(error){
            console.log("SOmething went wrong while sending email but password updated successfully",error);
        }


        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending password"
        })
    }
}
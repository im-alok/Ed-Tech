const contactUs = require('../Model/Contactus');
const mailSender = require('../Utils/mailSender');
require('dotenv').config();

exports.contactus = async(req,res)=>{
    try {
        //fetching the data from the request body

        const {firstName,lastName,email,phoneNumber,message} = req.body;
        // validation
        if(!firstName || !lastName || !email || !phoneNumber || !message){
            return res.status(404).json({
                success:false,
                message:"All details are required"
            })
        }

        //saving data to the dataBase
        const useDetails = await contactUs.create({
            firstname:firstName,
            lastname:lastName,
            email:email,
            phonenumber:phoneNumber,
            message:message,
        })
        return res.status(200).json({
            success:true,
            message:"Thanks for contacting us we will get back to you very soon"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somethig went wrong please try again later"
        })
    }
}
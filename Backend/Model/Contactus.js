const mongoose = require('mongoose');
const mailSender = require('../Utils/mailSender');
const {contactUsEmail} = require('../mailTemplate/ContactFormTemplate');

const contactusSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:true,
    },
    lastname:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    phonenumber:{
        type:String,
        trim:true,
        required:true,
    },
    message:{
        type:String,
        trim:true,
        required:true,
    },
})

async function mailToUser(email,body){
    try {
        const mailResponse = await mailSender(email,"EdTech | H & S corp.",body);
    } catch (error) {
        console.log('something went wrong')
    }
}

//sending mail to user
contactusSchema.post('save',async function(result){
    
    await mailToUser(result.email,contactUsEmail(result.email,result.firstname,result.lastname,result.message,result.phonenumber));

})


module.exports = mongoose.model("ContactUs",contactusSchema);
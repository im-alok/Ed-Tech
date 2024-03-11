const nodeMailer = require('nodemailer');
require('dotenv').config();
const mailSender = async(email,title,body) =>{
    
    try{
        let transporter =nodeMailer.createTransport({
            
            host:"smtp.gmail.com",
            auth:{
                user:"okaydaddy695@gmail.com",
                pass:"gqlkmaqkkvgivijk"
            }
        })

        let info = await transporter.sendMail({
            from: 'StudyNotion || BetaVersion-AlokRanjan',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports=mailSender;
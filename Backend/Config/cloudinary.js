const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = ()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.CLOUD_API_KEY,
            secure:true,
            api_secret:process.env.CLOUD_SECRET_KEY
        })
        console.log('cloudinary connection successfully');
    }
    catch(error){
        console.log('something went wrong in cloudinary' , error.message);
    }
}
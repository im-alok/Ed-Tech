const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req,res,next)=>{
    
    try{
        const token = req.body.token
                                    ||req.cookies.token 
                                    || req.header("Authorization").replace("Bearer" ,"");
        // console.log(token);
        if(!token){
            return res.status(401).json({
                sucess:false,
                message:"Token is missing"
            })
        }

        //verify the token 
        try{
            // console.log('Token decoding started');
            const decode =JWT.verify(token,process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        }catch(err){
            res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }

}

//isStudent 

exports.isStudent = async(req,res,next) =>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Students"
            })
        }
        next();
    } catch (error) {
        console.log("error occur in Student",error);
    }
}

//isStudent 

exports.isInstructor = async(req,res,next) =>{
    try {
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Instructor"
            })
        }
        next();
    } catch (error) {
        console.log("error occur in instructor",error);
    }
}


//isAdmin 

exports.isAdmin = async(req,res,next) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Admin"
            })
        }
        next();
    } catch (error) {
        console.log("error occur in Admin",error);
    }
}

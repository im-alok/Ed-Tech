const mongoose = require('mongoose');
const mailSender = require('../Utils/mailSender');

const userSchema =new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,

        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            required:true,
            enum:["Admin" , "Instructor" ,"Student"]
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Profile",
            required:true,
        },
        courseEnrolled:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course",
            }
        ],
        image:{
            type:String,
            required:true,
        },
        resetPasswordToken:{
            type:String
        },
        tokenExpiresIn:{
            type:Date,
        },
        courseProgress:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ]

    }
)



module.exports = mongoose.model("Users" ,userSchema);
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true
    },
    instructor:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true
        },
    whatYouWillLearn:{
        type:String,
        required:true
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingandreview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tags",
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
        }
    ],
    status:{
        type:String,
        enum:["Draft","Published"]
    }
},{timestamps:true})

module.exports = mongoose.model("Course" , courseSchema);
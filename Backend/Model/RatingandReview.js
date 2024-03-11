const mongoose = require('mongoose');
const Courses = require('./Courses');

const ratingandreviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true
    }
})

module.exports = mongoose.model("RatingAndReview" , ratingandreviewSchema);
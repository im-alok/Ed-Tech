const ratingAndReview = require('../Model/RatingandReview');
const courses = require('../Model/Courses');
const { default: mongoose } = require('mongoose');

//create rating and review

exports.createReview = async(req,res) =>{
    try {
        
        //fetch the data
        const {courseId , rating , review } = req.body;
        const userId = req.user.id;

        //validate the data
        if(!courseId || !rating || !review){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check if user are enroled in the course or not
        const courseDetails = await courses.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}})
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in the course"
            })
        }

        //check whether the student already reviewed the course or not
        const duplicateReview = await ratingAndReview.findOne({user:userId,course:courseId});
        if(duplicateReview){
            return res.status(400).json({
                success:false,
                message:"You already created review"
            })
        }

        //creating rating and review
        const ratingandReviewDetails = await ratingAndReview.create({user:userId,rating:rating,review:review ,course:courseId});

        console.log(ratingandReviewDetails);

        //adding review to the course
        await courses.findByIdAndUpdate(courseId,
            {
                $push:{
                        ratingandreview:ratingandReviewDetails._id
                    }
            },{new:true});


        //sending response
        return res.status(200).json({
            success:true,
            message:"Review Added successfully",
            ratingandReviewDetails,
        })


    } 
    catch (error) {
        console.log(error)    ;
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


//get average rating

exports.getAverageRating = async(req,res) =>{
    try {
        // console.log(req.body)
        const {courseId} = req.query;
        // console.log(courseId)
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"course Id does not founded"
            })
        }

        //calculate average rating
        const result = await ratingAndReview.aggregate(
                                [
                                    {
                                        $match:{
                                            course:new mongoose.Types.ObjectId(courseId)
                                        },
                                    },
                                    {
                                        $group:{
                                            _id:null,
                                            averageRating:{$avg:"$rating"}
                                        }
                                    }
                                ]
                        ).exec();
        
        // console.log(result);
    
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }
        else{
            return res.status(200).json({
                success:true,
                averageRating:0,
                message:"No rating till now"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching average rating"
        })
    }
}


//getAllRating

exports.getAllRating = async(req,res) =>{
    try {
        
        const allRatingAndReview = await ratingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                                //want only that fields
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            }).exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully" ,
            ratingAndReview:allRatingAndReview
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching rating and review"
        })
    }
}
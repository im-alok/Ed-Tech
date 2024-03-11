const User = require('../Model/Users');
const Profile = require('../Model/Profile');
const Course = require('../Model/Courses');
const cloudinaryFileUpload = require('../Utils/fileUpload');
const CourseProgress = require('../Model/courseProgress');
const { convertSecondsToDuration } = require('../Utils/secToDuration');

exports.updateProfile = async(req,res)=>{
    try {
    
        const {gender , dob , about,contactNumber} = req.body;
        if(!gender || !dob || !contactNumber ||!about){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        const profileDetails = await Profile.findById(userDetails.additionalDetails);
        profileDetails.gender =gender;
        profileDetails.dob=dob;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails

        })
        
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong while updating the profile"
        })
    }
}



//delete your account
exports.deleteAccount = async(req,res)=>{
    try {
        
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User does not exists"
            })
        }

        //deleteProfile

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success:true,
            message:"user deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting account"
        })
    }
}

//get user all details

exports.getUserDetails = async(req,res) =>{
    try {
        
        const userId = req.user.id;
        const userDetails = await User.findById(userId,
                                                {
                                                    firstName:true,
                                                    lastName:true,
                                                    email:true,
                                                    accountType:true,
                                                    additionalDetails:true,
                                                    image:true
                                                })
                                                .populate("additionalDetails")
                                                .populate("courseEnrolled")
                                                .exec();
        // console.log(userDetails);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"details not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Data fetched Successfully",
            userDetails
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong while fetchig all the details"
        })
    }
}

//update users its image
exports.imageUpload = async(req,res)=>{
    try {
        //getting the id
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"USer id is not found"
            })
        }
        //getting the image file
        const imageFile = req.files.imageFile;
        if(!imageFile){
            return res.status(404).json({
                success:false,
                message:"No image file is founded"
            })
        }

        console.log('uploading to cloudinary');
        const uploadDetails = await cloudinaryFileUpload(imageFile,process.env.FOLDER);
        // console.log(uploadDetails);
        //updating entry in the dataBase
        console.log('cloud upload done and saving to dataBAse');
        const userDetails = await User.findByIdAndUpdate(userId,{image:uploadDetails.secure_url},{new:true}).populate('additionalDetails');

        userDetails.password = undefined;
        userDetails.resetPasswordToken = undefined;
        userDetails.tokenExpiresIn = undefined;

        return res.status(200).json({
            success:true,
            message:"Image uploaded Sucessfully",
            userDetails
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
        try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
            path: "courseEnrolled",
            populate: {
                path: "courseContent",
                populate: {
                path: "subSection",
                },
            },
            })
            .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courseEnrolled.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courseEnrolled[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courseEnrolled[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courseEnrolled[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                SubsectionLength +=
                    userDetails.courseEnrolled[i].courseContent[j].subSection.length
            }
            
            let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courseEnrolled[i]._id,
            userId: userId,
            })
            // console.log(courseProgressCount)
            courseProgressCount = courseProgressCount?.completedVideos.length
            // console.log(courseProgressCount)
            if (SubsectionLength === 0) {
            userDetails.courseEnrolled[i].progressPercentage = 100
            } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courseEnrolled[i].progressPercentage =
                Math.round(
                    (courseProgressCount / SubsectionLength) * 100 * multiplier
                ) / multiplier || 0
            }
        }
    
        if (!userDetails) {
            return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userId}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courseEnrolled,
        })
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        }
}

exports.instructorDashboard=async(req,res) =>{
    try {
        const courseDetails = await Course.find({instructor:req.user.id});

        const courseData = courseDetails?.map((course)=>{
            const totalStudents = course.studentsEnrolled.length;
            const totaAmountGenerated = totalStudents * course.price;

            //create a new object with additional fiels
            const courseDataWithStats={
                _id:course._id,
                courseName: course.courseName,
                courseDescription:course.courseDescription,
                totalStudents,
                totaAmountGenerated,
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success:true,
            message:'Data fetched Successfully',
            courses:courseDetails,
            InstructorData:courseData,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server down'
        })
    }
}
const tags = require('../Model/Tags');
const Section = require('../Model/Section');
const SubSection = require('../Model/SubSection');
const Courses = require('../Model/Courses');
const Users = require('../Model/Users');
const cloudinaryFileUpload = require('../Utils/fileUpload');
const { default: mongoose } = require('mongoose');
const {convertSecondsToDuration} = require('../Utils/secToDuration');
const CourseProgress = require('../Model/courseProgress');
//create course

exports.createCourse = async(req,res) =>{
    try {
        //getting the data
        const {courseName ,courseDescription, whatYouWillLearn, price ,tag} = req.body;

        let {status} = req.body;

        const thumbnail = req.files.thumbnail;
        // console.log(thumbnail);
        //validate the data
        if(!courseName||!courseDescription || !whatYouWillLearn||!price||!thumbnail||!tag){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        if(!status || status === undefined){
            status='Draft'
        }

        //getting the instructor details
        const instructorId = req.user.id;
        const instructorDetails = await Users.findById({_id:instructorId});
        // console.log('instructor details:',instructorDetails);


        if(!instructorDetails){
            return res.status(404).json({
                success:true,
                message:"No Instructor Found"
            })
        }

        //validation for tags data
        const tagDetails = await tags.findOne({tagName:tag});
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid tags / no tag found"
            })
        }
        //uploading image to the cloudinary
        const thumbnailUpload = await cloudinaryFileUpload(thumbnail,process.env.FOLDER);

        //creating entry to the dataBAse
        const courseDetails = await Courses.create(
                                            {
                                                courseName:courseName,
                                                courseDescription:courseDescription,
                                                instructor:instructorDetails._id,
                                                whatYouWillLearn:whatYouWillLearn,
                                                price:price,
                                                thumbnail:thumbnailUpload.secure_url,
                                                tags:tagDetails._id,
                                                status:status
                                            });
        // console.log('courseDetails:',courseDetails);

        //adding course to the tags
        const tagCourse = await tags.findByIdAndUpdate({_id:tagDetails._id},
                                                            {$push:{
                                                                courses:courseDetails._id
                                                            }},
                                                            {new:true}
                                                        );
        //adding course to the instructor courselist

        const instructorCourseList = await Users.findByIdAndUpdate({_id:instructorDetails._id}
        ,{
            $push:{
                courseEnrolled:courseDetails._id
            },
            
        },
        {new:true})

        res.status(200).json({
            success:true,
            message:"course created Successfully",
            courseDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong while creating courses"
        })
    }
}



//getAllcourse
exports.getAllCourses = async(req,res) =>{
    try{
        const allCourses = await Courses.find({status:"Published"},
                                            {
                                                courseName:true,
                                                courseDescription:true,
                                                instructor:true,
                                                price:true,
                                                thumbnail:true,
                                                ratingandreview:true,
                                                studentsEnrolled:true,
                                            },
                                        ).populate({
                                            path:"instructor",
                                            populate:{
                                                path:"courseEnrolled"
                                            }
                                        })
                                        .exec();
        res.status(200).json({
            success:true,
            message:"Course fetched successfully",
            allCourses
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Course not found"
        })
    }
}


//getCOurseDetails

exports.getCourseDetails = async(req,res) =>{
    try {
        
        const {courseId} = req.query;
        // console.log(courseId)
        let courseDetails = await Courses.findById({_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        select:'firstName lastName image'
                                                    }
                                                )
                                                .populate(
                                                    {
                                                        path:"courseContent",
                                                        select:"sectionName subSection",
                                                        populate:{
                                                            path:"subSection",
                                                            select:"title timeDuration description videoUrl"
                                                        }
                                                    }
                                                )
                                                .populate("ratingandreview")
                                                .populate("tags")
                                                .exec();
                // console.log(courseDetails)
                if(!courseDetails){
                    return res.status(400).json({
                        success:false,
                        message:"No course found with the given course id"
                    })
                }
                // if(courseDetails.status === 'Draft'){
                //     return res.status(400).json({
                //         success:false,
                //         message:"accessing the draft course is forbidden"
                //     })
                // }

                // console.log(courseDetails)

                let totalDurationInSeconds = 0
                courseDetails?.courseContent?.forEach((content) => {
                    content?.subSection?.forEach((subSection) => {
                        const timeDurationInSeconds = parseInt(subSection.timeDuration)
                        totalDurationInSeconds += timeDurationInSeconds
                    })
                })
            
                const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                // console.log(totalDuration);
                courseDetails = courseDetails.toObject();
                courseDetails.totalDuration = totalDuration;

                // console.log(courseDetails)

        return res.status(200).json({
            success:true,
            message:"all courses are fetched successfully",
            courseDetails:courseDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong while fetching courseDetails"
        })
    }
}

exports.deleteCourse = async(req,res)=>{
    try {
        // console.log(req);
        const {courseId} = req.body;
        if(!courseId){
            return res.status(401).json({
                success:false,
                message:"CourseId is required"
            })
        }
        //finding course details
        const courseDetails = await Courses.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }

        //remove from tag
        // const tagDetails = await tags.findById(courseDetails.tags);
        // console.log(tagDetails);
        const details=await tags.findByIdAndUpdate({_id:courseDetails.tags},
                                        {
                                            $pull:{
                                                courses:courseDetails._id
                                            }
                                        },{new:true});

        //remove courses from courses Created/courses Enrolled
        const userId = req.user.id;
        await Users.findByIdAndUpdate({_id:userId},
            {
                $pull:{
                    courseEnrolled:courseDetails._id
                }
            },{new:true});

        // Unenroll students from the course
        const studentsEnrolled = courseDetails.studentsEnrolled
        for (const studentId of studentsEnrolled) {
        await Users.findByIdAndUpdate(studentId, {
            $pull: { courseEnrolled: courseId },
        })
        }

        // Delete sections and sub-sections
        const courseSections = courseDetails.courseContent
        for (const sectionId of courseSections) {
        // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                await SubSection.findByIdAndDelete(subSectionId)
                }
            }

        // Delete the section
        await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        const deletedCourses= await Courses.findByIdAndDelete(courseId)
        return res.status(200).json({
            success:true,
            message:'course Deleted SucessFully',
            deletedCourses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.editCourseDetails = async(req,res)=>{
    try {
        
        const {courseId,tag,whatYouWillLearn} = req.body;
        if(!courseId,!tag,!whatYouWillLearn){
            return res.status(400).json({
                success:false,
                message:"All details are required"
            })
        }
        //check wehther the course is created or not
        const courseDetails = await Courses.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course Details not found"
            })
        }

        const tagDetails = await tags.findOne({tagName:tag});
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"No tags founded"
            })
        }
        const courseUpdateDetails = await Courses.findByIdAndUpdate(courseId,
                                                    {
                                                        tags:tagDetails._id,
                                                        whatYouWillLearn:whatYouWillLearn
                                                    })

        return res.status(200).json({
            success:true,
            message:"Details updated Successfully"
        })
    } catch (error) {
        consle.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating course details"
        })
    }
}

exports.getInstructorCourse = async (req,res)=>{
    try {
        
        const userId = req.user.id;
        const instructorCourse = await Users.findById(userId,{courseEnrolled:true})
                                .populate({
                                    path:"courseEnrolled",
                                    select:"courseName courseDescription courseContent instructor whatYouWillLearn price thumbnail status createdAt",
                                    
                                    populate:{
                                        path:"courseContent",
                                        select:"subSection",
                                        populate:{
                                            path:"subSection"
                                        }
                                        
                                    },
                                }).sort({createdAt:-1}).exec();
                                // console.log(instructorCourse)
        if(!instructorCourse){
            return res.status(404).json({
                success:false,
                message:"details not found"
            })
        }

        let Courses = [];

        instructorCourse.courseEnrolled.forEach((course)=>{
            let totalDurationInSeconds = 0

            course.courseContent.forEach((content) => {
                content.subSection.forEach((subSection) => {
                    const timeDurationInSeconds = parseInt(subSection.timeDuration)
                    totalDurationInSeconds += timeDurationInSeconds
                })
            })
            
            const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            course = course.toObject();
            course.totalDuration = totalDuration
            Courses.push(course)
        })
        // console.log(Courses)

        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            Courses,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching the course"
        })
    }
}

exports.publishCourse = async(req,res)=>{
    try {
        const {courseId,status} = req.body;
        if(!courseId || !status){
            return res.status(404).json({
                success:false,
                message:"All details is required"
            })
        }
        //getting the course
        const courseDetails = await Courses.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"No course is found"
            })
        }

        courseDetails.status = status;
        await courseDetails.save();

        const updatedCourseDetails = await Courses.findById(courseId);

        return res.status(200).json({
            success:true,
            message:"Course Publish SucessFully",
            updatedCourseDetails
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.query;
      const userId = req.user.id
      const courseDetails = await Courses.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("tags")
        .populate("ratingandreview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
    //   console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
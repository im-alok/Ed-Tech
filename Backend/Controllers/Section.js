const Section = require('../Model/Section');
const Courses = require('../Model/Courses');

exports.createSection = async(req,res)=>{
    try {
        
        //fetch the data 
        const {sectionName , courseId} = req.body;
        //validate the data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //IF NO COURSE THEN WHAT IS THE NEED TO CREATE SECTION
        const courseDetails = await Courses.findById(courseId);

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"No course found so no section creation"
            })
        }

        //create entry to the db
        const sectionDetails = await Section.create({sectionName});
        //adding the section to the course dataBase

        const updatedCourseDetails = await Courses.findByIdAndUpdate(
                                                        courseId,
                                                        {
                                                            $push:{
                                                            courseContent:sectionDetails._id
                                                            }
                                                        }
        ,
        {
            new:true
        }
        ).populate({
            path:"courseContent",
            populate:{
                path:'subSection'
            }
        }).exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
    } 
    
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}  

exports.updateSection = async(req,res) =>{
    try {
        const {sectionName, sectionId,courseId} = req.body;
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }

        const updateSectionData = await Section.findByIdAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true});
        
        if(!updateSectionData){
            return res.status(404).json({
                success:false,
                message:"No Section data is available"
            })
        }
        const updatedCourseDetails = await Courses.findById(courseId)
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    }).exec();

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedCourseDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Problem in updateSection"
        })
    }
}


//remove section

exports.deleteSection = async(req,res) =>{
    try {
        
        //fetching data from the parameters
        const {sectionId, courseId} = req.body;
        if(!sectionId || !courseId) {
            res.status(400).json({
                success:false,
                message:"All details are required"
            })
        }

        //finding section
        const sectionDetails = await Section.findById(sectionId);
        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"No section details is founded"
            })
        }
        //finding course details
        const courseDetails= await Courses.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"No Course details is founded"
            })
        }
        // console.log(courseDetails);

        //deleting the section from the course part
        const updatedCourseDetails = await Courses.findByIdAndUpdate(courseDetails._id,{$pull:{courseContent:sectionDetails._id}},{new:true})
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                }).exec();
        // console.log(update);

        //deleting the section
        await Section.findByIdAndDelete(sectionDetails._id);
        
        

        return res.status(200).json({
            success:true,
            message:"Course content deleted successfully",
            updatedCourseDetails
        })


    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success:true,
            message:"Something went wrong deleting section"
        })
    }
}
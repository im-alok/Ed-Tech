const SubSection = require('../Model/SubSection');
const CourseProgress= require('../Model/courseProgress');

exports.updateCourseProgress = async(req,res)=>{
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;
    try {
        
        //check whether thw subsection is valid or not
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(400).json({
                success:false,
                message:'Video details is not found'
            })
        }

        //check for old enrty
        let courseProgress = await CourseProgress.findOne({courseID:courseId,userId:userId});
        if(!courseProgress)
            res.status(404).json(
        {
            success:false,
            message:'courseProgress doesnt exist'
        })

        //check for re completing subsection

        if(courseProgress?.completedVideos?.includes(subSectionId))
            return res.json(400).json({
                success:false,
                message:'subSection Already completed'
            })

        courseProgress?.completedVideos?.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:'course completed'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
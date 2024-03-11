const Section = require('../Model/Section');
const subSection = require('../Model/SubSection');
const cloudinaryFileUpload = require('../Utils/fileUpload');
require('dotenv').config();


exports.createSubSection = async(req,res) =>{
    try {
        // console.log(req);
        const{sectionId , title , description} = req.body;
        const video = req.files.videoFile;
        //validation 
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        //uploadVideoFile to cloudinary
        const videoUpload = await cloudinaryFileUpload(video,process.env.FOLDER);

        //saving to db
        const subSectionDetails = await subSection.create(
            {
                title,
                timeDuration:videoUpload.duration,
                description,
                videoUrl:(videoUpload).secure_url
            }
            );

        //creating referance of sub section into sectionSchema
        const updatedSection = await Section.findByIdAndUpdate(sectionId ,{$push:{subSection:subSectionDetails._id}},{new:true}).populate('subSection');

        return res.status(200).json({
            success:true,
            message:"Sub-Section created Successfully",
            subSectionDetails,
            updatedSection
        })


    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//updatesubsection and delete subsection

exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body
        console.log(title);

        const subSectionDetails = await subSection.findById(subSectionId)
    
        if (!subSectionDetails) {
            return res.status(404).json({
            success: false,
            message: "SubSection not found",
            })
        }
    
        if (title !== undefined) {
            subSectionDetails.title = title
        }
    
        if (description !== undefined) {
            subSectionDetails.description = description
        }
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const uploadDetails = await cloudinaryFileUpload(
            video,
            process.env.FOLDER_NAME
            )
            subSectionDetails.videoUrl = uploadDetails.secure_url
            subSectionDetails.timeDuration = `${uploadDetails.duration}`
        }
    
        await subSectionDetails.save()
    
        // find updated section and return it
        const updatedSubSection = await subSection.findById(subSectionId);
        // console.log(updatedSubSection);

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )
    
        // console.log("updated section", updatedSection)
    
        return res.json({
            success: true,
            message: "Section updated successfully",
            updatedSection,
        })
        } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
}


exports.deleteSubSection = async(req,res) =>{
    try {
        
        const {subSectionId,sectionId} = req.body;
        const sectionDetails = await Section.findById(sectionId);
        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"No section details is founded"
            })
        }
        const subSectionDetails = await subSection.findById(subSectionId);
        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:"No subSection details is founded"
            })
        }
        //delete subsection
        await subSection.findByIdAndDelete(subSectionId);
        const updatedSubSectionDetails=await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionDetails._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Sub Section is deleted Successfully",
            updatedSubSectionDetails
        })

        //TODo:remove sub section from the section schema is is really need??? (*CHeck in testing)

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while deleting the section"
        })
    }
}
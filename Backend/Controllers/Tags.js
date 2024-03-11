const tags = require('../Model/Tags');

exports.createTags = async(req,res) =>{
    try {

        const {name, description} = req.body;
        //validation
        if(!name || !description){
            return res.status(200).json({
                success:false,
                message:"All fields are required"
            })
        }

        //saving data to the datbase
        const createdTags = await tags.create({
            tagName:name,
            description:description
        })
        res.status(200).json({
            success:true,
            message:"Tags created successfully",
            createdTags
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success:false,
            message:"Something went wrong while creating tags"
        })
    }
}

//fetch all the tags

exports.getTags  = async(req,res) =>{
    try {

        const allTags = await tags.find({} ,{tagName:true,description:true});
        return res.status(200).json({
            success:true,
            message:"tags fetched Successfully",
            tags:allTags,
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success:false,
            message:"Something went wrong while fetching tags"
        })
    }
}


//tagpagedetails

exports.tagsPageDetails = async(req,res) =>{
    try {
        //fetch the data
        const {tagId} = req.query;
        // console.log(tagId)
        //get course for specified tags
        const selectedTags = await tags.findById(tagId).populate(
                                        {
                                            path:"courses",
                                            populate:{
                                                path:"instructor",
                                                select:"firstName lastName"
                                            }
                                        }
        ).exec();

        //check if courses are available or not
        // if(!selectedTags){
        //     return res.status(400).json({
        //         success:true,
        //         message:"No particular courses are found with given course Id"
        //     })
        // }

        //get courses for different categories
        const differentTags = await tags.find({_id:{$ne:tagId}}).populate(
            {
                path:"courses",
                populate:{
                    path:"instructor",
                    select:"firstName lastName"
                }
            }
        ).exec();

        return res.status(200).json({
            success:true,
            data:{
                selectedTags,
                differentTags
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
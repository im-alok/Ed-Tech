const cloudinary = require('cloudinary').v2;

async function cloudinaryFileUpload(file,folder,height,quality){
    const options={
        use_fileName:true,
        unique_fileName:true,
        overwrite:true,
        resource_type:"auto",
        folder:folder
    }

    if(height){
        options.height = height;
    }
    if(quality){
        options.quality=quality;
    }

    const fileUpload = await cloudinary.uploader.upload(file.tempFilePath , options);

    return fileUpload;
}


module.exports = cloudinaryFileUpload;
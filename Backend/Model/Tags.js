const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
    tagName:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        trim:true,
        type:String,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ]
})

module.exports = mongoose.model("Tags" , tagsSchema);
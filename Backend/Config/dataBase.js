const mongoose = require('mongoose');
require('dotenv').config();

function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL ,{
        // useNewURLParser :true,
        // useUnifiedTopology : true
    }).then(()=>{
        console.log("DataBase Connection Successfully");
    }).catch((err)=>{
        console.log("Something went wrong");
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
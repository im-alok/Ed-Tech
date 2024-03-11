const express= require('express');
const router = express.Router();

const {auth , isAdmin,isStudent,isInstructor} = require('../Middlewares/auth');
const {updateProfile,deleteAccount, getUserDetails,imageUpload, getEnrolledCourses, instructorDashboard}=require('../Controllers/Profile');

//***************************************************************************************
//                              PROFILE ROUTE
//***************************************************************************************

router.put('/updateUserProfile',auth,updateProfile);
router.delete('/deleteAccount',auth,isStudent,deleteAccount);
router.get('/getUserDetails',auth,getUserDetails);
router.put('/imageUpload',auth,imageUpload);
router.get('/getEnrolledCourseDetails',auth,getEnrolledCourses);



//Instructor DashBoard

router.get('/instructorDashboard',auth,isInstructor,instructorDashboard);


module.exports=router;


//***************************************************************************************
//                              TESTING COMPLETED
//***************************************************************************************
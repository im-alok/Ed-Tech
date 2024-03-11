const express= require('express');
const router = express.Router();

const {auth , isAdmin,isStudent,isInstructor} = require('../Middlewares/auth');
//***************************************************************************************
//                              CREATE TAGS
//***************************************************************************************

const {createTags,getTags,tagsPageDetails} = require('../Controllers/Tags');

router.post('/createTags',auth,isAdmin,createTags);
router.get('/getAllTags',getTags);
router.get('/getAllTagsCourses',tagsPageDetails);


//***************************************************************************************
//                              CREATE COURSES
//***************************************************************************************

const {createCourse,getAllCourses,getCourseDetails,deleteCourse,editCourseDetails,getInstructorCourse,publishCourse,getFullCourseDetails} = require('../Controllers/Course');

router.post('/createCourses',auth,isInstructor,createCourse);
router.get('/getAllCourses',auth,getAllCourses);
router.get('/getCourseDetails',getCourseDetails);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.put('/editCourseDetails',auth,isInstructor,editCourseDetails);
router.get('/getInstructorCourse',auth,isInstructor,getInstructorCourse);
router.put('/publishCourse',auth,isInstructor,publishCourse);
router.get('/getFullCourseDetails',auth,isStudent,getFullCourseDetails);

//***************************************************************************************
//                              CREATE SECTIONS
//***************************************************************************************

const {createSection,updateSection,deleteSection} = require('../Controllers/Section');
router.post('/createSection',auth,isInstructor,createSection);
router.put('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);


//***************************************************************************************
//                              CREATE SUB-SECTIONS
//***************************************************************************************

const {createSubSection,updateSubSection,deleteSubSection} = require('../Controllers/subSection');
router.post('/createSubSection',auth,isInstructor,createSubSection);
router.put('/updateSubSection',auth,isInstructor,updateSubSection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubSection);


//***************************************************************************************
//                              CREATE REVIEWS
//***************************************************************************************

const {createReview,getAverageRating,getAllRating} = require('../Controllers/ratingAndReview');
router.post('/createRatingAndReview',auth,isStudent,createReview);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllRatingAndReview',getAllRating);

//***************************************************************************************
//                              Updating courseProgress
//***************************************************************************************

const {updateCourseProgress}=require('../Controllers/courseProgress');
router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress);


module.exports=router;
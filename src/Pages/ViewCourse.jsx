import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../Components/Core/View Course/CourseReviewModal";
import VideoDetailsSideBar from "../Components/Core/View Course/VideoDetailsSideBar";
import { useDispatch, useSelector } from "react-redux";
import {  getFullCourseDetails } from "../Services/operations/courseOperation";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Slices/viewCourseSlice";


function ViewCourse(){

    const [reviewModal,setReviewModal] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();
    // const {
    //     courseSectionData,
    //     courseEntireData,
    //     completedLectures,
    //     totalNoOfLectures
    // } = useSelector((state)=>state.viewCourse)
    // console.log(token)
    // console.log(reviewModal)

    useEffect(()=>{
        async function specificCourseDetails(){
            const courseData = await getFullCourseDetails(courseId,token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));

            let lecture =0;
            courseData?.courseDetails?.courseContent?.forEach((content)=>{
                lecture = lecture + content?.subSection?.length;
            })
            // console.log(lecture);

            dispatch(setTotalNoOfLectures(lecture));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            // console.log(courseData?.completedVideos?.length)
        }

        specificCourseDetails();
        // console.log(totalNoOfLectures);
    },[])

    return(
        <div>
            <div className="flex flex-wrap sm:flex-nowrap gap-10 sm:gap-5">
                <VideoDetailsSideBar reviewModal={reviewModal} setReviewModal={setReviewModal}/>

                <div className="min-h-[calc(100vh-7.23rem)] w-full sm:w-[80%] mb-10">
                    <Outlet />
                </div>
            </div>

                {
                    reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)
                }

        </div>
    )
}

export default ViewCourse;
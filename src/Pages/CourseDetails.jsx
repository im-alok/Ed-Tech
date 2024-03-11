import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getCourseDetails } from "../Services/operations/courseOperation";
import { apiConnector } from "../Services/apiConnector";
import { RatingAndReview } from "../Services/apis";
import RatingStars from "../Components/common/RatingStars";
import { IoIosTime } from "react-icons/io";
import { dateFormatter, timeFormatter } from "../Utils/dateAndTimeFormatter";
import { TbWorld } from "react-icons/tb";
import ButtonIcon from "../Components/common/ButtonIcon";
import { buyCourse } from "../Services/operations/studentFeatureApis";
import {useSelector,useDispatch} from 'react-redux'
import Error from "./Error";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { FaShare } from "react-icons/fa";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../Utils/constants";
import { addToCart } from "../Slices/cartSlice";
import Footer from "../Components/common/Footer";
import CourseContent from "../Components/Core/CourseDetails/CourseContent";


function CourseDetails(){
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    
    const {user} = useSelector((state)=>state.profile);
    const {cart} = useSelector((state)=>state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // console.log(user)


    // console.log(courseId);
    const [courseDetails,setCourseDetails] = useState(null);
    const [averageRating,setAverageRating] = useState(null);
    const [lectureCount,setLectureCount] = useState(0);
    const [confirmationModal,setConfirmationModal] = useState(null)
    const [isActive,setIsActive] = useState([]);

    function handleActive(id){
        setIsActive(
            isActive.includes(id)
            ?isActive.filter(e => e !=id)
            :isActive.concat(id)
        )
    }

    function handleCollapseAll(){
        setIsActive([]);
    }
    

    async function getCourseDetail(){
        try {
            const response = await getCourseDetails(courseId);
            if(response) setCourseDetails(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAverageRatings(){
        // console.log(courseId);
        try {
            const response = await apiConnector('GET',RatingAndReview.GET_AVG_RATING,null,null,{courseId:courseId});
            if(!response?.data?.success)
                throw new Error(response?.data?.message);

                // console.log(response?.data?.averageRating);
                setAverageRating(response?.data?.averageRating)
                
            
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        getCourseDetail();
        getAverageRatings();
        // console.log(courseDetails)
    },[courseId])

    useEffect(()=>{
        let lecture = 0;
        courseDetails?.courseContent?.forEach((content)=>{
            content?.subSection.forEach((subSection)=>{
                lecture = lecture + 1;
            })
        })
        setLectureCount(lecture);
        // console.log(lectureCount);
    },[courseDetails])


    function handleBuyCourse(){
        // console.log('printing token',token);
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
        }
        else{
            setConfirmationModal({
                text1:"You are not logged in",
                text2:"Please login to buy the course",
                btn1Text:"Login",
                btn2Text:"cancel",
                btn1Handler:()=>navigate('/login'),
                btn2Handler:()=>setConfirmationModal(null)
            })
        }

    }

    function handleAddToCart(){
        const updatedCourseDetails = {...courseDetails,avgRating:averageRating};
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR ){
            toast.error('You are an Instructor You cannot add course');
            return;
        }

        if(token){
            // console.log(courseDetails);
            dispatch(addToCart(updatedCourseDetails));
            return;
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to buy the course",
            btn1Text:"Login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate('/login'),
            btn2Handler:()=>setConfirmationModal(null)
        })
    }

    function handleShare(){
        navigator.clipboard.writeText(window.location.href);
        toast.success('link copied successfully');
    }

    if(!courseDetails){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!courseDetails)
        <Error />

    return(
        <div className="">
            <div className="bg-richblack-800 h-[450px]">
                <div className="w-10/12 mx-auto flex sm:flex-row sm:justify-between sm:flex-nowrap flex-wrap-reverse gap-10 sm:gap-0">
                    <div className="flex flex-col gap-3 sm:mt-28">
                        <p className="text-3xl font-bold text-richblack-5">{courseDetails?.courseName}</p>
                        <p className="text-richblack-300">{courseDetails?.courseDescription}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex flex-row gap-2">
                                <p className="text-yellow-50">{averageRating || 0}</p>
                                <RatingStars Review_Count={averageRating}/>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="text-richblack-5">{courseDetails?.ratingandreview.length || 0} Ratings</p>
                                <p className="text-richblack-5">{courseDetails?.studentsEnrolled?.length} students Enrolled</p>
                            </div>
                        </div>
                        <p className="font-bold text-caribbeangreen-100">Created By {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="text-richblack-25 flex gap-1 items-center">
                                <IoIosTime />
                                <p>Created At</p>
                                <p>{dateFormatter(courseDetails?.createdAt)} | </p>
                                <p>{timeFormatter(courseDetails?.createdAt)}</p>
                            </div>

                            <div className="text-richblack-25 flex gap-1 items-center">
                                <TbWorld />
                                <p>English</p>
                            </div>
                        </div>

                    </div>

                    

                    {
                        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
                        ? (
                            <div className="flex flex-col gap-3 bg-richblack-700 p-10 rounded-md w-[400px] sm:mt-24 mt-10">
                                <img 
                                src={courseDetails?.thumbnail}
                                width={350}
                                className="rounded-md"
                                />

                                <p className="text-3xl font-bold text-richblack-5">Rs {courseDetails?.price}</p>


                                <p className="text-lg font-bold text-richblack-5">This Course Include:</p>
                                <p className="text=base text-caribbeangreen-100">{courseDetails?.whatYouWillLearn}</p>

                                <button
                                onClick={handleShare}
                                >
                                    <div className="flex gap-2 items-center justify-center text-caribbeangreen-100">
                                        <p className="text-base text-semibold ">Share</p>
                                        <FaShare />
                                    </div>
                                </button>
                            </div>
                        )
                        :(
                            <div className="flex flex-col gap-3 bg-richblack-700 p-10 rounded-md w-[400px] sm:mt-24 mt-10">
                        <img 
                        src={courseDetails?.thumbnail}
                        width={350}
                        className="rounded-md"
                        />

                        <p className="text-3xl font-bold text-richblack-5">Rs {courseDetails?.price}</p>

                        <ButtonIcon 
                        text={
                            user && courseDetails?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy Now"
                        }
                        onclick={
                            user && courseDetails?.studentsEnrolled.includes(user?._id) ? ()=>{navigate('/dashboard/enrolled-courses')}
                                        : ()=>{handleBuyCourse()}
                            }
                        disabled={false}
                        type={'button'}
                        customClasses={"flex items-center justify-center"}
                        />
                        
                        {/* //Add to cart button */}

                        {
                            (!courseDetails?.studentsEnrolled.includes(user?._id)) &&(
                                    <button
                                    className="text-center bg-richblack-500 px-3 py-2 rounded-md font-semibold text-richblack-5 "
                                    onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                )
                        }

                        <p className="flex items-center justify-center text-richblack-100">30-Days Money-Back Guarantee</p>

                        <p className="text-lg font-bold text-richblack-5">This Course Include:</p>
                        <p className="text=base text-caribbeangreen-100">{courseDetails?.whatYouWillLearn}</p>

                        <button
                        onClick={handleShare}
                        >
                            <div className="flex gap-2 items-center justify-center text-caribbeangreen-100">
                                <p className="text-base text-semibold ">Share</p>
                                <FaShare />
                            </div>
                        </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col gap-5 mt-96 sm:mt-0">
                <div className="flex flex-col gap-2 mt-10 border border-richblack-500 sm:w-[750px] p-5 py-8 rounded-md">
                    <p className="text-3xl text-richblack-5">What You Will Learn</p>
                    <ul>
                        <li className="text-richblack-5">{courseDetails?.whatYouWillLearn}</li>
                    </ul>
                </div>

                {/* Course Content and Subsection */}
                <div className="text-white mt-3 flex flex-col gap-3 sm:w-[70%]">
                    <div>
                        <p className="text-3xl sm:font-medium font-bold">Course Content</p>
                    </div>

                    <div className="flex justify-between ">
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-richblack-100">
                            <p>{courseDetails?.courseContent?.length} Section(s)</p>
                            <p>{lectureCount} lecture(s)</p>
                            <p>{courseDetails?.totalDuration} total length</p>
                        </div>
                        <div>
                            <button className="text-yellow-50 font-medium"
                            onClick={handleCollapseAll}
                            >
                                Collapse All Section
                            </button>
                        </div>
                    </div>

                    {/* Section And SubSection */}
                    <CourseContent
                    course ={courseDetails}
                    isActive={isActive}
                    handleActive={handleActive}
                    />

                    <div className="mb-10">
                        <div className="flex gap-6">
                            <img 
                            src={courseDetails?.instructor?.image}
                            width={50}
                            height={50}
                            className="rounded-full object-contain"
                            />
                            <div className="flex flex-col text-richblack-100">
                                <p>Author:</p>
                                <p>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                                
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }

            <Footer />
        </div>
    )
}

export default CourseDetails
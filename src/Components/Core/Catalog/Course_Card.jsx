import { Link } from "react-router-dom";
import RatingStars from '../../common/RatingStars'
import { useEffect, useState } from "react";
import { apiConnector } from "../../../Services/apiConnector";
import { RatingAndReview } from "../../../Services/apis";

function Course_Card({course,Height}){
    const[averageRating,setAverageRating] = useState(0);

    useEffect(()=>{
        async function getAverageRatings(courseId){
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

        getAverageRatings(course._id);

    },[course])

    return(
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img 
                        src={course?.thumbnail}
                        alt="Indiviual course Thumbnail"
                        className={`${Height} w-full rounded-md object-contain`}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        {/* CourseTitle */}
                        <p className="mt-2 text-2xl font-bold  ">{course.courseName}</p>

                        {/* Instructor Namse */}
                        <p className="text-base text-richblack-300">Author: {course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                        <div className="flex gap-2 mt-5">
                            <span>{averageRating || 0}</span>
                            <RatingStars Review_Count={averageRating}/>
                            <span>{course?.ratingAndReview?.length || 0} Ratings</span>
                        </div>

                        {/* Price */}
                        <p className="text-3xl font-bold mt-3 ">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card;
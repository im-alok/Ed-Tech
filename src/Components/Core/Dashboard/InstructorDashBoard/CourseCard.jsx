import { useNavigate } from "react-router-dom";

function CourseCard({course}){
    const navigate = useNavigate();
    return(
        <div className="flex flex-col gap-3 cursor-pointer"
        onClick={()=>{navigate(`/courses/${course._id}`)}}
        >
            <img 
            src={course.thumbnail}
            width={300}
            height={200}
            className="aspect-video object-cover rounded-lg"
            />

            <div className="flex flex-col gap-3">
                <p className="text-richblack-300 text-sm font-bold">{course.courseName}</p>
                <p className="text-richblack-300 text-sm font-bold">{course?.studentEnrolled} Students | Rs. {course.price}</p>
            </div>
        </div>
    )
}

export default CourseCard;
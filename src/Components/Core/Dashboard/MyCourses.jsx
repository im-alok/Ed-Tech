import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstructorCourses } from "../../../Services/operations/courseOperation";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./Instructor Courses/CoursesTable";

function MyCourses(){
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);
    const [deletedCourses,setDeletedCourse] = useState(null);

    useEffect(()=>{
        async function fetchCourses(){
            const result = await getInstructorCourses(token);
            setCourses(result);
        }
        fetchCourses();
        // console.log(courses);
        
    },[deletedCourses])

    return(
        <div className="w-11/12 mx-auto mt-10 flex flex-col gap-7">
            <div className="flex flex-row items-center justify-between">
                <p className="text-3xl text-richblack-25 font-bold ">My Courses</p>
                <IconBtn linkto={"/dashboard/add-course"} 
                            content={
                                {
                                    icon: "FaBookOpen",
                                    text:'Create Course'
                                }
                            }
                            />
            </div>
            <div>
                {
                    courses && <CoursesTable courses={courses} setDeletedCourse={setDeletedCourse}/>
                }
            </div>
        </div>  
    )
}

export default MyCourses;
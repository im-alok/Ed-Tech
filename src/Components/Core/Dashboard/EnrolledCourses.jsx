import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { getUserEnrolledCourses } from "../../../Services/operations/profileOperation";
import CourseCard from "./Enrolled Courses/CourseCard";


function EnrolledCourses(){

    const {token} = useSelector((state)=>state.auth)
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    

    async function getAllEnrolledCourses(){
        try {
            const response = await getUserEnrolledCourses(token);
            // console.log(response);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Error Occured",error);
        }
    }

    useEffect(()=>{
        getAllEnrolledCourses();
    },[])
    

    return(
        <div className="text-white w-11/12 mx-auto flex flex-col gap-10">
            <h1 className="text-3xl text-richblack-100 font-bold mt-5">Enrolled Courses</h1>
            {
                !enrolledCourses 
                ?(<div>Loading...</div>)
                : !enrolledCourses.length
                    ?(<p>You Have not enrolled to any course Yet</p>)
                    :(
                        <div className="border border-richblack-700 rounded-2xl">
                            <div className="flex justify-between items-center p-5 bg-richblack-600 text-richblack-25 font-bold text-center">
                                <p>Course Name</p>
                                <p>Duration</p>
                                <p>Progress</p>
                            </div>

                            {/* AllcourseCards */}
                            {
                                enrolledCourses.map((course,index)=>(
                                    <div className="flex flex-col gap-2">
                                        <CourseCard course={course} key={index}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }

        </div>
    )
}

export default EnrolledCourses;
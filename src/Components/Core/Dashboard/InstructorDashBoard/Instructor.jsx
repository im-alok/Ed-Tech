import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../Services/apiConnector";
import { Profile } from "../../../../Services/apis";
import Chart from "./Chart";
import {useNavigate} from 'react-router-dom'
import CourseCard from "./CourseCard";

function Instructor(){

    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [instructorData,setInstructorData] = useState(null);
    const [courses,setCourses] = useState([]);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getAllInstructorData(){
            setLoading(true);
            try {
                const response = await apiConnector('GET',Profile.INSTRUCTOR_DASHBOARD,null,{'Authorization':'Bearer' + token});
                
                if(!response.data.success){
                    setLoading(false);
                    throw new Error(response.data.message);
                }
                // console.log(response)
                setCourses(response?.data?.courses);
                setInstructorData(response?.data?.InstructorData);
                console.log(courses,instructorData);

            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        getAllInstructorData();
    },[])

    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudents , 0);

    const totalAmount = instructorData?.reduce((acc,curr)=>acc+ curr.totaAmountGenerated ,0 );

    return(
        <div className="w-10/12 mx-auto p-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-richblack-5">Hii , {user.firstName} 👋</h1>
                <p className="text-sm text-richblack-300 font-bold">Let's Start something new</p>
            </div>
            {
                loading ? (<div className="spinner"></div>)
                        : courses.length >0 ?(
                            <div className="flex flex-col gap-10 sm:flex-row justify-between ">
                                <Chart courses={instructorData} />
                                <div className="flex flex-col gap-3 bg-richblack-800 p-7 rounded-lg sm:w-[40%] h-fit">
                                    <h2 className="text-xl text-richblack-5 font-bold min-w-[150px]">Statistics</h2>
                                    <div>
                                        <p className="text-richblack-300">Total courses</p>
                                        <p className="text-lg font-bold text-richblack-25">{courses?.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-richblack-300">total students</p>
                                        <p className="text-lg text-richblack-25 font-bold">{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className="text-richblack-300">total income</p>
                                        <p className="text-lg text-richblack-25 font-bold">Rs. {totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        )
                                            :(<div></div>)
            }

            <div className="mt-10 flex flex-col gap-5 bg-richblack-800 p-5 rounded-lg
            ">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-richblack-25 font-bold">Your Courses</p>
                    
                    <div className="text-yellow-50 text-sm font-bold cursor-pointer"
                    onClick={()=>navigate('/dashboard/my-courses')}
                    >
                        View All
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 ">
                    {
                        loading?(<div className="spinner"></div>)
                            :(
                                
                                    courses?.length > 3 ?
                                                courses?.slice(0,3)?.map((course,index)=>(
                                                    <CourseCard course={course} key={index}/>
                                                ))
                                                :
                                    courses?.map((course,index)=>(
                                        <CourseCard course={course} key={index}/>
                                    ))
                                
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Instructor;
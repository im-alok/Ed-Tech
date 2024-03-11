import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {Table, Tbody, Td, Th, Thead, Tr} from 'react-super-responsive-table'
import { dateFormatter,timeFormatter } from "../../../../Utils/dateAndTimeFormatter";
import { IoTimerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse } from "../../../../Services/operations/courseOperation";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from "react-router-dom";

function CoursesTable({courses,setDeletedCourse}){
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    async function handlerDeleteFunction(courseId){
        //for Deleting the course
        setLoading(true);
        const response = await deleteCourse(courseId,token);
        setDeletedCourse(response);
        setConfirmationModal(null);
        
        setLoading(false);
    }


    return(
        <div>
            <Table className="w-full flex flex-col gap-7">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Actions
                    </Th>
            </Tr>
        </Thead>
            {
                courses.length <=0 ? <p className="text-3xl text-white flex justify-center">No Courses Exists</p>
                :(
                    <Tbody className="text-white">
                        {
                            courses.map((courses)=>(
                                <Tr key={courses._id}  className="flex  border-b border-richblack-800 px-6 py-8 cursor-pointer sm:gap-x-10"
                                onClick={()=>navigate(`/courses/${courses._id}`)}
                                >
                                    <Td className="flex sm:flex-1 sm:gap-x-4 gap-16 md:gap-10">
                                        <div>
                                            <img src={courses?.thumbnail}
                                            className="sm:h-[150px] sm:w-[220px] rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <p
                                            className="text-lg font-semibold text-richblack-5"
                                            >{courses.courseName}</p>

                                            <p
                                            className="text-xs text-richblack-300"
                                            >
                                                {courses.courseDescription.split(" ").length >20
                                                    ? courses.courseDescription
                                                        .split(" ")
                                                        .slice(0,20)
                                                        .join(" ") + "..."
                                                    : courses.courseDescription}
                                            </p>

                                            <p
                                            className="text-[12px] text-white"
                                            >Created on: {dateFormatter(courses.createdAt)} ({timeFormatter( courses.createdAt )}) </p>
                                            
                                            <div className="flex flex-row gap-2">
                                                {
                                                    courses.status ==='Draft'
                                                    ?(<div className="flex gap-x-1 items-center bg-richblack-800 rounded-sm py-[2px] px-[4px] font-bold text-pink-200 text-sm">
                                                        <IoTimerOutline />
                                                        <p>Drafted</p>
                                                    </div>)
                                                    :(<div className="flex gap-x-1 items-center bg-richblack-800 rounded-sm py-[2px] px-[4px] font-bold text-yellow-50 text-sm">
                                                        <FaCheck />
                                                        <p>Published</p>
                                                    </div>)
                                                }
                                            </div>


                                        </div>

                                    </Td>
                                    <Td>
                                        <p className="text-sm font-medium text-richblack-100">{courses.totalDuration}</p>
                                    </Td>
                                    <Td>
                                        <p className="text-sm font-medium text-richblack-100">₹ {courses.price}</p>
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100 ">
                                        <div className="flex gap-4 text-center text-2xl">
                                            {/* <button
                                            disabled={loading}
                                            className="text-richblack-600 hover:text-richblue-400"
                                            ><GoPencil /></button> */}
                                            <button
                                            disabled={loading}
                                            className="text-richblack-600 hover:text-richblue-400"
                                            onClick={(e)=>{
                                                setConfirmationModal({
                                                    text1:"Do You want to delete this course",
                                                    text2:'All data related to this course will be deleted',
                                                    btn1Text:'Delete',
                                                    btn2Text:'Cancel',
                                                    btn1Handler:()=>handlerDeleteFunction(courses._id),
                                                    btn2Handler:()=>setConfirmationModal(null)
                                                })
                                                e.stopPropagation();
                                            }}
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </Td>

                                </Tr>
                            ))
                        }
                    </Tbody>
                )
            }
            </Table>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default CoursesTable
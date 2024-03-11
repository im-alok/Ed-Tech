import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../common/ButtonIcon";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function VideoDetailsSideBar({setReviewModal}){

    const [activeStatus,setActiveStatus] = useState(false);
    const [videoBarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const {sectionId , subSectionId} = useParams();
    const location = useLocation();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state)=>state.viewCourse)
    // console.log(courseSectionData)
    // console.log(completedLectures);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData?.length)
                return;
            //getting the index of current section
            const currSectionId = courseSectionData.findIndex((data)=>data._id === sectionId);

            //getting index of subSection Id 
            const currSubSectionId = courseSectionData[currSectionId]?.subSection?.findIndex((data)=>data._id === subSectionId);

            const activeSubSectionId = courseSectionData[currSectionId]?.subSection[currSubSectionId]._id;

            setActiveStatus(courseSectionData[currSectionId]?._id);
            setVideoBarActive(activeSubSectionId)

        })()
    },[courseEntireData,courseSectionData,location.pathname])

    return(
        <>
            <div className="text-white bg-richblack-800 sm:min-h-[calc(100vh-4.9rem)] sm:w-[calc(100vw-82%)] h-[250px] w-full
            py-4 flex flex-col gap-3 overflow-auto">

                {/* for buttons and heading */}
                {/* for buttons */}
                <div className="px-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div onClick={()=>navigate('/dashboard/enrolled-courses')}
                            className="cursor-pointer text-4xl bg-richblack-700 rounded-full p-[2px]"
                        >
                            <MdKeyboardArrowLeft />
                            
                        </div>

                        <div>
                            <ButtonIcon 
                                text={'Add Review'}
                                onclick={()=>{setReviewModal(true)}}

                            />
                        </div>
                    </div>
                    {/* for heading and title */}
                    <div>
                        <p className="mt-3 text-base font-semibold">{courseEntireData?.courseName}</p>
                        <p className="text-sm text-richblack-100">{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>
                    <div className="border border-richblack-700"></div>
                </div>


                {/* for section and subsections */}
                <div className="flex flex-col gap-2">
                    
                    {
                        courseSectionData?.map((course,index)=>(
                            <div key={index}
                            onClick={()=>{setActiveStatus(course._id)}}
                            className="cursor-pointer`"
                            >
                                {/* section */}
                                <div className="bg-richblack-600">
                                    <div className="flex justify-between p-3">
                                        <p className="text-sm font-semibold ">{course.sectionName}</p>
                                        {/* Add arrow */}
                                        {
                                            activeStatus === course._id
                                            ?(<IoIosArrowUp />)
                                            :(<IoIosArrowDown/>)
                                        }
                                    </div>

                                    {/* Subsection */}
                                    <div>
                                        {
                                            activeStatus === course._id && 
                                            (
                                                <div>
                                                    {
                                                        course?.subSection?.map((subSection,index)=>(
                                                            <div key={index}
                                                            onClick={()=>{
                                                                navigate(`view-course/${courseEntireData._id}/section/${course._id}/sub-section/${subSection._id}`)
                                                                setVideoBarActive(subSection._id)
                                                            }}
                                                            className={`flex gap-3 px-5 gap space-y-2  ${videoBarActive === subSection._id ? 'bg-yellow-200 text-richblack-900':""} text-sm font-bold p-2 cursor-pointer`}
                                                            >
                                                                <input 
                                                                type="checkbox"
                                                                checked={completedLectures.includes(subSection._id)}
                                                                onChange={()=>{}}

                                                                />
                                                                <p>{subSection?.title}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>

                                
                            </div>
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default VideoDetailsSideBar;
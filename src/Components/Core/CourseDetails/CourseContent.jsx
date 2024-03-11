import { IoIosArrowUp, IoIosVideocam } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function CourseContent({course,isActive,handleActive}){

    

    return(
        <div className="w-full mb-10">
            <div className="text-white">
                {
                    course?.courseContent?.map((content)=>(
                        <div>
                            <div className="flex justify-between items-center p-7 bg-richblack-700 cursor-pointer border border-richblack-900"
                            onClick={()=>handleActive(content?._id)}
                            >
                                <div className="flex gap-3 items-center">
                                    
                                    <div className="active:transition-all active:duration-300">
                                    {
                                        isActive?.includes(content?._id)
                                        ?(<IoIosArrowDown />)
                                        :(<IoIosArrowUp />)
                                    }
                                    </div>
                                    <p className="sm:text-base text-sm font-bold">{content?.sectionName}</p>
                                </div>
                                <p className="text-yellow-25 sm:text-base text-sm sm:font-normal font-bold">{content?.subSection?.length} lecture (s)</p>
                                
                            </div>
                            <div
                            className={`${isActive?.includes(content?._id)?"":"hidden"} transition-all duration-300`}
                            >
                                {
                                    content?.subSection?.map((subSection)=>(
                                        <div className="flex gap-2 items-center text-white bg-transparent p-7 border-2 border-richblack-800 border-collapse">
                                            <IoIosVideocam />
                                            <p>{subSection?.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseContent
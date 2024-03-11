import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { deleteSection, deleteSubSection } from "../../../../../Services/operations/courseOperation";
import { setCourse } from "../../../../../Slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";



function NestedView({handleEditSectionName}){
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [addSubSection,setAddSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);
    // const [deleteSubSection,setDeleteSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);

    const [confirmationModal,setConfirmationModal] = useState(null);
    const [loading,setLoading] = useState(false);
    // console.log(course);

    async function removeSection(sectionId,courseId){
        setLoading(true);
        let result = await deleteSection(sectionId,courseId,token);
        if(result){
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
        

        setLoading(false);
    }

    async function removeSubSection(sectionId,subSectionId){
        const response = await deleteSubSection(sectionId,subSectionId,token);
        if(response){
            //updating the subsetion part so that It can contain updated Subsection
            let result = course?.courseContent?.map((section)=>section._id === response._id ? response : section);
            let updatedCourse = {...course,courseContent:result};
            dispatch(setCourse(updatedCourse));
            setConfirmationModal(null);
        }
    }


    return (
        <div>
            <div className="rounded-lg bg-richblack-700 p-7 flex flex-col gap-4">
                {
                    course?.courseContent?.map((section)=>(
                        <details key={section?._id} open>
                            <summary className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-500">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-brown-100 text-xl ">
                                        <RxDropdownMenu />
                                        <p className="sm:text-base text-sm sm:font-normal font-bold">{section.sectionName}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 items-center">
                                    <button className=""
                                    onClick={()=>handleEditSectionName(section._id,section.sectionName)}
                                    >
                                        <GoPencil />
                                    </button>

                                    <button
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Delete this Section",
                                            text2:"All the lecture of this section will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:()=>removeSection(section._id,course._id),
                                            btn2Handler:()=>setConfirmationModal(null),
                                        })
                                    }}
                                    >
                                        <MdOutlineDelete />
                                    </button>

                                    <span>|</span>
                                    
                                    <button className={`text-lg `}>
                                        <BiSolidDownArrow />
                                    </button>

                                </div>
                            </summary>
                            
                            <div className="flex flex-col gap-3 mt-5">
                                {
                                    section?.subSection?.map((subSection)=>(
                                        <div key={subSection._id}
                                        className="p-3 flex items-center justify-between gap-x-3 border-2 border-richblack-300 text-pink-100 rounded-md bg-richblack-800 font-bold"
                                        >
                                            <div className="w-9/12 mx-auto flex items-center gap-3 text-pink-100 cursor-pointer text-[14px]"
                                            onClick={()=>setViewSubSection(subSection)}
                                            >
                                                <RxDropdownMenu />
                                                <p>{subSection.title}</p>
                                            </div>
                                            <div
                                            className="flex flex-row gap-3 items-center"
                                            >
                                                <button className=""
                                                onClick={()=>setEditSubSection({...subSection , sectionId : section._id})}
                                                >
                                                    <GoPencil />
                                                </button>

                                                <button
                                                onClick={()=>{
                                                    setConfirmationModal({
                                                        text1:"Delete this Sub Section",
                                                        text2:"Selected lecture will be deleted",
                                                        btn1Text:"Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler:()=>removeSubSection(section._id,subSection._id),
                                                        btn2Handler:()=>setConfirmationModal(null),
                                                    })
                                                }}
                                                >
                                                    <MdOutlineDelete />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button
                                onClick={()=>setAddSubSection(section._id)}
                                className="w-fit mt-4 flex items-center gap-x-2 text-richblack-900 p-1 px-2 rounded-md  border border-richblack-300 bg-yellow-50 "
                                >
                                    <IoIosAddCircle />
                                    <p>add Lecture</p>
                                </button>

                            </div>  



                        </details>
                    ))
                }
            </div>
                {
                    addSubSection 
                    ? (<SubSectionModal modalData={addSubSection} add={true} 
                        setModalData={setAddSubSection}
                    />)
                    : viewSubSection 
                                    ? (<SubSectionModal modalData={viewSubSection} view={true}
                                        setModalData={setViewSubSection}
                                    />)
                                    : editSubSection
                                                    ? (<SubSectionModal 
                                                        modalData={editSubSection} 
                                                        edit={true}
                                                        setModalData={setEditSubSection}
                                                        />)
                                                    :(<div></div>)
                }

            {
                confirmationModal && (<ConfirmationModal modalData={confirmationModal}/>)
            }
        </div>
    )
}

export default NestedView;
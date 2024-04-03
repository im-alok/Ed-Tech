import { useForm } from "react-hook-form";
import ButtonIcon from '../../../../common/ButtonIcon'
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import NestedView from "./NestedView";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../../Slices/courseSlice";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import {createSection, editSection} from '../../../../../Services/operations/courseOperation';
function CourseBuilderForm(){

    const {
        register,
        handleSubmit,
        setValue,
        formState :{errors}
    } = useForm();
    const [editSectionName,setEditSectionName] = useState(false);
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    function cancelEdit(){
        setEditSectionName(null);
        setValue('sectionName',"");
    }
    function gotoNext(){
        // console.log(course?.courseContent.length);
        if(course.courseContent.length === 0){
            toast.error("please add atleast one Section");
            return;
        }
        if(course?.courseContent.some((section)=>section.subSection.length === 0)){
            toast.error('Please add atleast one leacture in each section');
            return ;
        }

        dispatch(setStep(3));
    }

    function goBack(){
        dispatch(setStep(1));
        //make sure you are right now updating the course so make sure to name editcourseFlag true
    }

    async function onSubmit(data){
        setLoading(true);
        let result;
        if(editSectionName){
            //we are editing the section name
            result = await editSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token);
        }
        else{
            //create subsection 
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id,
            },token);
        }

        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }
        // console.log(course);
        setLoading(false);
    }

    function handleEditSectionName(sectionId,sectionName){
        if(sectionId === editSectionName){
            setEditSectionName(null);
            setValue('sectionName',"");
        }
        setValue('sectionName',sectionName);
        setEditSectionName(sectionId);
    }

    return(
        <>
            <div className="mt-10 rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-6">
                <p className="text-3xl font-medium text-richblack-5">Course Builder</p>
                <form
                className="flex  flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        <label className="lable-style">
                            Section Name<span className="text-pink-200 text-lg">*</span>
                        </label>
                        <input 
                        name="sectionName"
                        id="sectionName"
                        placeholder="add section name"
                        {...register('sectionName',{required:true})}
                        className="form-style"
                        />
                        {
                            errors.sectionName && <span className="-mt-1 text-[12px] text-yellow-100">Section Name is required</span>
                        }
                    </div>
                    <div className="flex gap-5 items-baseline">
                        <ButtonIcon 
                        type={"submit"}
                        text={editSectionName ? "Edit Section Name" : "Create Section "}
                        outline={false}
                        >
                            <div className="text-2xl">
                                <IoIosAddCircle />
                            </div>
                        </ButtonIcon>

                        {
                            editSectionName && (<button
                                className="text-base font-medium text-richblack-300 underline"
                                onClick={cancelEdit}
                                >
                                    Cancel Edit
                                
                                </button>)
                        }
                    </div> 
                </form>
                
                {
                    course?.courseContent?.length > 0 && (
                        <NestedView handleEditSectionName={handleEditSectionName}/>
                    )
                }

                <div className="flex justify-end gap-x-3">
                    {/* <button
                    className:"rounded-md coursor-pointer flex items-center"
                    onclick={goBack}
                    >
                        Back
                    </button> */}
                    <ButtonIcon 
                    text={"Next"}
                    onclick={gotoNext}
                    outline={false}
                    >
                        <FaArrowRight />
                    </ButtonIcon>
                </div>

            </div>
        </>
    )
}

export default CourseBuilderForm;

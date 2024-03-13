import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../Slices/courseSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonIcon from "../../../../common/ButtonIcon";
import { COURSE_STATUS } from "../../../../../Utils/constants";
import { useNavigate } from "react-router-dom";
import { publishCourse } from "../../../../../Services/operations/courseOperation";

function CoursePubishForm(){

    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors},
        getValues
    } = useForm();

    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue('public',true);
        }
    },[])

    function gotoCourses(){
        dispatch(resetCourseState());
        navigate('/dashboard/my-courses');
    }

    async function handleCoursePublish(){
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues('public')=== true) || (course?.status === COURSE_STATUS.DRAFT && getValues('public')===false)){
            //no updation in form 
            //no need to make API call
            gotoCourses();
            return;
        }
        //if form is updated 
        const formData = new FormData();
        formData.append('courseId',course._id);
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED :COURSE_STATUS.DRAFT
        formData.append('status',courseStatus);

        //calling api for publishing the course
        setLoading(true);
        const response = await publishCourse(formData,token);
        if(response){
            gotoCourses();
        }
        setLoading(false);


    }

    async function onSubmit(data){
        handleCoursePublish();
    }

    return(
        <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 mt-10">
            <p className="text-2xl text-richblack-50 font-semibold
            ">Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
            >
                
                <div className="flex ">
                    <input 
                    type="checkbox"
                    id="public"
                    {...register('public',{required:true})}
                    className="w-16"
                    />
                    <label htmlFor="public"
                    className="text-base font-medium"
                    >
                        Make this course Public
                    </label>
                    {
                        errors.public && <p className="text-sm text-pink-300 font-bold ">Please publish your course</p>
                    }
                </div>

                <div className="flex gap-3 flex-row-reverse">
                    <button
                    disabled={loading}
                    type="button"
                    onClick={()=>dispatch(setStep(2))}
                    className="flex items-center rounded-md bg-richblack-700 px-4 py-2 order-1"
                    >
                        Back
                    </button>
                    
                    <ButtonIcon 
                    disabled={loading}
                    text={"Save Changes"}
                    type={'submit'}
                    />

                </div>

            </form>
        </div>
    )
}

export default CoursePubishForm;
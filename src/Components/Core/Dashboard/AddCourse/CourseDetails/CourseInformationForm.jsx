import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../../../../Services/apiConnector";
import { tags } from "../../../../../Services/apis";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import Thumbnail from "./Thumbnail";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { createCourse } from "../../../../../Services/operations/courseOperation";
import {setStep} from '../../../../../Slices/courseSlice'
import { setCourse } from "../../../../../Slices/courseSlice";

function CourseInformationForm(){

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        unregister,
        getValues,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); 
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState({});
    const [prerequisites,setPrerequisites] = useState([]);
    const {token} = useSelector((state)=>state.auth);


    async function CategoryDetails(){
        const toastId = toast.loading('Getting categories');

        try {
            const response = await apiConnector("GET",tags.TAG_API);
            if(response.data.tags.length >0)
                setCategories(response.data.tags);
        } 
        catch (error) {
            console.log('Error in getting the categories')
        }

        toast.dismiss(toastId);
    }

    useEffect(()=>{
        CategoryDetails();
    },[]);
    
    async function submitHandler(data){
        if(prerequisites.length > 0){
            const formData = new FormData();
            formData.append("courseName",data.courseTitle);
            formData.append("courseDescription",data.courseDescription);
            formData.append("price",data.price);
            formData.append("tag",data.tag);
            formData.append("whatYouWillLearn",data.whatYouWillLearn);
            formData.append("thumbnail",thumbnail);
            formData.append('prerequisite',JSON.stringify(prerequisites));

            setLoading(true);

            const response =await dispatch(createCourse(token,formData));

            // console.log(response);
            if(response?.data?.success){
                dispatch(setStep(2));
                dispatch(setCourse(response?.data?.courseDetails));
            }
            
            setLoading(false);
        }
        else{
            toast.error("please add prerequisite for the course");
        }
        
    }

    function addPrerequisite(){
        const value = getValues('prerequisite');
        // console.log(value);
        if(value){
            setPrerequisites((prev)=>[...prev,value]);
            reset({
                prerequisite:""
            })
        }
            
        
        // console.log(prerequisites);
    }

    function removePrerequisite(index){
        const updatedPrerequisites = [...prerequisites];  // Create a new array
        updatedPrerequisites.splice(index, 1);
        setPrerequisites(updatedPrerequisites);
    }


    return (
        <form onSubmit={handleSubmit(submitHandler)}
        className="w-full flex flex-col gap-7"
        >
            <div 
            className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-6"
            >
                <div className="flex flex-col gap-2">
                    <label className="lable-style">
                        Course Title <span className="text-pink-200 text-lg">*</span>
                    </label>
                    <input 
                    type="text"
                    id="courseTitle"
                    placeholder="Enter course Title"
                    {...register('courseTitle',{required:{value:true,message:"please Enter course Name / Title"}})}
                    className="form-style"
                    />
                </div>

                {/* course Description field  */}
                <div className="flex flex-col gap-2">
                    <label className="lable-style">
                        Course short description<span className="text-pink-200 text-lg">*</span>
                    </label>
                    <textarea
                    id="courseDescription"
                    rows={5}
                    cols={10}
                    placeholder="Enter description"
                    className="form-style"
                    {...register('courseDescription',{required:{value:true,message:"Please Enter course Description"}})}
                    ></textarea>

                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="lable-style">
                        Course Price <span className="text-pink-200 text-lg">*</span>
                    </label>
                    <div className="flex flex-row gap-3 items-center form-style">
                        <div className="text-xl text-richblack-400">
                            <HiOutlineCurrencyRupee />
                        </div>
                        <input
                        type="text"
                        id="price" 
                        placeholder="Enter price"
                        className="w-full bg-transparent outline-none"
                        {...register('price',{required:{value:true,message:"Please Enter course Price"}})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="lable-style">
                        Category <span className="text-pink-200 text-lg">*</span>
                    </label>
                    <select
                    id="category"
                    className="form-style"
                    {...register('tag',{required:{value:true,message:"Category is required"}})}
                    >
                        <option>
                            Select a category
                        </option>
                        {
                            categories.map((tag,index)=>(
                                <option key={index} value={tag.tagName}
                                >
                                    {tag.tagName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label>
                        Course Thumbnail <span className="text-pink-200 text-lg">*</span>
                    </label>
                    <Thumbnail setThumbnail={setThumbnail} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="benefits" className="lable-style">
                        Benefits of Course <span className="text-pink-200 text-lg">*</span>
                    </label>
                    <textarea
                    id="benefits"
                    cols={15}
                    rows={3}
                    placeholder="Enter Benefits of Course"
                    className="form-style"
                    {...register('whatYouWillLearn',{required:{value:true,message:"Please mention what Students will learn"}})}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="prerequisite">
                    Requirements/Instructions<span className="text-pink-200 text-lg">*</span>
                    </label>
                    <input
                    type="text"
                    id="prerequisite"
                    placeholder="Please Enter the prerequisite for Course"
                    className="form-style"
                    {...register('prerequisite')}
                    />

                    <div className="flex flex-col gap-5">
                        <div className="font-bold text-base text-yellow-50"
                        onClick={addPrerequisite}
                        >
                            Add
                        </div>
                        
                        <div>
                            {
                                prerequisites.length === 0
                                ? ""
                                :(
                                    <div className="flex flex-col gap-5">
                                        {
                                            prerequisites.map((data,index)=>(
                                                <div key={index}
                                                className="flex flex-row gap-2 relative"
                                                >
                                                    <p className="text-xs bg-yellow-50 text-richblack-900 px-2 py-1 rounded-md max-w-[500px] break-words">{data}</p>

                                                    <div
                                                    className="absolute text-lg text-richblack-900 font-extrabold -top-2 -left-2 rounded-full bg-pink-500"
                                                    onClick={()=>removePrerequisite(index)}
                                                    ><RxCross2 /></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
                
            </div>

            <div className="flex flex-row-reverse">
                <button type="submit"
                className="bg-yellow-50 text-richblack-900 px-3 py-1 font-bold rounded-md"
                >
                    <div className="flex flex-row gap-2 items-center">
                        Next
                        <FaArrowRight />
                    </div>
                </button>
            </div>
        </form>
    )
}

export default CourseInformationForm
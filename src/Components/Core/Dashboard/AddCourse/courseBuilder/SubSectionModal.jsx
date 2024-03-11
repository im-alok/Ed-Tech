import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import UploadVideo from './UploadVideo'
import ButtonIcon from "../../../../common/ButtonIcon";
import { createSubSection, updateSubSection } from "../../../../../Services/operations/courseOperation";
import { setCourse } from "../../../../../Slices/courseSlice";

function SubSectionModal({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false,
}){

    // console.log(modalData);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(view||edit){
            setValue('lectureTitle',modalData.title);
            setValue('lectureDescription',modalData.description);
            setValue('lectureVideo',modalData.videoUrl);
        }
    },[])

    function checkFormUpdated(){
        const currentValues = getValues();
        // console.log("Primting Current values",currentValues);

        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl){
                return true;
            }
        else
            return false;
    }

    async function handleEditSubSection(){
        setLoading(true);
        const currentValues = getValues();

        const formData = new FormData();

        formData.append('subSectionId',modalData._id);
        formData.append('sectionId',modalData.sectionId);

        if(modalData.title !== currentValues.lectureTitle){
            formData.append('title',currentValues.lectureTitle);
        }

        if(modalData.description !== currentValues.lectureDescription){
            formData.append('description',currentValues.lectureDescription);
        }
        
        if(modalData.videoUrl !== currentValues.lectureVideo){
            formData.append('videoFile',currentValues.lectureVideo);
        }

        const response = await updateSubSection(formData,token);

        if(response){
            let result = course?.courseContent?.map((section)=>section._id === response._id ? response : section);

            const updatedDetails = {...course,courseContent:result};
            dispatch(setCourse(updatedDetails));
            setModalData(null);
        }
        setLoading(false);

    }


    async function onSubmit(data){
        if(view){
            return;
        }
        else if(edit){
            if(!checkFormUpdated()){
                toast.error("No Changes made to the form,Kindly update then Save");
            }

            else{
                //call the api for edit
                await handleEditSubSection();
            }
            return;
        }
        
        const formData = new FormData();
        formData.append('sectionId',modalData);
        formData.append('title',data.lectureTitle);
        formData.append('description',data.lectureDescription);
        formData.append('videoFile',data.lectureVideo);
        setLoading(true);
        const response = await createSubSection(formData,token);
        // console.log(modalData);  console.log(modalData);
        let result = course?.courseContent?.map((section)=>section._id ===response._id ?response : section);
        let updatedDetails = {...course,courseContent:result};

        // console.log(updatedDetails);
        dispatch(setCourse(updatedDetails));

        setLoading(false);
        //for closing the modal after creating
        setModalData(null);

    }


    return(

        <div className="fixed inset-0 z-[999] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[550px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 flex flex-col gap-10">
                <div className=" flex flex-row items-center justify-between">
                    <p
                    className="text-3xl font-medium text-richblack-100"
                    >{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</p>
                    <button
                    className="text-richblack-400 font-extrabold text-2xl bg-richblack-700 rounded-md p-2"
                    onClick={()=>(!loading ? setModalData(null) : {})}
                    >
                        <RxCross2 />
                    </button>
                </div>

                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-7"
                >
                    <UploadVideo 
                    name='lectureVideo'
                    label='lectureVideo'
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                    />
                    
                    <div className="flex flex-col gap-2">
                        <label className="lable-style">
                            Lecture Title<span className="text-pink-200 text-lg">*</span>
                        </label>

                        <div className="flex flex-col gap-1">
                            <input 
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register('lectureTitle',{required:true})}
                            className="form-style"
                            />
                            {
                                errors.lectureTitle && (<span className="-mt-1 text-[12px] text-yellow-100">
                                    Lecture title is required
                                </span>)
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="lable-style">
                            Lecture Description<span className="text-pink-200 text-lg">*</span>
                        </label>

                        <div className="flex flex-col gap-1">
                            <textarea
                            id="lectureDescription"
                            placeholder="Enter Lecture Description"
                            {...register('lectureDescription',{required:true})}
                            className="form-style"
                            rows={5}
                            cols={14}
                            ></textarea>
                            {
                                errors.lectureDescription && (<span className="-mt-1 text-[12px] text-yellow-100">
                                    Lecture Description is required
                                </span>)
                            }
                        </div>
                    </div>
                        
                        {
                            !view && (
                                <div className="text-sm self-end">
                                    <ButtonIcon 
                                        text={loading ? "Loading...": edit ? "Save Changes":"Save"}
                                        type={"submit"}
                                        disabled={loading}
                                    />
                                </div>
                            )
                        }

                </form>
            </div>


        </div>
    )
}

export default SubSectionModal;
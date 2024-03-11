import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import {useForm} from 'react-hook-form';
import { useEffect } from "react";
import RatingStars from "../../common/RatingStars";
import ReactStars from 'react-rating-stars-component'
import ButtonIcon from "../../common/ButtonIcon";
import IconBtn from "../../common/IconBtn";
import { createRatingAndReview } from "../../../Services/operations/ReviewOperation";

function CourseReviewModal({setReviewModal}){
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth);
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm();

    const {
        courseEntireData,
    } = useSelector((state)=>state.viewCourse)

    async function onSubmit(data){
        //calling the api and send the 
        const response = await createRatingAndReview(data.courseRating,data.courseExperience,courseEntireData._id,token);
        console.log(response);
        setReviewModal(false)
    }

    function ratingChanged(newRating){
        setValue('courseRating',newRating);
    }

    useEffect(()=>{
        setValue('courseExperience',"");
        setValue('courseRating',0);
    },[])

    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-400 bg-opacity-10 backdrop-blur-sm">
            <div className="border rounded-lg border-richblack-600 bg-richblack-900 flex ">
                {/* Modal Header */}
                <div className="flex flex-col gap-16 items-center bg-yellow-50 p-3">
                    <p className="text-xl font-semibold text-richblack-900">Add Review</p>
                    <button
                    onClick={()=>setReviewModal(false)}
                    className="text-4xl font-extrabold text-richblack-5 bg-richblack-900 p-2 aspect-square rounded-full"
                    >
                        <RxCross1 />
                    </button>
                </div>

                <div className="flex flex-col p-3 px-16 gap-4">
                    {/* Modal Body */}
                    <div className="mt-10 flex justify-center items-center">
                        <div className="flex items-center gap-8 justify-center">
                            <img src={user?.image}
                            alt="image for user"
                            className="aspect-square w-[50px] rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <p className="text-richblack-5 text-xl font-semibold ">{user?.firstName} {user?.lastName}</p>
                                <p className="text-richblack-25 italic ">Posting publicly</p>

                            </div>
                        </div>
                    </div>

                    {/* Stars part */}


                    {/* form */}
                    <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mtt-6  flex flex-col items-center w-full "
                    >
                        
                        <ReactStars 
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor={`#ffd700`}


                        />

                        <div>
                            <label>
                                Add your Experience
                                <textarea 
                                placeholder="add your experience here"
                                {...register('courseExperience' ,{required:true})}
                                className="form-style min-h-[130px] w-full "
                                />
                                {
                                    errors.courseExperience && (
                                        <span className="text-sm text-pink-200">
                                            Please add your experience
                                        </span>
                                    )
                                }
                            </label>


                        </div>
                        
                        {/* Buttons */}
                        <div>
                            <button
                            onClick={()=>setReviewModal(false)}
                            >
                                Cancel
                            </button>
                            
                            <button
                            type="submit"
                            className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900"
                            >
                                Submit
                            </button>
                        </div>
                            
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CourseReviewModal;
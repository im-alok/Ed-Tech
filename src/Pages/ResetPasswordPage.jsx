import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { resetPassword } from "../Services/operations/authOperations";

function ResetPasswordPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [formData,setFormData] = useState({
        password:'',
        confirmPassword:''
    })

    function changeHandler(event){
        event.preventDefault();
        setFormData((prevData)=>{
            return{
                ...prevData,
                [event.target.name] : event.target.value
            }
        })
    }

    function submitHandler(e){
        e.preventDefault();
        // if(formData.password!==formData.confirmPassword){
        //     toast.error('Password doesn\'t match');
        //     return;
        // }
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(formData,token,navigate));
    }


    return(
        <div className="mx-auto w-11/12">
            <div className="flex items-center justify-center h-[500px]">
                <div className="flex flex-col gap-3 w-fit">
                    <h1 className="text-3xl font-semibold text-richblack-5 font-inter">Choose new Password</h1>
                    <p className="text-lg text-richblack-100 w-[90%]">Almost done. Enter your new password and youre all set.</p>

                    <div className="flex flex-col">

                        <form className="flex flex-col gap-5"
                        onSubmit={submitHandler}
                        >

                            <label className="relative">

                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                    Create Password< sup className="text-pink-200">*</sup>
                                </p>

                                <input 
                                type={showPassword?("text"):("password")}
                                required
                                value={formData.password}
                                onChange={changeHandler}
                                name="password"
                                placeholder="Enter Password"
                                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                                />

                                <span onClick={() => setShowPassword( (prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer "
                                >{showPassword?(<AiOutlineEye fontSize={24} fill="#AFB2BF"/>):(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)}</span>

                            </label>


                            <label className="relative">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                    Confirm Password<sup className="text-pink-200">*</sup>
                                </p>

                                <input 
                                type={showConfirmPassword?("text"):("password")}
                                required
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                                name="confirmPassword"
                                placeholder="Enter Password"
                                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                                />

                                <span onClick={() => setShowConfirmPassword( (prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer "
                                >{showConfirmPassword?(<AiOutlineEye fontSize={24} fill="#AFB2BF"/>):(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)}</span>
                            </label>

                            <div>
                                <button type={"submit"} className='w-full flex justify-center items-center rounded-[8px] font-medium text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 bg-yellow-50'>Reset Password</button>
                            </div>
                        </form>
                    </div>
                    <Link to={"/login"}>
                        <div className="flex gap-2 font-medium text-lg items-center text-richblack-5">
                            <FaArrowLeftLong />
                            Back to Login
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;
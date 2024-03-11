import { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { sendOTP } from "../../../Services/operations/authOperations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupFormData } from "../../../Slices/authSlice";
import toast from "react-hot-toast";

function Signupform(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:'',
        email:"",
        password:"",
        confirmPassword:""
    })
    const[acntType,setActType]=useState("Student");

    const{email} = formData;

    function submitHandler(event){
        event.preventDefault();
        if(formData.password === formData.confirmPassword){
            const accountData={
                ...formData,acntType
            }
            // console.log(accountData);
            dispatch(setSignupFormData(accountData));
            dispatch(sendOTP(email,navigate));
        }
        else{
            toast.error('password does not match');
            return 
        }
    }



    function changeHandler(event){
        setFormData((prevFormData) => {
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
    return(
        
        <div>

                <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
                    <button onClick={()=>{
                        setActType("Student");
                    }}
                    className={`${acntType==="Student" 
                    ?"bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"
                    } py-2 px-5 rounded-full transition-all duration-200`}
                    >
                        Student
                    </button>

                    <button onClick={()=>{
                        setActType("Instructor");
                    }}
                    className={`${acntType==="Instructor" 
                    ?"bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"
                    } py-2 px-5 rounded-full transition-all duration-200`}
                    >
                        Instructor
                    </button>
                </div>

            <form onSubmit={submitHandler} className="flex flex-col">
                    

                    <div className="flex gap-x-4 mt-[20px]">
                        <lable>
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name <sup className="text-pink-200">*</sup></p>
                            <input 
                            required
                            type="text"
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            name="firstName"
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                            />
                        </lable>

                        <lable>
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name <sup className="text-pink-200">*</sup></p>
                            <input 
                            required
                            type="text"
                            value={FormData.lastName}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            name="lastName"
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                            />
                        </lable>
                    </div>


                        <label className="mt-[20px]">
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                Email Address<sup className="text-pink-200">*</sup>
                            </p>

                            <input 
                            type="email"
                            required
                            value={FormData.email}
                            onChange={changeHandler}
                            name="email"
                            placeholder="Enter Email id"
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                            />

                        </label>    

                    <div className="flex flex-col gap-7 sm:flex-row gap-x-4 mt-[20px]">
                        <label className="relative">
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                Create Password< sup className="text-pink-200">*</sup>
                            </p>

                            <input 
                            type={showPassword?("text"):("password")}
                            required
                            value={FormData.password}
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
                            value={FormData.confirmPassword}
                            onChange={changeHandler}
                            name="confirmPassword"
                            placeholder="Enter Password"
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                            />

                            <span onClick={() => setShowConfirmPassword( (prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer "
                            >{showConfirmPassword?(<AiOutlineEye fontSize={24} fill="#AFB2BF"/>):(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)}</span>

                            
                        </label>
                    </div>


                        <div>
                            <button type={"submit"} className='w-full flex justify-center items-center rounded-[8px] font-medium text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 bg-yellow-50'>Create Account</button>
                        </div>


            </form>
        </div>
    );
}

export default Signupform;
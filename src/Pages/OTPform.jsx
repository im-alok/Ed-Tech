import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { VscDebugRestart } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, signup } from "../Services/operations/authOperations";

function OTPform(){
    const [formData,setFormData] = useState({
        circle1:"",
        circle2:"",
        circle3:"",
        circle4:""

    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupFormData} = useSelector((state)=>state.auth);
    useEffect(()=>{
        if(!signupFormData)
            navigate('/signup');
    },[])

    function changeHandler(event){
        setFormData((prevFormData)=>{
            return(
                {
                    ...prevFormData,
                    [event.target.name]:event.target.value
                }
            )
        })
    }

    function submitHandler(e){
        e.preventDefault();
        const otp = formData.circle1 + formData.circle2 + formData.circle3 + formData.circle4;
        console.log(otp);
        dispatch(signup(signupFormData,otp,navigate));
        // console.log(signupFormData);
    }

    function resendOTPHandler(){
        dispatch(sendOTP(signupFormData.email,navigate));
    }

    return(
        <div className="w-11/12 h-[500px] mx-auto text-richblack-200 flex justify-center items-center"
        >                          
            <div className="flex flex-col gap-5 w-fit">
                <h1 className="text-3xl font-semibold text-richblack-5 ">Verify Email</h1>
                <p className="text-richblack-100 text-lg w-10/12 font-inter">A verification has been sent to your email address.Enter the code below</p>
                <form
                onSubmit={submitHandler}
                className="flex flex-col gap-5 "
                >
                    <div className="justify-center flex gap-5">
                        <input
                        required
                        name="circle1"
                        
                        onChange={changeHandler}
                        className={`border-2 border-richblack-500 outline-none bg-richblack-800 w-[60px] h-[60px] rounded-full text-center text-richblack-25 text-3xl font-extrabold`}
                        maxLength={1}
                        />

                        <input
                        required
                        name="circle2"
                        onChange={changeHandler}
                        maxLength={1}
                        className={`border-2 border-richblack-500 outline-none bg-richblack-800 w-[60px] h-[60px] rounded-full text-center text-richblack-25 text-3xl font-extrabold`}  
                        />

                        <input
                        required
                        name="circle3"
                        onChange={changeHandler}
                        maxLength={1}
                        className={`border-2 border-richblack-500 outline-none bg-richblack-800 w-[60px] h-[60px] rounded-full text-center text-richblack-25 text-3xl font-extrabold`}  
                        />

                        <input
                        required
                        name="circle4"
                        onChange={changeHandler}
                        maxLength={1}
                        className={`border-2 border-richblack-500 outline-none bg-richblack-800 w-[60px] h-[60px] rounded-full text-center text-richblack-25 text-3xl font-extrabold`} 
                        />
                    </div>
                        <div className="">
                            <button type={"submit"} className='w-full flex justify-center items-center rounded-[8px] font-bold text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 bg-yellow-50 active:scale-95 transition-all duration-200'>Verify Email</button>
                        </div>
                </form>
                <div className="flex flex-row justify-between">
                    <Link to={"/login"}>
                        <div className="flex gap-2 items-center font-medium text-base text-richblack-5">
                            <p className=""><IoMdArrowBack /></p>
                            <p>Back to login</p>
                        </div>
                    </Link>
                    <button>
                        <div className="flex flex-row gap-2 items-center font-inter font-medium text-base text-blue-100"
                        onClick={resendOTPHandler}
                        >
                            <VscDebugRestart />
                            <p>Resend it</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OTPform;
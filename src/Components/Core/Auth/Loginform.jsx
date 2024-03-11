import { useState } from "react";
import { AiOutlineEyeInvisible ,AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Services/operations/authOperations";


function Loginform(props){
    const navigate=useNavigate();
    const dispatch = useDispatch();


    const[formData,setFormData]=useState({
        email:"",
        password:'',
    })

    const[showPassword,setShowPassword]=useState(false);


    function submitHandler(event){
            event.preventDefault();            
            dispatch(login(formData.email,formData.password,navigate));

    }


    function changeHandler(event){
        setFormData( prevFormData =>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }



    return(
        <form onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6"
        >
            <label className="w-full ">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address
                    <sup className="text-pink-200">*</sup>
                </p>

                <input 
                type="email"
                required
                value={FormData.email}
                onChange={changeHandler}
                name="email"
                placeholder="Enter Email id"
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white"
            />

            </label>


            <label className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password<sup className="text-pink-200">*</sup>
                </p>

                <input 
                type={showPassword?("text"):("password")}
                required
                value={FormData.password}
                onChange={changeHandler}
                name="password"
                placeholder="Enter Password"
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white"
                />

                <span onClick={() => setShowPassword( (prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer "
                >{showPassword?(<AiOutlineEye fontSize={24} fill="#AFB2BF" />):(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"  />)}</span>


                <Link to="/forgotpassword">
                    <p className="text-right m-1 text-xs text-blue-100"> Forgot Password</p>
                </Link>
            </label>
            
        <div>
            <button type="submit" className='w-full flex justify-center items-center rounded-[8px] bg-yellow-50 font-medium text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                Log in
            </button>
        </div>

        </form>
    )
}

export default Loginform;

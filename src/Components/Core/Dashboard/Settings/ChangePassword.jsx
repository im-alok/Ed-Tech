import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../../Services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function ChangePassword(){

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [oldPassword,setOldPassword] = useState(false);
    const [newPassword,setNewPassword] = useState(false);
    const [confirmNewPassword,setConfirmNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState :{errors,isSubmitSuccessful}
    } = useForm();

    useEffect(()=>{
        reset({
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:""

        })
    },[isSubmitSuccessful,reset])


    function submitHandler(data){
        try {
            dispatch(updatePassword(token,data))
        } catch (error) {
            console.log("Something went wrong while updating password",error);
        }
    }

    function resetHandler(e){
        e.preventDefault();
        navigate('/dashboard/my-profile');
    }


    return(
        <>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-7 sm:p-8 sm:px-12">
                <div className="flex flex-col gap-7">
                    <h2 className="text-lg font-inter font-semibold text-richblack-5">
                        Password
                    </h2>

                    <div>
                        <form onSubmit={handleSubmit(submitHandler)}
                        className="flex flex-col gap-7"
                        >
                            <div className="flex flex-col gap-2 justify-center">
                                
                                <div className="flex flex-row gap-5">
                                    <label htmlFor="oldPassword"
                                    className="lable-style font-bold"
                                    >
                                        Enter Your Old password
                                    </label>
                                    {
                                        errors.oldPassword && (
                                            <span className='text-xs text-pink-200'>{errors.oldPassword.message}</span>
                                        )
                                    }
                                </div>

                                <div className="relative">
                                    <input 
                                        type={oldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        id="oldPassword"
                                        placeholder="enter your password"
                                        className="form-style w-full"
                                        {...register('oldPassword',
                                            {
                                                required:{
                                                    value:true,
                                                    message:"please enter your old Password"
                                                }
                                            }
                                        )}
                                    />
                                    <div className="absolute right-5 top-[14px] text-xl text-richblack-200 cursor-pointer"
                                    onClick={()=>setOldPassword((prev)=>!prev)}
                                    >
                                        {
                                            oldPassword ? (<FaEye/>):(<FaEyeSlash />)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between w-[90%] lg:h-[100px] gap-5">
                                <div className="flex flex-col gap-2 ">
                                    <label className="lable-style">New Password</label>
                                    <div className="relative">
                                        <input 
                                            type={newPassword ? "text" : "password"}
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="enter your password"
                                            className="form-style w-fit"
                                            {...register('newPassword',
                                                {
                                                    required:{
                                                        value:true,
                                                        message:"please enter new Password"
                                                    }
                                                }
                                            )}
                                        />
                                        <div className="absolute top-4 sm:right-2 right-0 text-xl text-richblack-200 cursor-pointer"
                                        onClick={()=>setNewPassword((prev)=>!prev)}
                                        >
                                            {
                                                newPassword ? (<FaEye/>):(<FaEyeSlash />)
                                            }
                                        </div>
                                    </div>

                                    {
                                        errors.newPassword && (
                                            <span className='text-xs text-pink-200'>{errors.newPassword.message}</span>
                                            )
                                    }
                                </div>

                                <div className="flex flex-col gap-2 ">
                                    <label className="lable-style">Confirm New Passwrd</label>
                                    <div className="relative">
                                        <input 
                                            type={confirmNewPassword ? "text" : "password"}
                                            name="confirmNewPassword"
                                            id="newPassconfirmNewPasswordword"
                                            placeholder="re-enter your password"
                                            className="form-style"
                                            {...register('confirmNewPassword',
                                                {
                                                    required:{
                                                        value:true,
                                                        message:"please confirm your Password"
                                                    }
                                                }
                                            )}
                                        />
                                        <div className="absolute top-4 right-0 sm:right-2 text-xl text-richblack-200 cursor-pointer"
                                        onClick={()=>setConfirmNewPassword((prev)=>!prev)}
                                        >
                                            {
                                                confirmNewPassword ? (<FaEye/>):(<FaEyeSlash />)
                                            }
                                        </div>
                                    </div>

                                    {
                                        errors.confirmNewPassword && (
                                            <span className='text-xs text-pink-200'>{errors.confirmNewPassword.message}</span>
                                            )
                                    }
                                </div>
                            </div>

                            <div className=" flex flex-row-reverse gap-5">
                                <button
                                onClick={resetHandler}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                                >Cancel</button>

                                <button 
                                type="submit"
                                className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold"
                                >
                                    Save
                                </button>

                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ChangePassword;
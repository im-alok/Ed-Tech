import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { getUserAdditionalDetails } from "../../../Services/operations/profileOperation";
import IconBtn from "../../common/IconBtn";
import {setAdditionalDetails} from '../../../Slices/profileSlice';


function MyProfile(){

    const {token} = useSelector((state)=>state.auth);
    const [userData,setUserData] = useState({});
    const dispatch = useDispatch();

    const getDetails = async()=>{
        try {
            const response = await getUserAdditionalDetails(token);
            setUserData(response);
            dispatch(setAdditionalDetails(response));
            // console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getDetails(token);
    },[])


    return(
        <div className="w-full ">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3 m-7">
                    <p className="text-richblack-300">Home / Dashboard / <span className="text-yellow-50">My Profile</span></p>
                    <h1 className="font-bold text-3xl text-richblack-5">My Profile</h1>
                </div>

                <div className="w-11/12 sm:w-9/12 mx-auto flex flex-col gap-10 ">
                    <div className="w-full sm:px-7 sm:py-8 px-5 py-5 flex flex-row flex-wrap gap-5 sm:gap-0items-center justify-between bg-richblack-800 rounded-xl">
                        <div className="flex flex-row gap-5 items-center">
                            <div className="w-[60px] h-[60px]">
                                <img src={userData?.image} loading="lazy"
                                className="rounded-full object-cover aspect-square"
                            />
                            </div>
                            <div className="flex flex-col justify-center ">
                                <p className="text-richblack-5 font-bold text-xl font-inter">
                                    {
                                        userData?.firstName
                                        ?(userData?.firstName + " " + userData?.lastName)
                                        :"Your Name"
                                    }
                                </p>
                                <p className="text-richblack-300 text-sm">{userData?.email}</p>
                            </div>
                        </div>
                        <div>
                            <IconBtn linkto={"/dashboard/settings"} 
                            content={
                                {
                                    icon: "FaEdit",
                                    text:'Edit'
                                }
                            }
                            />
                        </div>
                    </div>

                    <div className="px-7 py-8 flex flex-col gap-5 bg-richblack-800 rounded-xl">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-richblack-5 text-xl font-bold font-inter">About</h1>
                            <IconBtn linkto={'/dashboard/settings'}
                            content={
                                {
                                    icon:"FaEdit",
                                    text:"Edit"
                                }
                            }
                            />
                        </div>
                        <div className="text-richblack-200 text-base font-medium italic">
                            {
                                userData?.additionalDetails?.about
                                ?(
                                    <div>
                                        {userData?.additionalDetails?.about}
                                    </div>
                                )
                                :(<div>
                                    Write Something about Yourself.
                                </div>)
                            }
                        </div>
                    </div>
                    
                    <div className="px-7 py-8 flex flex-col gap-5 bg-richblack-800 rounded-xl">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-richblack-5 text-xl font-bold font-inter">Personal Details</h1>
                            <IconBtn linkto={'/dashboard/settings'} 
                            content={
                                {
                                    icon:"FaEdit",
                                    text:"Edit"
                                }
                            } 
                            />
                        </div>

                            <div className="w-[100%] sm:w-[70%] flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between sm:items-center">
                                <div className="flex flex-col gap-1">
                                    <p className="text-base font-medium text-richblack-500">First Name</p>
                                    <p className="font-bold text-richblack-5 w-[200px]">{userData?.firstName}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-base sm:font-medium text-richblack-500">Last Name</p>
                                    <p className="font-bold text-richblack-5">{userData?.lastName}</p>
                                </div>
                            </div>

                            <div className="w-full sm:w-[74%] flex justify-between sm:items-center flex-col sm:flex-row sm:gap-0 gap-5">
                                <div className="flex flex-col  gap-1">
                                    <p className="text-base font-medium text-richblack-500">Email</p>
                                    <p className="text-base font-medium italic text-richblack-5 bg-richblack-900 px-2 py-1 rounded-md w-[200px]">{userData?.email}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-base font-medium text-richblack-500">Contact Number</p>

                                    <p className="font-bold text-richblack-5">
                                        {
                                            userData?.additionalDetails?.contactNumber 
                                        ?(userData?.additionalDetails?.contactNumber) 
                                        :"Your number"
                                        }
                                    </p>

                                    
                                </div>

                            </div>

                            
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile;
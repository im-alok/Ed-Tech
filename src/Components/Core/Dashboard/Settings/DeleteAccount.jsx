import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../Services/operations/SettingsAPI";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

function DeleteAccount(){
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state) =>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showButton , setShowButton] = useState(false);

    function deleteHandler(){
        dispatch(deleteAccount(token,navigate));
    }

    return(
        user.accountType === "Student" && (
        <>
            <div className="my-10 flex  sm:flex-row flex-col gap-5 gap-x-6 rounded-md border-[1px] border-pink-700 bg-pink-900 p-5 sm:p-8 sm:px-12 ">
                <div className="text-5xl text-pink-300 w-fit h-fit p-5 rounded-full bg-pink-700">
                    <MdDeleteOutline />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-pink-5 font-bold">Delete Account</h2>
                    <p className="text-pink-25 font-medium text-sm font-inter ">
                        Would you like to delete account?
                    </p>
                    <p className="text-pink-25 font-semibold text-sm font-inter w-9/12">
                        This account contains Paid Courses. Deleting your account will  remove all the contain associated with it.
                    </p>

                    <div 
                    onClick={()=>setShowButton(true)}
                    className="mt-3 font-bold text-pink-100 italic border w-fit p-3 rounded-md bg-pink-700 hover:scale-105 hover:text-white" 
                    >       
                        I want to delete My account
                    </div>

                </div>

            </div>

            <div className="flex items-center justify-center">
                <button className={`${!showButton?"hidden":"font-semibold text-base bg-yellow-50 text-richblack-900 w-fit px-3 py-2 rounded-md hover:scale-95 transition-all duration-200 hover:bg-yellow-100"}
                `}
                onClick={deleteHandler}
                >
                    Delete Account
                </button>
            </div>
        </>
        )
    )
}

export default DeleteAccount;
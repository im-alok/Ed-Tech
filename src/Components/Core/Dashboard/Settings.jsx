import { FaAngleLeft } from "react-icons/fa";
import ChangeProfilePic from "./Settings/ChangeProfilePic";
import ProfileUpdate from "./Settings/ProfileUpdate";
import {useNavigate} from 'react-router-dom';
import ChangePassword from "./Settings/ChangePassword";
import DeleteAccount from "./Settings/DeleteAccount";



function Settings(){

    const navigate = useNavigate();
    function backHandler(){
        navigate(-1);
    }


    return(
        <div className="w-full flex flex-col gap-7">
            <div className="flex flex-col gap-3 m-7">
                <div className="flex flex-row gap-2 text-richblack-300 items-center cursor-pointer"
                onClick={backHandler}
                >
                    <FaAngleLeft />
                    <p>Back</p>
                </div>
                <h1 className="text-3xl font-medium text-richblack-5 ">Edit Profile</h1>
            </div>

            <div className="w-9/12 mx-auto flex flex-col gap-7">
                {/* Change ProfilePics */}
                <ChangeProfilePic />
                <ProfileUpdate />
                <ChangePassword /> 
                <DeleteAccount />
            </div>
        </div>
    )
}

export default Settings;
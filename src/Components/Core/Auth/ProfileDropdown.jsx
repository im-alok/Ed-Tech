import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function ProfileDropdown(){
    const {user} = useSelector((state)=>state.profile);

    return(
        <div className="">
            <Link to='/dashboard/my-profile'>
                <div className="w-fit rounded-full">
                    <img src={user?.image}
                    alt="Profile pics"
                    width={30} height={30}
                    className="rounded-full object-cover aspect-square"
                    />
                </div>
            </Link>
        </div>
    )
}

export default ProfileDropdown;
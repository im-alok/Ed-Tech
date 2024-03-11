import { useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

function SideBar({setOpenSideBar,windowSize}){

    const {user,loading:profileLoading} = useSelector((state)=>state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);

    if(profileLoading || authLoading){
        return(
            <div className="flex justify-center items-center mt-12">
                Loading...
            </div>
        )
    }


    return(
        <div className={`${windowSize < 640 ? "ml-16 absolute inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" : ""}`}>
            <div className="flex flex-col w-full sm:w-[250px] border-r-[1px] border-r-richblack-700 h-full bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !== link.type)
                                return null;
                            return (
                                <SidebarLink link={link} key={link.id} setOpenSideBar={setOpenSideBar}/>
                            )
                        })
                    }
                </div>

                <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

                <div className="flex flex-col gap-2">

                    <SidebarLink 
                    link={
                        {
                            id: 1,
                            name:"Settings",
                            path:"/dashboard/settings",
                            icon:"VscSettingsGear"
                        }
                    }
                    setOpenSideBar={setOpenSideBar}
                    />
                    

                </div>
                

            </div>


            
        </div>
    )
}

export default SideBar;
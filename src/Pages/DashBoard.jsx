import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Core/Dashboard/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

function DashBoard(){
    const {loading:profileLoading } = useSelector((state)=>state.profile);
    const {loading:authLoading } = useSelector((state)=>state.auth);
    const [openSideBar,setOpenSideBar] = useState(false);
    const[windowSize,setWindowSize] = useState(0);



    function displayWindowSize(){
        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        setWindowSize(w);
    }
        
    // Attaching the event listener function to window's resize event
    window.addEventListener("resize", displayWindowSize);
    
    useEffect(()=>{
        setWindowSize(document.documentElement.clientWidth);
    },[])

    if(profileLoading || authLoading){
        return(
            <div className="flex justify-center items-center mt-12">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row">
            <div className=" relative flex min-h-[calc(100vh - 4.9rem)] ">
                {
                    windowSize >=640 && (<SideBar setOpenSideBar={setOpenSideBar} windowSize={windowSize}/>)
                }
            </div>
            
            {
                windowSize < 640 && !openSideBar && (
                    <GiHamburgerMenu 
                    className="w-8 h-8 text-richblack-5 m-5 cursor-pointer"
                    onClick={()=>setOpenSideBar(true)}
                    />
                )
            }
            {
                windowSize<640 && openSideBar && (
                    <RxCross2 
                    className="w-8 h-8 text-richblack-5 m-5 font-bold cursor-pointer text-4xl"
                    onClick={()=>setOpenSideBar(false)}
                    />
                )
            }
            <div className="min-h-[calc(100vh-4.9rem)] w-full sm:w-[80%] mb-10">
                    <Outlet />
            </div>
            
            {
                openSideBar && (<SideBar setOpenSideBar={setOpenSideBar} windowSize={windowSize}/>)
            }

        </div>
    )
}

export default DashBoard;
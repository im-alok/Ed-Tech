import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as icons from 'react-icons/vsc'

function SidebarLink({link,setOpenSideBar}){
    const Icon = icons[link.icon];
    const location = useLocation();
    function matchRoute(Route){
        return matchPath({path:Route},location.pathname);
    }

    return(
        <NavLink to={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-800 text-yellow-50":"bg-opacity-0 text-richblack-300"}`}
        onClick={()=>setOpenSideBar(false)}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

            <div className={`flex flex-row gap-2 items-center font-medium`}>
                <span className="text-lg"><Icon/></span>
                <span className="text-lg">{link.name}</span>
            </div>

        </NavLink>
    )
}

export default SidebarLink;
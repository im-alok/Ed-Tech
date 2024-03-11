import { Link } from "react-router-dom";
import * as Icons from 'react-icons/fa';

function IconBtn({content, linkto}){
    const Icon = Icons[content.icon];
    return(
        <Link to={linkto} 
        className="bg-yellow-50 rounded-lg w-fit  px-3 py-2 text-richblack-800 flex flex-row gap-2 items-center font-bold text-base"
        >
            <Icon />
            <p>{content.text}</p>
        </Link>
    )
}

export default IconBtn;
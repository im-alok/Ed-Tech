import { Link } from "react-router-dom";

function Button(props){
    return(
            
        <Link to={props.linkto}>
            <div className={`text-center text-[15px] px-6 py-3 font-bold rounded-md
            ${props.active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
            hover:scale-95 transition-all duration-200
            shadow-[8px_7px_0_0_rgba(185,170,170,0.19)] active:scale-90
            `}>
                {props.children}
            </div>
        </Link>
    )
}

export default Button;


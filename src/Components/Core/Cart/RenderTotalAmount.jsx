import { useDispatch, useSelector } from "react-redux";
import ButtonIcon from "../../common/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../Services/operations/studentFeatureApis";

function RenderTotalAmount(){
    const {total} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {cart} =useSelector((state)=>state.cart)
    console.log(cart);

    function clickHandler(){
        const Courses = cart.map((course)=>course._id);
        if(token){
            buyCourse(token,Courses,user,navigate,dispatch);
        }
    }
    return(
        <div className="bg-richblack-800 p-5 rounded-lg flex flex-col gap-3 w-[250px] h-fit">
            <div className="flex gap-2 flex-col">
                <h1 className="text-lg text-richblack-300">Total</h1>
                <p className="text-3xl font-semibold text-yellow-25">Rs. {total}</p>
            </div>
            <ButtonIcon 
            text={'Buy Now'}
            onclick={()=>clickHandler()}
            customClasses={`flex justify-center`}
            />
        </div>
    )
}

export default RenderTotalAmount;
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "../../common/RatingStars";
import { MdDeleteOutline } from "react-icons/md";
import { removeFromCart } from "../../../Slices/cartSlice";
function RenderCartCourses(){
    const {cart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch();
    // console.log(cart);

    return(
        <div className="flex flex-col gap-10">
            {
                cart.map((course,index)=>(
                    <div key={index}
                    className="flex flex-wrap gap-5"
                    >
                        <div className="flex gap-5">
                            <img 
                            src={course.thumbnail}
                            width={250}
                            height={250}
                            className="rounded-lg"
                            />

                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <p className="text-2xl text-richblack-5 font-bold">{course.courseName}</p>
                                    <p className="text-sm text-richblack-300">{course.tags.tagName}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <span className="text-lg font-bold text-yellow-25">{course.avgRating}.0</span>
                                    <RatingStars Review_Count={course.avgRating} />
                                    <span className="text-sm font-semibold text-richblack-300 w-[110px]">{course.ratingandreview.length} Student(s)</span>
                                </div>
                            </div>

                        </div>

                        <div
                        className="flex flex-col gap-6"
                        >
                            <div
                            onClick={()=>{dispatch(removeFromCart(course._id))}}
                            className="flex gap-1 bg-richblack-800 text-pink-300 items-center  p-2 rounded-md font-bold cursor-pointer"  
                            >
                                <MdDeleteOutline />
                                <p>Remove</p>
                            </div>
                            <p className="text-3xl font-bold text-yellow-25">Rs {course?.price}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;
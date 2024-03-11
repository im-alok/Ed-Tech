import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

function Cart(){
    const {total,totalItems} = useSelector((state)=>state.cart)

    return(
        <div className="w-11/12 mx-auto mt-10 flex flex-col gap-2">
            <h1 className="text-2xl text-richblack-5 font-semibold">Your cart</h1>
            <p className="text-sm font-semibold text-richblack-300 mb-7">{totalItems} Courses in your cart</p>
            <div className="">
                {
                    totalItems >0 
                        ?(
                            <div className="flex flex-wrap gap-20">
                                <RenderCartCourses />
                                <RenderTotalAmount />
                            </div>
                        )
                        :(<p className="text-2xl font-bold text-richblack-300">Your cart is empty.....</p>)
                }
            </div>
        </div>
    )
}

export default Cart
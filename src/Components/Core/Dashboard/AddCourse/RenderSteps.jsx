import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseDetailsForm from "./CourseDetails";

function RenderSteps(){
    
    const {step} = useSelector((state)=>state.course);
    const courseStep = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]

    return(
        <div className="sm:w-full ">
            <div className="flex justify-between sm:items-center sm:w-full w-[65%]">
                {
                    
                    courseStep.map((item)=>
                        (
                            <div>
                                <div className={`flex flex-col gap-2
                                ${ (step === item.id || step > item.id ) ? "text-yellow-50": `text-richblack-500`}
                                `} key={item.id}>

                                <div className="flex items-center gap-2">

                                    <div className={`${step === item.id 
                                    ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                                    : "border border-richblack-700 bg-richblack-700 text-richblack-300"
                                    }
                                    ${step > item.id 
                                        ?"bg-yellow-100 text-richblack-800"
                                        :""    
                                    }
                                    w-12 h-12 flex items-center justify-center rounded-full
                                    `}>

                                        <p className={`text-base font-bold`}>
                                            {
                                                step > item.id 
                                                ?(<FaCheck />) 
                                                :(item.id)
                                            }
                                        </p>
                                    </div>
                                    {
                                        item.id !==courseStep.length && 
                                        (
                                            <div className={`
                                            ${step>item.id?"border-yellow-50":"border-richblack-300"}
                                            border-b-2 border-dashed min-w-[80px] sm:min-w-[200px]`}></div>
                                        )
                                    }

                                </div>
                                
                                <div>
                                    {item.title}
                                </div>

                            </div>
                            </div>
                        )
                    )
                }
            </div>

            <CourseDetailsForm />
        </div>
    )
}

export default RenderSteps;
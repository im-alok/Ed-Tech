import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseDetails/CourseInformationForm";
import CourseBuilderForm from "./courseBuilder/CourseBuilderForm";
import CoursePubishForm from "./Course Publish/CoursePubishForm";

function CourseDetailsForm(){

    const {step}  = useSelector((state)=>state.course);

    return(
        <>
            {
                step === 1 && (<CourseInformationForm />)
            }
            {
                step === 2 && (<CourseBuilderForm />)
            }
            {
                step === 3 && (<CoursePubishForm />)
            }
        </>
    )
}

export default CourseDetailsForm;
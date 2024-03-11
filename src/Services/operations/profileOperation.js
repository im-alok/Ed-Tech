import { Profile } from '../apis';
import {apiConnector} from '../apiConnector';
import toast from "react-hot-toast";


export async function getUserAdditionalDetails(token){
    let result={};
    try {
        var toastId = toast.loading('Loading...');
        const response = await apiConnector('GET',Profile.GET_PROFILE_DATA,null,{
            Authorization : "Bearer" + token,
        })
        if(!response.data.success)
            throw new Error(response.data.message);
        result = response.data.userDetails;
        toast.dismiss(toastId);

    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.data.response.message);
    }
    
    return result;
}

export async function getUserEnrolledCourses(token){
    let result =[];
    const toastId = toast.loading('Getting Courses');
    try {
        const response = await apiConnector('GET',Profile.GET_ENROLLED_COURSE_DETAILS,null,{
            Authorization : 'Bearer' + token,
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;

    } catch (error) {
        toast.error(error.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}
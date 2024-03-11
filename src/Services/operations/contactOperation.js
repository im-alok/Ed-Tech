import { ContactUs } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";


export function contactus({firstname,lastname,email,phonenumber,countryCode,message}){
    return async() =>{
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('POST',ContactUs.CONTACT_US,{
                firstName:firstname,
                lastName:lastname,
                email:email,
                phoneNumber:countryCode+ " " + phonenumber,
                message:message
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}
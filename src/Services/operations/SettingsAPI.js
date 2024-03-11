import { UpdateProfile } from "../apis";
import {apiConnector} from '../apiConnector';
import {toast} from 'react-hot-toast';


export function updateDisplayPicture(token,formData){
    return async(dispatch) =>{
        
        try {
            var toastId = toast.loading('Uploading');
            const response = await apiConnector('PUT',UpdateProfile.UPLOAD_IMAGE,
            formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" +  token,
            }
            );

            if(! response.data.success){
                throw new Error( response.data.message);
            }
            localStorage.removeItem('user');
            localStorage.setItem('user',JSON.stringify(response.data.userDetails));
            console.log(response.data);
            toast.dismiss(toastId);
            toast.success(response.data.message);
            
        } catch (error) {
            toast.error(error.response.data.message)
            toast.dismiss(toastId);
        }
        
    }
}

export function userProfileUpdate(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading('Updating details..');
        try {
            const response = await apiConnector('PUT',UpdateProfile.UPDATE_PROFILE_DETAILS,{
                gender:formData.gender,
                about:formData.about,
                contactNumber:formData.contactNumber,
                dob:formData.dob,
            },
            {
                Authorization : "Bearer" + token
            })
            if(!response.data.success)
                throw new Error(response.data.message);

            let user = JSON.parse(localStorage.getItem('user'))
            user.additionalDetails = response.data.profileDetails;
            localStorage.removeItem('user');
            localStorage.setItem('user',JSON.stringify(user));

            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function updatePassword(token,formData){
    return async(dispatch) =>{
        const toastId = toast.loading("Updating your password");
        try {
            const response = await apiConnector('PUT',UpdateProfile.CHANGE_PASSWORD,
            {
                oldPassword:formData.oldPassword,
                newPassword :formData.newPassword,
                confirmNewPassword : formData.confirmNewPassword
            },
            
            {
                Authorization :"Bearer" + token
            })
            if(!response.data.success)
                throw new Error(response.data.message);
            toast.success("password updated successfully");

        } catch (error) {
            toast.error(error.response.data.message)
        }

        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        try {
            
            const response = await apiConnector("DELETE",UpdateProfile.DELETE_ACCOUNT,null,{
                Authorization :"Bearer" + token,
            })
            if(!response.data.message)
                throw new Error(response.data.message);
            window.location.reload();
            toast.success('Your Account Deleted Permanently');
            localStorage.clear();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
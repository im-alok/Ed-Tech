import { Auth } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from '../../Slices/authSlice';
import { toast } from 'react-hot-toast';
import { setUser } from "../../Slices/profileSlice";
import { setCourse } from "../../Slices/courseSlice";

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST", Auth.SEND_OTP, {
                email: email
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            navigate('/userRegistration/verify-email');
            toast.success(response.data.message);

        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            //connecting to the apis
            const response = await apiConnector("POST", Auth.LOGIN_API, {
                email: email,
                password: password,
            });
            console.log(response);
            if (!response?.data?.success) {
                toast.dismiss(toastId);
                throw new Error(response?.data?.message);
            }
            if(response?.data){
                dispatch(setToken(response?.data?.token));
                dispatch(setUser(response?.data?.userDetails));
                toast.success(response?.data?.message);
                localStorage.setItem("token", JSON.stringify(response?.data?.token));
                localStorage.setItem("user", JSON.stringify(response?.data?.userDetails));
                navigate('/dashboard'); 
            }

        }
        catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logOut(navigate){
    return(dispatch) =>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setCourse(null));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('total');
        localStorage.removeItem('totalItems');
        toast.success('Logged out successfully');
        navigate('/');
    }
}

export function signup({firstName, lastName,password,email,acntType,confirmPassword},otp,navigate){
    // console.log(otp);
    return async(dispatch) =>{
        dispatch(setLoading(true));
        
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST",Auth.USER_REGISTRATION,{
                firstName:firstName,
                lastName:lastName,
                password:password,
                confirmPassword:confirmPassword,
                email:email,
                accountType:acntType,
                otp:otp,
                
            })
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            // console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}

export function sendForgotPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST",Auth.FORGOT_PASSWORD_TOKEN,{
                email:email
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setEmailSent(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword({password,confirmPassword},token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            
            const response = await apiConnector("PUT",Auth.RESET_PASSWORD,{
                newPassword:password,
                confirmNewPassword:confirmPassword,
                token:token
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            navigate('/login');

        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }

}
import toast from "react-hot-toast";
import { Payment } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";


function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload =()=>{
            resolve(true);
        }

        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading('Loading...');
    try {
        
        //load the script 
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // console.log(response)

        if(!response){
            toast.error('Razorpay SDk failed to load')
            toast.dismiss(toastId)
            return;
        }

        //initialize the order
        const orderResponse = await apiConnector('POST',Payment.CAPTURE_PAYMENT,{courses},
        {
            "Authorization" : "Bearer" + token  
        }
        
        );
        
        // console.log(orderResponse);
        if(!orderResponse.data.success)
            throw new Error(orderResponse?.data?.message);

        // create Option object
        let options ={
            key:"rzp_test_3Wj1sc5901H63h",
            currency:orderResponse?.data?.data?.currency,
            amount:orderResponse?.data?.data?.amount,
            order_id:orderResponse?.data?.data?.id,
            name:'Ed TEch Corp',
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            refill:{
                name:`${userDetails?.firstName}`,
                email:`${userDetails?.email}`
            },
            handler: function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                //send successfull mail response
                sendPaymentSuccessEmail(response, orderResponse?.data?.data?.amount,token);

                //verify mail
                verifyPayment({...response,courses},token,navigate,dispatch);

            }

        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error('oops payment failed');
            console.log(response.error);
        })


    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
        // console.log('Sending email')
        // console.log(response)
        await apiConnector('POST',Payment.SEND_PAYMENT_MAIL,
        {
            orderId :response?.razorpay_order_id,
            paymentId:response?.razorpay_payment_id,
            amount,
        },{
            "Authorization" :"Bearer" + token
        }
        )

    } catch (error) {
        console.log('Send email Error',error)
    }
}


async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading('Verifying Payment...');
    dispatch(setPaymentLoading(true));
    try {
        const verifyResponse = await apiConnector('POST',Payment.VERIFY_PAYMENT,bodyData,{"Authorization":"Bearer" + token}
        )

        if(!verifyResponse?.data?.success) 
            throw new Error(verifyResponse?.data?.message);

            toast.success('Payment Successfull');

        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());


    } catch (error) {
        console.log('problem in payment verificaion',error);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
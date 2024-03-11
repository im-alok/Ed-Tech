import { RatingAndReview } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from 'react-hot-toast';


export async function createRatingAndReview(rating , review , courseId, token){

    const toastId = toast.loading('Adding Review');
    try {
        
        const response = await apiConnector('POST',RatingAndReview.ADD_RATING_AND_REVIEW,
        {
            courseId:courseId,
            rating:rating,
            review:review,
        },
        {
            "Authorization" : "Bearer" + token
        },);
        console.log(response)
        if(!response.data.success){
            toast.dismiss(toastId);
            throw new Error(response.data.message);
            
        }

        toast.success('added successfully');
        toast.dismiss(toastId);
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }

    toast.dismiss(toastId);

}

export async function getAllReviews(){
    let result=[];
    try {
        const response = await apiConnector('GET',RatingAndReview.GET_ALL_RATING_AND_REVIEW);

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        result = response?.data?.ratingAndReview;
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }
}
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { CatalogData } from "../apis";


export const getCatalogPageData = async(categoryId)=>{
    let result =[];
    // const toastId= toast.loading('Getting courses');

    try {
        
        const response = await apiConnector('GET',CatalogData.CATALOG_PAGEDATA_APTs,null,null,{tagId:categoryId});

        if(!response.data.success)
            throw new Error(response?.data?.message);

        result =response?.data?.data

    } catch (error) {
        toast.error(error?.response?.data?.message);
        result = error?.response?.data
    }

    // toast.dismiss(toastId);
    return result;

}


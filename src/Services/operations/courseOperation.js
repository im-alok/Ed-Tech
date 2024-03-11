import {Courses, CourseProgress} from '../apis'
import { apiConnector } from '../apiConnector'
import toast from 'react-hot-toast'


export function createCourse(token,formData){
    return async(dispatch) =>{
        let result ={};
        const toastId = toast.loading("Creating...");
        try {
            
            const response = await apiConnector('POST',Courses.CREATE_COURSE,
            formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" +  token,
            }
            );
            if(!response.data.success)
                throw new Error(response.data.message);

            result = response;
            toast.success("Course Created SuccessFully");
            toast.dismiss(toastId);
            return result;

        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
    }
}

export async function createSection(formData,token){
    // console.log(formData);
    const toastId = toast.loading('creating Section');
    let result={};
    try {
        const response = await apiConnector('POST',Courses.CREATE_SECTION,{
            sectionName : formData.sectionName,
            courseId:formData.courseId,
        },
        {
            "Authorization" : "Bearer" + token,
        }
        );

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.updatedCourseDetails;

    } catch (error) {
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result;

}

export async function editSection(formData,token){
        let result={};
        const toastId = toast.loading('Creating Section');
        try {
            
            const response = await apiConnector("PUT",Courses.EDIT_SECTION,{
                sectionName:formData.sectionName,
                sectionId:formData.sectionId,
                courseId:formData.courseId,
            },
            {
                "Authorization" : "Bearer" + token
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success('Section Name updated Successfully');
            result = response?.data?.updatedCourseDetails;
            // console.log(result);

        } catch (error) {
            console.log(error.response.data.message);
        }

        toast.dismiss(toastId);
        return result;

}

export async function deleteSection(sectionId,courseId,token){
    const toastId = toast.loading('deleting Setions');
    let result;
    try {
        const response = await apiConnector('DELETE',Courses.DELETE_SECTION,
        {
            sectionId:sectionId,
            courseId:courseId,
        },
        {
            "Authorization" : "Bearer" + token,
        }
        )
        if(!response.data.success)
            throw new Error(response.data.message);

        result = response?.data?.updatedCourseDetails;
        toast.success('Section deleted SuccessFully');

    } catch (error) {
        toast.error('error.response.data.message');
    }
    toast.dismiss(toastId);
    return result;
}

export async function createSubSection(formData,token){
    const toastId = toast.loading('Creating Sub Section');
    let result;
    try {
        const response = await apiConnector('POST',Courses.CREATE_SUBSECTION,
        formData,
        {   
            "Content-Type": "multipart/form-data",
            "Authorization" :"Bearer" + token
        })
        if(!response.data.success)
            throw new Error(response.success.message);
        result = response?.data?.updatedSection;
        toast.success('course created Successfully');

    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSubSection(sectionId,subSectionId,token){
    const toastId = toast.loading('Deleting sub section');
    let result;
    try {
        const response = await apiConnector('DELETE',Courses.DELETE_SUBSECTION,
        {
            sectionId:sectionId,
            subSectionId:subSectionId
        },
        {
            "Authorization" : "Bearer" + token
        }
        );
        if(!response.data.success)
            throw new Error(response.data.message);
        result = response?.data?.updatedSubSectionDetails;
        toast.success(response?.data?.message);

    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;

}


export async function updateSubSection(formData,token){
    const toastId = toast.loading('Updating subSection');
    let result;

    try {
        const response = await apiConnector('PUT',Courses.UPDATE_SUBSECTION,formData,
        {
            "Content-Type": "multipart/form-data",
            "Authorization":"Bearer" + token,
        });

        if(!response.data.success)
            throw new Error(response.data.message);
        result = response?.data?.updatedSection;
        // console.log(result);
        toast.success('Subsection Updated Sucessfully');

    } catch (error) {
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export async function publishCourse(formData,token){
    const toastId = toast.loading('Publishing the course');
    let result={};
    try {
        const response = await apiConnector('PUT',Courses.PUBLISH_COURSE,formData,
        {
            'Content-Type' : 'multipart/form-data',
            'Authorization' :'Bearer' + token
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.updatedCourseDetails


    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export async function getInstructorCourses(token){
    const toastId = toast.loading('Getting Your Courses');
    let result;
    try {
        const response = await apiConnector('GET',Courses.GET_INSTRUCTOR_COURSES,null,{
            'Authorization' :'Bearer' + token
        });

        if(!response?.data?.success)
            throw new Error(response?.data?.message);
        result = response?.data?.Courses;
        // console.log(result)
        // toast.success('Courses fetched Successfully');

    } catch (error) {
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result
    
}

export async function deleteCourse(courseId,token){
    const toastId = toast.loading('Deleting courses');
    let result;
    try {
        const response = await apiConnector('DELETE',Courses.DELETE_COURSES,{
            courseId:courseId
        },{
            "Authorization" :'Bearer' + token
        })

        if(!response?.data?.success)
            throw new Error(response?.data?.message);
        toast.success(response?.data?.message);
        result = response?.data?.deletedCourses
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result;
}

export async function getCourseDetails(courseId){
    let result;
    try {
        const response = await apiConnector('GET',Courses.GET_COURSE_DETAILS,null,null,{courseId:courseId});

        if(!response.data.success)
            throw new Error(response.data.message)
        result =await response?.data?.courseDetails;
        // console.log(result);

    } catch (error) {
        toast.error(error.message);
    }

    return result;
}

export async function getFullCourseDetails(courseId,token){
    // console.log(courseId)
    let result;
    try {
        const response = await apiConnector('GET',Courses.GET_FULL_COURSE_DETAILS,null,
        {
            "Authorization" :"Bearer" + token
        }
        ,{courseId : courseId});
        // console.log(response)
        toast.success('course fetched successfully');

        result = response?.data?.data;
    } catch (error) {
        console.log(error)
        toast.error('error occured');
    }
    return result;
}


export async function updateCourseProgress(courseId,subSectionId,token){
    const toastId = toast.loading('waiting...');
    let result;
    try {
        // console.log('HII');
        const response = await apiConnector('POST',CourseProgress.UPDATE_COURSE_PROGRESS,{
            courseId:courseId,
            subSectionId:subSectionId
        },
        {
            "Authorization" : 'Bearer' + token
        })

        // console.log(response);

        if(!response?.data?.success){
            toast.dismiss(toastId);
            throw new Error(response?.data?.message);
        }
        result=true;
        toast.success(response?.data?.message);
        return result;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}
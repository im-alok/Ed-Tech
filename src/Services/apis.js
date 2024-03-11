const BASE_URL = process.env.REACT_APP_BASE_URL;

export const tags ={
    TAG_API : "https://ed-tech-n661.onrender.com/courses/getAllTags",
}

export const Auth ={
    LOGIN_API:BASE_URL + "/user/userLogin",
    SEND_OTP:BASE_URL +"/user/sendOTP",
    USER_REGISTRATION : BASE_URL + "/user/userRegistration",
    FORGOT_PASSWORD_TOKEN : BASE_URL + "/user//resetPasswordToken",
    RESET_PASSWORD : BASE_URL + "/user//resetPassword"
}

export const ContactUs ={
    CONTACT_US:BASE_URL + '/contact/contactus',
}

export const Profile ={
    GET_PROFILE_DATA :BASE_URL + "/profile/getUserDetails",
    GET_ENROLLED_COURSE_DETAILS : BASE_URL + "/profile/getEnrolledCourseDetails",
    INSTRUCTOR_DASHBOARD:BASE_URL + '/profile/instructorDashboard'
}

export const UpdateProfile ={
    UPLOAD_IMAGE:BASE_URL + "/profile/imageUpload",
    UPDATE_PROFILE_DETAILS:BASE_URL + '/profile//updateUserProfile',
    CHANGE_PASSWORD: BASE_URL + '/user/changePassword',
    DELETE_ACCOUNT:BASE_URL + '/profile/deleteAccount',
}

export const Courses ={
    CREATE_COURSE : BASE_URL + "/courses/createCourses",
    EDIT_SECTION:BASE_URL + "/courses/updateSection",
    CREATE_SECTION:BASE_URL + "/courses/createSection",
    DELETE_SECTION:BASE_URL + "/courses/deleteSection",
    DELETE_SUBSECTION:BASE_URL + "/courses/deleteSubSection",
    CREATE_SUBSECTION:BASE_URL + "/courses/createSubSection",
    UPDATE_SUBSECTION : BASE_URL + '/courses/updateSubSection',
    PUBLISH_COURSE:BASE_URL + '/courses/publishCourse',
    GET_INSTRUCTOR_COURSES:BASE_URL + '/courses/getInstructorCourse',
    DELETE_COURSES:BASE_URL + '/courses/deleteCourse',
    GET_COURSE_DETAILS : BASE_URL + '/courses/getCourseDetails',
    GET_FULL_COURSE_DETAILS : BASE_URL + '/courses/getFullCourseDetails'
}


export const CatalogData={
    CATALOG_PAGEDATA_APTs :BASE_URL + '/courses/getAllTagsCourses'
}


export const RatingAndReview = {
    GET_AVG_RATING : BASE_URL + '/courses/getAverageRating',
    ADD_RATING_AND_REVIEW : BASE_URL + "/courses/createRatingAndReview",
    GET_ALL_RATING_AND_REVIEW : BASE_URL + '/courses/getAllRatingAndReview'
}

export const Payment ={
    CAPTURE_PAYMENT : BASE_URL + "/payment/capturePayment",
    VERIFY_PAYMENT : BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_MAIL : BASE_URL + '/payment/sendPaymentSuccessEmail'
}

export const CourseProgress ={
    UPDATE_COURSE_PROGRESS : BASE_URL + '/courses/updateCourseProgress'
}

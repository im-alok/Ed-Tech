const {instance} = require('../Config/razorpay');
const Users = require('../Model/Users');
const Courses = require('../Model/Courses');
const { default: mongoose } = require('mongoose');
const mailSender = require('../Utils/mailSender');
const {courseEnrollmentEmail} = require('../mailTemplate/courseEnrollmentEmail');
const { paymentSuccessEmail } = require('../mailTemplate/paymentSuccessEmail');
const crypto = require('crypto')
const CourseProgress= require('../Model/courseProgress');


exports.capturePayment = async(req,res)=>{

    const {courses} = req.body;
    // console.log(courses);
    const userId = req.user.id;
    if(courses.length ===0){
        return res.status(400).json({
            success:false,
            message:"Please provide Course Id"
        })
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try {
            course = await Courses.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"Donot find the courses"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"You are already enrolled in one or many courses"
                })
            }

            totalAmount = totalAmount + course.price;
            // console.log(totalAmount);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const options = {
        amount:totalAmount * 100,
        currency:"INR",
        receipt:Math.floor(Math.random(Date.now())*Math.pow(10,7)).toString(),
    }

    // console.log("Create payment orders");

    try {
        const paymentResponse = await instance.orders.create(options);
        // console.log(paymentResponse)
        res.json({
            success:true,
            message:"Order created Successfully",
            data:paymentResponse

        })
    } catch (error) {
        console.log("Into creating options ",error)
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }



}

//paymentVerification

exports.verifyPayment=async(req,res)=>{
    // console.log('Into Payment verification',req);
    const razorpay_order_id = req?.body?.razorpay_order_id;
    const razorpay_payment_id = req?.body?.razorpay_payment_id;
    const razorpay_signature = req?.body?.razorpay_signature;
    const courses = req?.body?.courses;
    const userId = req.user.id;
    // console.log(razorpay_order_id);

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(200).json({
            success:false,
            message:'Payment failed'
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256',process.env.KEY_SECRET)
        .update(body.toString())
        .digest('hex');

        // console.log(expectedSignature);
        // console.log(razorpay_signature);

        if(expectedSignature === razorpay_signature){
            //eroll the stdents
                await enrolledStudents(courses,userId,res);

            //return response
            return res.status(200).json({
                success:true,
                message:"payment verified"
            })
        }

        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })

}


const enrolledStudents = async(courses,userId,res)=>{
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide data for courses or userId"
        })
    }
    for(const courseId of courses){
        try {
            //find the course  and enrollled the students in it
            const enrolledCourses = await Courses.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )
            if(!enrolledCourses){
                return res.status(500).json({
                    success:false,
                    message:"course Not found"
                })
            }

            //making the course progress active for student

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[]
            })

            //find the students and addd the course to student
            const enrolledStudents = await Users.findByIdAndUpdate(
                {_id:userId},
                {$push:{
                    courseEnrolled:courseId,
                    courseProgress:courseProgress._id,
                }},{new:true}
            )
            //send the mail to the user
            const emailResponse = await mailSender(
                enrolledStudents.email,
                `Successfully enrolled into ${enrolledCourses.courseName}`,
                courseEnrollmentEmail(enrolledCourses.courseName,`${enrolledStudents.firstName} ${enrolledStudents.lastName}`)
            )

            // console.log('email send successfully',emailResponse)
        } catch (error) {
            return res.status(500).json({
                sucess:false,
                message:error.message
            })
        }
    }

}


exports.sendPaymentSuccessEmail=async(req,res)=>{
    // console.log('sending payment email')
    try {
        const {orderId,paymentId,amount} = req.body;
        const userId = req.user.id;
        // console.log(amount);
        if(!orderId || !paymentId ||!amount ||!userId){
            return res.status(200).json({
                success:false,
                message:"Please provide all the details"
            })
        }

        const studentDetails = await Users.findById(userId);
        // console.log(studentDetails)

        await mailSender(studentDetails?.email,'Payment Confirmation',
        paymentSuccessEmail(`${studentDetails?.firstName} ${studentDetails?.lastName}`,amount/100,orderId,paymentId))

        // console.log('email send successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong in sending email"
        })
    }
}



















// //for single course
// exports.capturePayment = async(req,res) =>{
//     const userId = req.user.id;
//     const {courseId} = req.body;

//     //check wheter courseid is correct or not
//     if(!courseId){
//         res.status(400).json({
//             success:false,
//             message:"please provide valid course id"
//         })
//     }
//     //check for course
//     let course;
//     try {
        
//         course = await Courses.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 success:false,
//                 message:"No course found"
//             })
//         }
        
//         //check if user are already enrolled in that course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false.valueOf,
//                 message:"User already enrolled"
//             })
//         }

//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong"
//         });
//     }

//     //create order
//     const amount = course.price;
//     const currency ="INR";
//     const options ={
//         amount :amount *100,
//         currency,
//         receipt:Math.random(Date.now().toString()),
//         notes:{
//             courseId:course._id,
//             userId
//         }
//     }

//     //createOrder
//     try {
        
//         const paymentDetails = instance.orders.create(options);
//         // console.log(paymentDetails);
//         return res.status(200).json({
//             success:true,
//             message:"Course successfully purchased",
//             course,
//             paymentDetails
//         })

//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({
//             success:false,
//             message:"Something went wrong while sending course"
//         })
//     }
// }

// exports.verifySignature = async(req,res) =>{
//     let webHooks = '123456789';
//     const signature = req.headers['x-razorpay-signaure'];

//     //convert the webSocket in hashed formate in order to matc with the secret key send by raxor pay
//     const hmac = crypto.createHmac('sha256',webHooks);
//     hmac.update(JSON.stringify(req.body));
//     const digest = hmac.digest('hex');

//     if(signature === digest){
//         console.log('payment is authorized');

//         const {courseId , userId} = req.body.payload.payment.entity.notes;
        
//         try {
            
//             //adding users to the courses
//             const enrolledCourses = await Courses.findByIdAndDelete({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});

//             if(!enrolledCourses){
//                 res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//             console.log(enrolledCourses);
//             //adding course to student schema
//             const studentCourse = await Users.findByIdAndDelete({_id:userId},{$push:{courseEnrolled:courseId}},{new:true});

//             console.log(studentCourse);

//             const emailResponse = await mailSender(studentCourse.email ,"New course enrollment" ,"COngrulations you are logged in into new course");

//             return res.status(200).json({
//                 success:true,
//                 message:"signature verifed and course purchased successfully"
//             })

//         } catch (error) {
//             console.log(error.message);
//             return res.status(200).json({
//                 success:false,
//                 message:"Internal server error"
//             })
//         }
//     }

//     else{
//         return res.status(400).json({
//             success:false,
//             message:"invalid request"
//         })
//     }

// }
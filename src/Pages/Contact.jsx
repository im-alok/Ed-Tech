import { TiMessages } from "react-icons/ti";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import ContactusForm from "../Components/Core/ContactUs/ContactusForm";
import Footer from "../Components/common/Footer";

function Contact(){
    return(
    <div className="flex flex-col gap-10">
        <div className="mx-auto w-11/12 max-w-maxContent text-richblack-100 mt-24">
            <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between">
                <div className="flex flex-col gap-10 bg-richblack-800 rounded-3xl p-10  pr-28 h-fit ">
                    <div className="flex flex-row gap-4 items-center">
                        <div className="text-4xl font-bold">
                            <TiMessages />
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="text-lg font-semibold text-richblack-5 ">Chat on us</p>
                            <p className="text-base font-medium text-richblack-200">Our friendly team is here to help.</p>
                            <a href="mailto:okaydaddy695@gmail.com" className="text-base font-medium text-richblack-200 italic underline">okaydaddy695@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                        <div className="text-4xl font-bold">
                        <BsGlobeCentralSouthAsia />
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="text-lg font-semibold text-richblack-5 ">Visit us</p>

                            <p className="text-base font-medium text-richblack-200">Come and say hello at our office HQ.</p>
                            
                            <p className="text-base font-medium text-richblack-200">East Kolkata,West Bengal</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                        <div className="text-4xl font-bold">
                        <IoIosCall />
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="text-lg font-semibold text-richblack-5 ">Call  us</p>
                            <p className="text-base font-medium text-richblack-200">Mon - Fri From 8am to 5pm.</p>
                            <a href="tel:9508171948" className="text-base font-medium text-richblack-200 italic underline">Call me</a>
                        </div>
                    </div>

                </div>


                <div className="sm:w-[50%] border border-richblack-600 rounded-xl sm:p-10 p-5">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-4xl font-semibold text-richblack-5">Got a Idea? We've got the skills. Let's team up </h1>
                        <p className="text-richblack-300 text-base font-medium">Tall us more about yourself and what you’re got in mind.</p>
                        <ContactusForm />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default Contact;
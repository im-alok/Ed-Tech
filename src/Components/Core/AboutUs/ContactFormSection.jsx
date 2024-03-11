import ContactusForm from "../ContactUs/ContactusForm";

function ContactFormSection(){
    return(
        <div className="sm:w-7/12 mx-auto mt-20">
            
            <div className="flex flex-col items-center gap-5">
                
                <h1 className="text-4xl fonr-semibold text-richblack-5 text-center">Get in Touch</h1>
                <p className="text-base font-medium text-richblack-300">We’d love to here for you, Please fill out this form.</p>

                <div>
                    <ContactusForm />
                </div>
            </div>
        </div>
    )
}

export default ContactFormSection;
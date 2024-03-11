import HighLightText from "../Components/Core/HomePage/HighLightText";
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import SectionImage3 from '../assets/Images/FoundingStory.png'
import Button from "../Components/Core/HomePage/Button";
import SquareBox from "../Components/Core/AboutUs/SquareBox";
import ContactFormSection from "../Components/Core/AboutUs/ContactFormSection";
import { Link } from "react-router-dom";
import Footer from "../Components/common/Footer";
import ReviewSlider from "../Components/common/ReviewSlider";

function About(){
    const data =[
        {
            heading:"5K",
            title:"Active Students"
        },
        {
            heading:"10+",
            title:"Mentors"
        },
        {
            heading:"200+",
            title:"Courses"
        },
        {
            heading:"50+",
            title:"Awards"
        },
    ]



    return(
        <div className="font-inter flex flex-col gap-3">
            <div className="w-full flex flex-col items-center gap-14">
                {/* Section1 */}
                
                <div className="w-full h-[618px] bg-richblack-800 flex flex-col items-center pt-20 sm:px-32">

                    <div className="font-medium text-base text-center text-richblack-200">
                        <Link to={"/about"}>
                            About us
                        </Link>
                    </div>

                    <section className="w-11/12 flex flex-col items-center gap-14 mt-14">
                        <div className="flex flex-col  items-center gap-4">
                            <h1 className="text-3xl sm:text-4xl font-bold font-inter sm:text-center text-richblack-5 sm:w-[70%]">Driving Innovation in Online Education for a <HighLightText text="Brighter Future" /></h1>

                            <p className="sm:text-center font-medium text-base text-richblack-300 sm:w-[63%]">
                                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                            </p>
                        </div>

                        <div className="flex sm:flex-row gap-6">
                            <img src={BannerImage1} alt="Banner1" />
                            <img src={BannerImage2} alt="Banner2"/>
                            <img src={BannerImage3} alt="Banner3"/>
                        </div>
                    </section>
                </div>

                {/* Section2 */}

                <section className="mt-24 w-11/12 mx-auto">
                <header className="flex justify-center ">
                    
                    <q className="font-semibold sm:text-4xl sm:text-center text-richblack-100 sm:w-[90%] text-xl mt-7 sm:mt-0">
                        
                        We are passionate about revolutionizing the way we learn. Our innovative platform {" "}
                        <HighLightText text="combines technology" />,{" "} 
                        <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">expertise</span>, 
                        and community to create an  {" "}
                        <span className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">unparalleled educational experience</span>.
                    </q>
                </header>
                </section>

                {/* Section3 */}
                <section className="mt-10 w-9/12 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between gap-24 items-center">

                    <div className="flex flex-col text-xs sm:w-[40%] gap-6">
                        <h1 className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-bold text-4xl">Our Founding Story</h1>
                        <p className="text-richblack-300">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className="text-richblack-300">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                    <div className="">
                        <img src={SectionImage3} alt="Padhta hua bacchha ka photu" />
                    </div>
                </div>
                </section>

                {/* Section4 */}
                <section className="mx-auto mt-10 w-9/12 ">
                <div className="flex flex-col sm:flex-row justify-between gap-24 items-center">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-medium bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">Heading</h1>
                        <p className="text-base text-richblack-300">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-semibold"><HighLightText text="Our Mission" /></h1>
                        <p className="text-base text-richblack-300">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
                </section>

                {/* section5 */}

                <section className="w-full bg-richblack-800 flex flex-col sm:flex-row gap-10 sm:gap-44 items-center justify-center px-24 sm:py-28 py-14">
                    
                    {
                        data.map((e,i)=>{
                            return (
                                <div className="flex flex-col items-center justify-center" key={i}> 
                                    <p className="text-richblack-5 text-3xl font-bold ">{e.heading}</p>
                                    <p className="text-richblack-500 text-base">{e.title}</p>
                                </div>
                            )
                        })
                    }

                </section>

                {/* Section6 */}

                <section className="mx-auto w-9/12 flex flex-col text-richblack-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-20">
                    <div className="flex flex-col sm:w-[45%] gap-5">
                        <h1 className="text-richblack-5 font-semibold text-3xl w-[90%]">World-Class Learning for <HighLightText text="Anyone, Anywhere"/></h1>

                        <p className="font-medium text-base">Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>

                        <div className="w-fit">
                            <Button active={true} linkto="/">Learn More</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row">
                        <SquareBox active={true} heading="Curriculum Based on Industry Needs">
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </SquareBox>

                        <SquareBox active={false} heading='Our Learning Methods'>
                            The learning process uses the namely online and offline.
                        </SquareBox>
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 justify-end">

                        <SquareBox active={true} heading='Certification'>
                            You will get a certificate that can be used as a certification during job hunting.
                        </SquareBox>

                        <SquareBox active={false} heading={`Rating "Auto-grading"`} >
                            You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.
                        </SquareBox>

                        <SquareBox active={true} heading='Ready to Work'>
                            Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.
                        </SquareBox>
                </div>
                <br />
                <br />
                <ReviewSlider />

                </section>

                {/* Section7 */}
                {/* getInTouchForm */}
                <section className="mx-auto w-9/12">
                <ContactFormSection />
                </section>
            </div>
            
            <Footer />
        </div>
    )
}

export default About;
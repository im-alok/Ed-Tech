import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import HighLightText from "../Components/Core/HomePage/HighLightText";
import Button from "../Components/Core/HomePage/Button";
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";


import InstructorSection from "../Components/Core/HomePage/InstructorSection";
import ExploreMore from "../Components/Core/HomePage/ExploreMore";
import Footer from "../Components/common/Footer";
import ReviewSlider from "../Components/common/ReviewSlider";





function HomePage(props){
    return(
        <div className="w-full ">
            {/* Section 1 */}

            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between mt-16">
                {/* Become an Instructor */}

                <Link to={"/signup"}>
                    <div className="group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                        <div className="flex flex-row items-center  gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p >Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}

                <div className="sm:flex sm:flex-row sm:gap-2 sm:text-center text-4xl font-semibold mt-10">
                    <h1 className="inline">Empower your Future with </h1>
                    <HighLightText text={"Coding Skills"} />
                </div>

                {/* SubHeading */}
                <div className="sm:w-[70%] sm:text-center font-semibold  text-richblack-400 mt-4">
                    <p className="">With our Online coding courses, You can learn at your own pace,from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizes, and personalized feedback from Instructor</p>
                </div>

                {/* Buttons */}

                <div className="flex flex-row gap-7 mt-8">
                    <Button active={true} linkto={"/signup"}>
                        Learn more
                    </Button>
                    <Button  active={false} linkto={"/login"}>
                        Book a demo
                    </Button>
                </div>

                {/* Adding Video */}

                <div className="mx-3 my-16 shadow-[-20px_-50px_220px_-50px] shadow-blue-200">
                        <div>
                            <video
                            className="shadow-[20px_20px_rgb(255,255,255)]"
                                muted
                                autoPlay
                                loop
                                width={1035}
                            >
                                <source src={Banner} type="video/mp4" />
                            </video>
                        </div>
                    </div>

                
                {/* codeSections */}

                {/* codeblock1 */}

                <CodeBlocks
                    position={"flex-row"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock your {" "}
                            <HighLightText text={"coding potential"}  /> {" "}
                            with our online courses
                        </div>
                    }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    Button1={
                        {
                            active:true,
                            linkto:"/signup",
                            btnText:"Try it Yourself"
                        }
                    }
                    Button2={
                        {
                            active:false,
                            linkto:"/login",
                            btnText:"Learn more"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two< \n /a><ahref="three/">Three</a> \n /nav>`}

                    codeColor={"text-yellow-25"}
                    backgroundGradient={
                        {
                            from:"#FFA500",
                            to:"#8A2BE2",
                            shadow:"0px_0px_200px_11px_rgba(138,43,226,1)"
                        }
                    }
                />
            

                {/* codeblock2 */}
                
                <CodeBlocks
                    position={"flex-row-reverse"}
                    heading={
                        <div className="text-5xl font-semibold">
                            Start {" "}
                            <HighLightText text={"Coding in Seconds"}  /> {" "}
                        </div>
                    }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    Button1={
                        {
                            active:true,
                            linkto:"/login",
                            btnText:"Continue Lessons"
                        }
                    }
                    Button2={
                        {
                            active:false,
                            linkto:"/login",
                            btnText:"Learn more"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two< \n /a><ahref="three/">Three</a> \n /nav>`}

                    codeColor={"text-pink-50"}
                    backgroundGradient={
                        {
                            from:"#FFA500",
                            to:"#8A2BE2",
                            shadow:"0px_0px_200px_11px_rgba(31,162,255,1)"
                        }
                    }
                />

                <div className="w-full">
                    <ExploreMore />
                </div>
            </div>

            {/* Section 2 */}

            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="home_page h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between">
                        <div className="h-[250px]"></div>
                        <div className="flex flex-row gap-7 text-white justify-center items-center ">
                            <Button linkto={"/login"} active={true}>
                                <div className="flex flex-row items-center sm:gap-3 gap-1 font-bold">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </Button>

                            <Button linkto={"/about"} active={false}>
                                    <div className="font-bold">
                                        Learn More
                                    </div>
                            </Button>
                        </div>
                    </div>

                </div>

                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-7">
                    
                    <div className="flex flex-col sm:flex-row gap-5 sm:mb-10 mt-[95px]">
                        <div className="text-4xl font-bold sm:w-[45%]">
                            Get the skills you need for a <HighLightText text={"job that is in demand."} />
                        </div>

                        <div className="flex flex-col gap-10 sm:w-[40%] items-start">
                            <div className="text-[16px] font-bold">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                                <Button linkto={"/signup"} active={true}>
                                    Learn more
                                </Button>
                        </div>
                    </div>

                </div>

                <TimeLineSection />
                <LearningLanguageSection />
            </div>

            {/* Section 3 */}
            
            <div className="mt-32 w-11/12 mx-auto max-w-maxContent text-white flex flex-col justify-between gap-8">
                
                <InstructorSection />

                <h2 className="text-center text-4xl font-semibold mt-10 ">Reviews From <HighLightText text="Other Learners" /></h2>

                {/* Review Slider Code */}
                <ReviewSlider />

            </div>

            {/* Footer */}

            <Footer />

        </div>
    )
}

export default HomePage;
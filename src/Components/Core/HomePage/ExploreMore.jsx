import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard";

const tabData = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function ExploreMore(){
    //State Variables

    const [currentTab , setCurrentTab] = useState(tabData[0]);
    const [courses,setCourses] =useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0 ].courses[0].heading);

    function setMyCards(value) {
        setCurrentTab(value);
        const Result = HomePageExplore.filter((Page) => Page.tag === value);
        console.log(Result);
        setCourses(Result[0].courses);
        setCurrentCard(Result[0].courses[0].heading);
    }

    return(
        <div className="flex flex-col justify-center items-center ">
            <div className="text-4xl font-semibold text-center">
                Unlock the  <HighLightText text='Power of Code' />
            </div>
            <div>
                <p className="sm:text-center text-richblack-300 sm:text-[16px] font-semibold mt-3">
                    Learn to build anything you can imagine
                </p>
            </div>

            <div className="mt-5 mb-5 hidden  border border-richblue-500 rounded-full  px-5 py-2 w-fit sm:flex flex-row gap-7">
                {
                    tabData.map( (element,index) =>{
                        return(
                            <div key={index}
                            className={`${currentTab === element 
                                        ? "bg-richblack-800"
                                        : "bg-richblack-900"
                                    } py-1 px-5 rounded-full text-[16px] gap-2 transition-all duration-200 cursor-pointer hover:bg-richblack-800 hover:text-richblack-5`}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[750px] sm:h-[150px] relative w-[90%] sm:w-[70%]">

                <div className=" flex flex-row gap-16 sm:gap-10 justify-between mt-5 flex-wrap sm:flex-nowrap">
                    {/* course card ka group */}
                    {
                        courses.map((element , index) =>{
                            return(
                                <CourseCard 
                                    key={index}
                                    cardData={element}
                                    currentCard={currentCard}
                                    setCurrentCard ={setCurrentCard}
                                />
                            )
                        })
                    }
                    </div>
            </div>
            
        </div>
        
    )
}

export default ExploreMore;
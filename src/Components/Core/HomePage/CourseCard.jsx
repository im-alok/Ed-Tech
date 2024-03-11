import {ImTree} from 'react-icons/im';
import { HiUsers } from "react-icons/hi2";

function CourseCard({cardData, currentCard, setCurrentCard}){

    return(
        <div className={`group flex flex-col gap-10  py-5 sm:w-[50%] px-7
            ${cardData.heading === currentCard
                ? "bg-white text-richblack-900 shadow-[15px_15px_10px_0px] shadow-yellow-50"
                :"bg-richblack-800"
            } transition-all duration-200 hover:scale-105 hover:bg-white hover:text-richblack-900 hover:shadow-[15px_15px_10px_0px] hover:shadow-yellow-50
        `}
        onClick={() =>{setCurrentCard(cardData.heading)}}
        >
            <div className="flex flex-col gap-5 ">
                <div className="text-lg font-semibold ">
                    <h2>{cardData.heading}</h2>
                </div>
                <div className="font-inter text-[15px] leading-[24px] text-[#585D69]" >
                    <h3>{cardData.description}</h3>
                </div>
            </div>
            <div className={`flex flex-row justify-between 
            ${cardData.heading === currentCard
                ? "text-[#1a1a54]"
                :"text-[#585D69]" 
            } group-hover:text-[#1a1a54]
            `}>
                <div className="flex flex-row gap-1 items-center">
                    <HiUsers />
                    <p>{cardData.level}</p>
                </div>
                
                <div className="flex flex-row gap-1 items-center">
                    <ImTree />
                    <p>{cardData.lessionNumber} Lessons</p>
                </div>
                
            </div>
        </div>
    )
}

export default CourseCard;
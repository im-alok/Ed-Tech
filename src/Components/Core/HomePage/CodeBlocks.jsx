import Button from "./Button";
import {FaArrowRight} from "react-icons/fa"
import {TypeAnimation} from 'react-type-animation'

function CodeBlocks({
    position, heading, subHeading, Button1,Button2,codeblock, backgroundGradient, codeColor
}){
    return(
        <div className={`flex ${position} flex-wrap sm:flex-nowrap my-20 justify-between gap-10 sm:w-[80%] w-[100%]`}>
            {/* Section1 */}

            <div className="flex flex-col sm:w-[50%] w-[100%] gap-8 ">
                {heading}
                <div className="text-richblack-300 font-bold">
                    {subHeading}
                </div>

                <div className="flex flex-row gap-7 mt-7">
                    <Button active={Button1.active} linkto={Button1.linkto}>
                        <div className="flex flex-row gap-2 items-center">
                            {Button1.btnText}
                            <FaArrowRight />
                        </div>
                    </Button>

                    <Button active={Button2.active} linkto={Button2.linkto}>
                            {Button2.btnText}
                    </Button>


                </div>

            </div>

            {/* Section 2 */} 
            <div className="flex h-fit sm:w-[50%] w-[100%] flex-row  py-4 relative">

                {/* background blur */}

                <div className={`w-[150px] h-[100px] rounded-full bg-gradient-to-r from-[#FFA500] to-[#8A2BE2] bg-transparent absolute left-1 top-[20px] shadow-[0px_0px_200px_11px_rgba(31,162,255,1)]`}></div>


                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold backdrop-blur-[100px] p-4 text-[13px] leading-[21.5px] sm:leading-6 sm:text-base">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 sm:font-semibold font-mono ${codeColor} pr-2  backdrop-blur-[100px] p-4 text-xs leading-[18px] sm:leading-6 sm:text-[16px]`}>
                    <TypeAnimation
                        sequence={[codeblock,2000,""] }
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace:'pre-line',
                                display:"block"
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>

        </div>
    )
}

export default CodeBlocks;
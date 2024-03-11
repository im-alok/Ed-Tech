import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';

import TimeLineImage from '../../../assets/Images/TimelineImage.png'


const TimeLineData = [
    {
        Logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]



function TimeLineSection(){
    return(
        <div className='mt-16 w-11/12 mx-auto max-w-maxContent '>
            <div className="flex flex-col sm:flex-row gap-16 items-center justify-center">
                <div className="flex flex-col sm:w-[45%] gap-5">

                    {
                        TimeLineData.map( (data) =>(
                            <div className="flex flex-row gap-6">
                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={data.Logo} alt='few time line photos'/>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className='font-semibold text-[18px]'>{data.heading}</h2>
                                    <p className='text-base'>{data.description}</p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
                
                <div className='relative shadow-blue-200 mb-20'>
                    <img src={TimeLineImage} alt='timeLine'
                    />
                    
                    <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>                            <div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                                <h1 className='text-3xl font-bold'>10</h1>
                                <h2 className='text-caribbeangreen-300 text-sm'>Years of Experience</h2>
                            </div>

                            <div className='flex gap-5 items-center px-7'>
                                <h1 className='text-3xl font-bold'>250</h1>
                                <h2 className='text-caribbeangreen-300 text-sm'>Types of Courses</h2>
                            </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TimeLineSection;
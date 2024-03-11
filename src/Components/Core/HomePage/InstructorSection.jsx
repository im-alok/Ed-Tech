import Instructor from '../../../assets/Images/Instructor.png';
import HighLightText from './HighLightText';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection(){
    return(
        <div className="flex flex-col sm:flex-row items-center gap-20">
                    <div className='sm:w-[50%] shadow-[-20px_-20px_0px_0px_rgb(255,255,255)]'>{/*Contain image */}
                        <img src={Instructor} alt='Become an Instructor'/>
                    </div>
                    <div className="flex flex-col justify-center gap-10 sm:w-[50%]">
                        <div className='text-4xl font-semibold sm:w-[50%]'>
                            Become an <HighLightText text='instructor' />
                        </div>
                        <div className='font-medium text-[16px] sm:w-[80%] text-richblack-300'>
                            <p>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        </div>
                        <div className="w-fit">
                            <Button active={true} linkto={'/signup'}>
                                <div className="flex flex-row gap-2">
                                    Start Teaching Today
                                    <FaArrowRight />
                                </div>
                            </Button>
                        </div>
                    </div>

                </div>
    );
}

export default InstructorSection;
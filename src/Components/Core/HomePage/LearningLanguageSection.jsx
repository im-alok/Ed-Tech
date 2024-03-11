import HighLightText from "./HighLightText";
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import Button from "./Button";

function LearningLanguageSection(){
    return(
        <div className="mt-16 sm:mt-28 w-11/12 mx-auto max-w-maxContent ">
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="text-4xl font-semibold sm:text-center">
                    Your Swiss knife for  <HighLightText text="learning any language " />
                </div>
                <div className="sm:text-center text-richblack-600 mx-auto text-base sm:mt-3 sm:font-bold sm:w-[60%]">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center mt-5 ">
                    <img src={know_your_progress}
                        alt="Know Your Progress"
                        className="object-contain sm:-mr-32"
                    />

                    <img src={compare_with_others}
                        alt="compare with others "
                        className="object-contain"
                    />
                    <img src={plan_your_lessons}
                        alt="plan your lessons"
                        className="object-contain sm:-ml-36"
                    />
                </div>
                <div className="mb-16">
                    <Button active={true} linkto={'/signup'}>
                        Learn more
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection;
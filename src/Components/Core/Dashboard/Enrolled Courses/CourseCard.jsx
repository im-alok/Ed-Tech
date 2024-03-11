import ProgressBar from '@ramonak/react-progress-bar'
import { Link } from 'react-router-dom';

function CourseCard({course}){
    // console.log(course);
    return(
        <Link to={`/view-course/${course._id}/section/${course?.courseContent[0]._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`}>
        
            <div className='text-white mt-2 p-4 py-6  sm:p-6 border-b-2 border-richblack-700 flex justify-between items-center'>
                <div className='flex flex-col sm:flex-row gap-5 w-[100px] sm:w-fit'>
                    <img src={course?.thumbnail}  
                    className='w-16 h-16 sm:w-24 sm:h-20 object-cover rounded-lg'
                    />
                    <div className='flex flex-col gap-1 w-[150px]'>
                        <p className='text-richblack-5 font-semibold text-lg'>{course?.courseName}</p>
                        <p className='text-sm text-richblack-50'>
                        {
                            course?.courseDescription.length > 20
                            ?`${course?.courseDescription.substring(0,20)}...`
                            :(
                                course?.courseDescription
                            )
                        }
                        </p>
                    </div>
                </div>
                <p className=''>{course?.totalDuration}</p>
                <div className='flex flex-col gap-2 w-[120px] sm:w-[200px] '>
                    <p className='self-center'>Progress - {course?.progressPercentage}%</p>
                    <ProgressBar 
                        completed={course?.progressPercentage}
                        height="8px"
                        isLabelVisible={false}
                    />
                </div>
            </div>

        </Link>
    )
}

export default CourseCard
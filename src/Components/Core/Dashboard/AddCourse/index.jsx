import RenderSteps from "./RenderSteps";

export default function AddCourse(){
    return (
        <>
            <div className="mt-7 w-11/12 mx-auto text-white flex gap-36 flex-wrap ">
                
                <div className="flex flex-col gap-5">
                    <h1>Add Course</h1>
                    <div className="">
                        <RenderSteps />

                    </div>
                </div>
                
                {/* Instructions */}
                <div className="w-[400px] h-fit flex flex-col p-6 gap-5 bg-richblack-800 border border-richblack-700 rounded-lg">
                    <p className="text-lg">⚡ Course Upload Tips</p>
                    <ul className="text-[12px] flex flex-col gap-5 list-disc">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>

            </div>
        </>
    )
}
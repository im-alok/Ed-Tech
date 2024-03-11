import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {Player,BigPlayButton,PlaybackRateMenuButton,ControlBar} from 'video-react';
import { CiPlay1 } from "react-icons/ci";
import ButtonIcon from "../../common/ButtonIcon";
import { updateCourseProgress } from "../../../Services/operations/courseOperation";
import { updateCompletedLectures } from "../../../Slices/viewCourseSlice";


function VideoDetails(){
    // <link
    //     rel="stylesheet"
    //     href="https://video-react.github.io/assets/video-react.css"
    // />

    const [isVideoEnded,setIsVideoEnded] = useState(false);
    const {courseId,sectionId,subSectionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const playerRef = useRef();
    const {token} = useSelector((state)=>state.auth);
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state)=>state.viewCourse);
    
    const [videoData,setVideoData] = useState([]);
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    
    
    useEffect(()=>{
        function setVideoSpecificDetails(){
            // console.log(courseSectionData?.length)

            if(!courseSectionData?.length)
                return;
            if(!courseId && !sectionId && !!subSectionId){
                navigate('/dashboard/enrolled-courses');
            }

            
            else{
                // console.log(courseSectionData)
                const filteredIndex = courseSectionData?.findIndex((section)=>section._id === sectionId);
                const filteredData = courseSectionData[filteredIndex];
                // console.log(filteredIndex,filteredData);

                const exactVideoIndex = filteredData?.subSection?.findIndex((subSection)=>subSection._id === subSectionId);

                const exactVideo = filteredData?.subSection[exactVideoIndex];
                // console.log(exactVideoIndex,exactVideo);


                setVideoData(exactVideo);
            }

        }

        setVideoSpecificDetails();

        if(isVideoEnded)
            setIsVideoEnded(false);
        console.log(location.pathname)

    },[courseEntireData,courseSectionData,location.pathname])

    function isFirstVideo(){
        const currSection = courseSectionData.findIndex((data)=>data._id === sectionId);

            //getting index of subSection Id 
        const currSubSection = courseSectionData[currSection]?.subSection?.findIndex((data)=>data._id === subSectionId);

        if(currSection === 0 && currSubSection === 0)
            return true;
        else
            return false;
    }

    function isLastVideo(){
        const currSection = courseSectionData.findIndex((data)=>data._id === sectionId);

            // number of subSection
        const noOfSubSection = courseSectionData[currSection].subSection.length;

            //getting index of subSection Id 
        const currSubSection = courseSectionData[currSection]?.subSection?.findIndex((data)=>data._id === subSectionId);


        if(currSection === courseSectionData.length - 1  && currSubSection === noOfSubSection - 1)
            return true;

        else
            return false;

    }

    function goToNextVideo(){
        const currSection = courseSectionData.findIndex((data)=>data._id === sectionId);

            // number of subSection
        const noOfSubSection = courseSectionData[currSection].subSection.length;

            //getting index of subSection Id 
        const currSubSection = courseSectionData[currSection]?.subSection?.findIndex((data)=>data._id === subSectionId);

        if(currSubSection !== noOfSubSection - 1){
            const nextSubSectionId = courseSectionData[currSection].subSection[currSubSection + 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            const newSection = courseSectionData[currSection + 1]._id;
            const newSubSection = courseSectionData[currSection + 1].subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${newSection}/sub-section/${newSubSection}`);
        }
        setIsVideoEnded(false)
    }

    function goToPreviousVideo(){
        const currSection = courseSectionData.findIndex((data)=>data._id === sectionId);

            //getting index of subSection Id 
        const currSubSection = courseSectionData[currSection]?.subSection?.findIndex((data)=>data._id === subSectionId);
        

        if(currSubSection !== 0){
            const nextSubSectionId = courseSectionData[currSection].subSection[currSubSection - 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            console.log('Hello')
            const nextSection = courseSectionData[currSection - 1]._id;
            // console.log(nextSection);
            const noOfSubSection = courseSectionData[currSection-1]?.subSection?.length
            // console.log(noOfSubSection);
            const nextSubSection = courseSectionData[currSection - 1].subSection[noOfSubSection - 1]._id;
            // console.log(nextSubSection);

            navigate(`/view-course/${courseId}/section/${nextSection}/sub-section/${nextSubSection}`);

        }
        setIsVideoEnded(false);
    }

    async function handleLectureCompletion(){
        //left portion
        setLoading(true);
        try {
            const response = await updateCourseProgress(courseId,subSectionId,token);

            //updating the state
            if(response)
                dispatch(updateCompletedLectures(subSectionId));
            // console.log(completedLectures)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    
    return(
        <>
            <div className="text-white relative">
                {
                    !videoData ? (<p>No Data Found</p>)
                    : (
                        <div className="relative">
                            <Player
                            autoPlay={false}
                            ref={playerRef}
                            aspectRatio="10:4"
                            playsInline
                            onEnded={()=>setIsVideoEnded(true)}
                            src={videoData?.videoUrl}
                            >
                                <BigPlayButton position="center"/>
                                <ControlBar>
                                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]}/>
                                </ControlBar>

                            </Player>
                            

                                {
                                    isVideoEnded && (
                                        <div className={`absolute
                                        ${isVideoEnded?"w-full inset-0 z-[10] !mt-0 grid place-items-center overflow-auto bg-richblack-400 bg-opacity-10 backdrop-blur-sm":""}
                                        `}>
                                            {
                                                !completedLectures?.includes(subSectionId) &&(
                                                    <ButtonIcon 
                                                    disabled={loading}
                                                    onclick={handleLectureCompletion}
                                                    text={!loading ? "Mark as completed" :"Loading..."}
                                                    />
                                                )
                                            }
                                            {
                                                <ButtonIcon 
                                                disabled={loading}
                                                onclick={()=>{
                                                    if(playerRef?.current){
                                                        playerRef?.current?.seek(0);
                                                        setIsVideoEnded(false);
                                                    }
                                                }}
                                                text={'Rewatch'}
                                                />
                                            }
                                            <div>
                                                {
                                                    !isFirstVideo() && (
                                                        <button 
                                                        disabled={loading}
                                                        onClick={()=>goToPreviousVideo()}
                                                        className='blackButton'
                                                        >
                                                            Prev
                                                        </button>
                                                    )
                                                }
                                            </div>

                                            <div>
                                                {
                                                    !isLastVideo() && (
                                                        <button 
                                                        disabled={loading}
                                                        onClick={()=>goToNextVideo()}
                                                        className='blackButton'
                                                        >
                                                            Next
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }                    
                        </div>
                    )
                }

                <div>
                    <h1>{videoData?.title}</h1>
                    <p>{videoData?.description}</p>
                </div>
            </div>
        </>
    )
}

export default VideoDetails;
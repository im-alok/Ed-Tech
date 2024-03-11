import {Swiper,SwiperSlide} from 'swiper/react'
import { FreeMode,Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import Course_Card from './Course_Card'
import { useEffect, useState } from 'react';


function CourseSlider({Courses,tagName}){

    const[windowSize,setWindowSize] = useState(0);

    function displayWindowSize(){
        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        setWindowSize(w);
    }
        
    // Attaching the event listener function to window's resize event
    window.addEventListener("resize", displayWindowSize);
    
    useEffect(()=>{
        setWindowSize(document.documentElement.clientWidth);
    },[])


    return (
        <div className='mb-10'>
            {
                Courses?.length >0 
                ?(
                    <Swiper
                    slidesPerView={windowSize < 640 ? 1 : 3}
                    spaceBetween={30}
                    loop={false}
                    pagination={windowSize > 640 ?true:false}
                    autoplay={{
                        delay:10000,
                        disableOnInteraction:false
                    }}
                    modules={[Pagination,Autoplay]}
                    // breakpoints={{
                    //     1024:{slidesPerView:2,}
                    // }}
                    >
                        {
                            Courses.map((course,index)=>(
                                <SwiperSlide key={index}
                                
                                >
                                    <Course_Card course={course} Height={'h-[250px]'}/>
                                </SwiperSlide>
                                ))
                        }
                    </Swiper>
                )
                :(
                    <p className='text-2xl flex justify-center font-bold text-pink-300'>No courses found for {tagName}</p>
                )
            }
        </div>
    )
}

export default CourseSlider
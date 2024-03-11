import { useEffect, useState } from "react";
import { getAllReviews } from "../../Services/operations/ReviewOperation";
import {Swiper,SwiperSlide} from 'swiper/react'
import { FreeMode,Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import ReactStars from 'react-rating-stars-component';

function ReviewSlider(){
    
    const [reviews,setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(()=>{
        async function getAllRatingAndReviews(){
            const response = await getAllReviews();
            setReviews(response);
        }

        getAllRatingAndReviews();
    },[]);

    // console.log(reviews);
    return(
        <div className="mb-10 ">
            <div className="h-[190px] p-5 rounded-md hidden sm:block">
                <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                // pagination={true}
                autoplay={{
                    delay:3000,
                    disableOnInteraction:false
                }}
                modules={[Pagination,Autoplay]}
                // breakpoints={{
                //     1024:{slidesPerView:2,}
                // }}
                className=""
                >
                    {
                        reviews?.map((review)=>{
                            return <SwiperSlide>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-5 rounded-md">
                                    <div className="flex gap-3">
                                        <img 
                                        src={review?.user?.image}
                                        alt="User who has given review"
                                        width={50}
                                        height={50}
                                        className="aspect-square rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-base font-semibold text-richblack-5 ">{review?.user?.firstName} {review?.user?.lastName}</p>
                                            <p
                                            className="text-xs text-richblack-300 font-semibold"
                                            >{review?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <div className="text-md text-richblack-5 font-semibold">
                                        {review?.review}
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p
                                        className="text-lg font-semibold text-yellow-25"
                                        >{review?.rating}.0</p>
                                        <ReactStars 
                                        count={5}
                                        size={24}
                                        value={review?.rating}
                                        edit={false}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>


            <div className="h-[190px] p-5 rounded-md sm:hidden">
                <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                // pagination={true}
                autoplay={{
                    delay:3000,
                    disableOnInteraction:false
                }}
                modules={[Pagination,Autoplay]}
                // breakpoints={{
                //     1024:{slidesPerView:2,}
                // }}
                className=""
                >
                    {
                        reviews?.map((review)=>{
                            return <SwiperSlide>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-5 rounded-md">
                                    <div className="flex gap-3">
                                        <img 
                                        src={review?.user?.image}
                                        alt="User who has given review"
                                        width={50}
                                        height={50}
                                        className="aspect-square rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-base font-semibold text-richblack-5 ">{review?.user?.firstName} {review?.user?.lastName}</p>
                                            <p
                                            className="text-xs text-richblack-300 font-semibold"
                                            >{review?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <div className="text-md text-richblack-5 font-semibold">
                                        {review?.review}
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p
                                        className="text-lg font-semibold text-yellow-25"
                                        >{review?.rating}.0</p>
                                        <ReactStars 
                                        count={5}
                                        size={24}
                                        value={review?.rating}
                                        edit={false}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider;
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper React components
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Autoplay, Parallax, Pagination, Mousewheel, Keyboard, A11y } from "swiper/modules";


import dataSlider from '../lib/slider-data.json';
import Image from 'next/image';
import SliderButton from './slider-card-buttons';

const ActiveSlider = (data: any) => {


    return (
        <div className='w-[80%] mb-3' >

            <Swiper
                parallax={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    340: { slidesPerView: 1, spaceBetween: 12 },
                    700: { slidesPerView: 3, spaceBetween: 12 },
                    1275: { slidesPerView: 4, spaceBetween: 12 },
                }}
                modules={[Pagination, Navigation, A11y]}
                className=" "
            >
                {dataSlider.map((item: any) => (
                    <SwiperSlide key={item.id}
                        className='!flex justify-center items-center bg-gray-200 border-gray-500 rounded-xl shadow-blue-gray-600' >

                        <div className='border-2 border-gray-500 rounded-xl overflow-hidden
                         w-[270px] h-[300px] flex justify-center shadow-sm'>

                            <Image src={item.image}
                                width={500}
                                height={500}
                                alt={item.title}
                            />
                        </div>

                    </SwiperSlide>
                ))}

                <SliderButton />
            </Swiper>
        </div>
    );
};

export default ActiveSlider;

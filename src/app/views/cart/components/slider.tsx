'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import {
    Navigation,
    Autoplay,
    Parallax,
    Pagination,
    Mousewheel,
    Keyboard,
    A11y,
} from 'swiper/modules';

import dataSlider from '../../../lib/slider-data.json';
import Image from 'next/image';
import SliderButton from '../../../components/slider-card-buttons';

const Slidercard = (data: any) => {
    const majorityElement = (nums: any) => {
        let candidate = 0;
        let count = 0;
        for (let i = 0; i <= nums.length; i++) {
            //  console.log('count', count)
            if (count === 0) candidate = nums[i];

            if (nums[i] === candidate) {
                count += 1;
            }
            else count -= 1;

        }
        // console.log(candidate);
    }
    majorityElement([5, 2, 1, 1, 1, 2, 2])




    return (
        <div className="w-[80%] mb-3">
            <Swiper
                parallax={true}
                autoplay={{
                    delay: 2500,
                    //  disableOnInteraction: false,
                }}
                breakpoints={{
                    340: { slidesPerView: 1, spaceBetween: 12 },
                    700: { slidesPerView: 3, spaceBetween: 12 },
                    1275: { slidesPerView: 5, spaceBetween: 12 },
                }}

                /*   pagination={{
                      clickable: true,
                  }} */
                navigation={true}
                modules={[Pagination, Navigation]}

            >
                {dataSlider.map((item: any) => (
                    <SwiperSlide
                        key={item.id}
                        className="!flex flex-col  justify-center items-center cursor-pointer "
                    >
                        <div
                            className="border-2 border-gray-500  
                            !w-full h-[200px] flex justify-center shadow-sm"
                        >
                            <Image
                                src={item.image}
                                width={500}
                                height={500}
                                alt={item.title}
                            />
                        </div>
                        <div className='flex flex-col m-2'>
                            <p className="line-clamp-1 break-all m-2">
                                {' '}
                                SHEIN Clasi Solid Rib-knit Bodycon Dress
                            </p>
                            <span>
                                <p className="m-0 p-0 text-base text-[#fa6338] font-bold">
                                    <span>$13.19</span>
                                </p>
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
                {/*    <div className="navigation">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div> */}
                {/*   <SliderButton /> */}
            </Swiper>
        </div>
    );
};

export default Slidercard;

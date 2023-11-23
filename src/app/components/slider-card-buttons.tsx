
import { useSwiper } from 'swiper/react'

const SliderButton = () => {

    const swiper = useSwiper();
    return (
        <div className='border-2 border-gray-200  w-fit px-2 rounded-xl mt-4 space-x-4'>
            <button className='bg-gray-900 px-2 py-2 text-sm text-white transition hover:bg-gray-70 p-1 rounded-lg' onClick={() => swiper.slidePrev()}>
                Prev
            </button>

            <button className='bg-gray-900 px-2 py-2 text-sm text-white transition hover:bg-gray-700
             p-1 rounded-lg' onClick={() => swiper.slideNext()}>
                Next
            </button>
        </div>
    )
}

export default SliderButton

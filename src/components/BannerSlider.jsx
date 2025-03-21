import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { memo } from 'react'
import { useSettings } from '../data/setting'

const BannerSlider = () => {
    const { data: { setting_banners = [] } = {} } = useSettings()

    return (
        <div className="relative mb-8">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {setting_banners?.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                            <img
                                src={banner.image.url}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className={`absolute inset-0 bg-opacity-30 flex flex-col justify-center items-center p-6`}
                                style={{ color: banner.textColor }}
                            >
                                <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                                <p className="text-lg mb-4">{banner.subtitle}</p>
                                <a
                                    href={banner.link}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    {banner?.buttonName}
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Sử dụng thẻ <style> thông thường */}
            <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
      `}</style>
        </div>
    )
}

export default memo(BannerSlider)

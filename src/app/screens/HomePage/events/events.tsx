import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    EffectCoverflow,
    Autoplay
} from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);

const Events = () => {
    return (
        <div className="App">
            <Swiper
                navigation
                loop
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                    // slideToClickedSlide: true
                }}
                slidesPerView={3}
                centeredSlides
                style={{ height: "500px" }}
                className="swiper-container"
            >
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-1.jpg)"
                    }}
                >
                    Slide 1
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-2.jpg)"
                    }}
                >
                    Slide 2
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-3.jpg)"
                    }}
                >
                    Slide 3
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-4.jpg)"
                    }}
                >
                    Slide 4
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-5.jpg)"
                    }}
                >
                    Slide 5
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-6.jpg)"
                    }}
                >
                    Slide 6
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-7.jpg)"
                    }}
                >
                    Slide 7
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-8.jpg)"
                    }}
                >
                    Slide 8
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-9.jpg)"
                    }}
                >
                    Slide 9
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage:
                            "url(https://swiperjs.com/demos/images/nature-10.jpg)"
                    }}
                >
                    Slide 10
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
export default Events;

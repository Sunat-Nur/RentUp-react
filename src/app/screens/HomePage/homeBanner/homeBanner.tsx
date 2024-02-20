import {useRef} from "react";

import {bannerImgOne, bannerImgTwo, bannerImgTwo3, bannerImgTwo4, bannerImgTwo5, bannerImgTwo6} from "./images";
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {Autoplay, Pagination, Navigation} from "swiper/modules";

import SwiperSlideComponent from "./SwiperSlide";

const Banner = () => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty(
                "--progress",
                String(1 - progress)
            );
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    const swiperOptions: SwiperProps = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
        },
        modules: [Autoplay, Pagination, Navigation],
        onAutoplayTimeLeft: onAutoplayTimeLeft,
        className: "mySwiper",
    };

    return (
        <div className="home_banner">
            <Swiper {...swiperOptions}>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgOne}/>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgTwo}/>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgTwo3}/>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgTwo4}/>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgTwo5}/>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <SwiperSlideComponent image={bannerImgTwo6}/>
                </SwiperSlide>

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Banner;

import NextArrow from "./NextArrov";
import PrevArrow from "./PrevArrow";

export const settings = {
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 4,
  nextArrow: <NextArrow data-aos="fade-right" />,
  prevArrow: <PrevArrow data-aos="fade-left" />,
  infinite: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

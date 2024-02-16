import Image from "./Image";
import { useHistory } from "react-router-dom";

const SwiperSlideComponent = (props: any) => {
  const history = useHistory();
  return (
    <>
      <Image className="h-[700px] w-full object-cover" imgSrc={props.image} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight md:w-full w-[300px] lg:max-w-[888px] backdrop-blur-[2px] text-primary   ">
          Creative Home Simpify your Furniture
        </h1>

        <button
          onClick={() => history.push("/company")}
          className="shop-button text-white font-bold hover:shadow-lg hover:scale-105 duration-300 shadow-white mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  "
        >
          find your dream home
        </button>
      </div>
    </>
  );
};

export default SwiperSlideComponent;

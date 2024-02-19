import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
// import { colors } from "../../../../constants/shopFilterCategories";
import { useCombinedContext } from "../../../../context/useCombinedContext";

const Address = () => {
    const [showColors, setShowColors] = useState(true);
    const { updateTargetSearchObj } = useCombinedContext();

    const handleColorChange = (selectedColor: string, category: string) => {
        updateTargetSearchObj(selectedColor, category);
    };

    return (
        <div data-aos="zoom-in-down" data-aos-delay={400}>
            <div
                onClick={() => setShowColors(!showColors)}
                className="cursor-pointer transition-all"
            >
                <NavTitle title="Chose by Address" icons={true} />
            </div>
            {showColors && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <ul className="flex flex-col gap-4 text-sm lg:text-[16px] leading-4 text-[#767676]">
                        {/*{colors?.map((item) => (*/}
                        {/*    <label*/}
                        {/*        key={item._id}*/}
                        {/*        onClick={() => handleColorChange(item.title, "color")}*/}
                        {/*        className="border-b-[1px] cursor-pointer capitalize border-b-[#F0F0F0] pb-2 flex items-center gap-2"*/}
                        {/*    >*/}
                        {/*        <input type="radio" name="group1" />*/}
                        {/*        <span className="custom-checkbox"></span>*/}
                        {/*        <span*/}
                        {/*            style={{ background: item.base }}*/}
                        {/*            className={`w-3 h-3 border-gray-300 border-[1px] border-solid  rounded-full`}*/}
                        {/*        ></span>*/}
                        {/*        {item.title}*/}
                        {/*    </label>*/}
                        {/*))}*/}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Address;

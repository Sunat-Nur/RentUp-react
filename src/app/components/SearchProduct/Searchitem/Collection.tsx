import React, { useState } from "react";
import NavTitle from "./NavTitle";
import { motion } from "framer-motion";
// import { items } from "../../../../constants/shopFilterCategories";
import { Box, Stack } from "@mui/material";
import { useCombinedContext } from "../../../../context/useCombinedContext";

const Collection = () => {
    const [showCategory, setShowCategory] = useState(true);
    const { updateTargetSearchObj } = useCombinedContext();

    const handleCategoryChange = (value: string, category: string) => {
        updateTargetSearchObj(value, category);
    };

    return (
        <Stack data-aos="zoom-in-down" data-aos-delay={200}>
            <Box
                onClick={() => setShowCategory(!showCategory)}
                className="cursor-pointer transition-all"
            >
                <NavTitle title="Search Address" icons={true} />
            </Box>
            <div>
                {showCategory && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ul className="flex flex-col gap-4 text-sm lg:text-[16px] leading-4 text-[#767676]">
                            <label
                                onClick={() => handleCategoryChange("", "all")}
                                className="border-b-[1px] capitalize cursor-pointer gap-3 justify-start border-b-[#F0F0F0] pb-2 flex items-center "
                            >
                                <input type="radio" name="group1" />
                                <span className="custom-checkbox"></span>All
                            </label>
                            {/*{items?.map(({ _id, title }) => (*/}
                            {/*    <label*/}
                            {/*        key={_id}*/}
                            {/*        onClick={() => handleCategoryChange(title, "collection")}*/}
                            {/*        className="border-b-[1px] capitalize cursor-pointer justify-start border-b-[#F0F0F0] pb-1 flex items-center gap-3"*/}
                            {/*    >*/}
                            {/*        <input type="radio" name="group1" />*/}
                            {/*        <span className="custom-checkbox"></span> {title}*/}
                            {/*    </label>*/}
                            {/*))}*/}
                        </ul>
                    </motion.div>
                )}
            </div>
        </Stack>
    );
};

export default Collection;

import * as React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavTitle from "./NavTitle";
import { useCombinedContext } from "../../../../context/useCombinedContext";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        "&:hover": {
            boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
        },
        "& .airbnb-bar": {
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1,
        },
    },
    "& .MuiSlider-track": {
        height: 3,
    },
    "& .MuiSlider-rail": {
        color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
        opacity: theme.palette.mode === "dark" ? undefined : 1,
        height: 3,
    },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

export default function Size() {
    const [sizeRange, setSizeRange] = React.useState<number[]>([0, 1000]);
    const { updateTargetSearchObj } = useCombinedContext();

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSizeRange(newValue as number[]);
        updateTargetSearchObj("", "size", {
            min: sizeRange[0],
            max: sizeRange[1],
        });
    };

    return (
        <Box sx={{ width: 220 }} data-aos="zoom-in-down" data-aos-delay={600}>
            <Box />
            <NavTitle title="size" icons={false} />
            <AirbnbSlider
                slots={{ thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) =>
                    index === 0 ? "Minimum price" : "Maximum price"
                }
                defaultValue={sizeRange}
                onChange={handleSliderChange}
                min={0}
                max={1000}
            />
            <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
            >
                <Typography> {sizeRange[0]}Sqft</Typography>
                <Typography> {sizeRange[1]}Sqft</Typography>
            </Box>
        </Box>
    );
}

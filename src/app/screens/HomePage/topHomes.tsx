import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
// OTHERS
import {serverApi} from '../../../lib/config';
import {useHistory} from "react-router-dom";
// REDUX
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTopHomes} from "./selector";
import {Product} from "../../../types/product";


/** REDUX SELECTOR */
const topHomesRetriever = createSelector(
    retrieveTopHomes,
    (topHomes) => ({
        topHomes,
    })
);

export function TopHomes() {

    /** INITIALIZATION */
    const history = useHistory();
    const {topHomes} = useSelector(topHomesRetriever);

    const chosenTopHomesHandler = (id: string) => {
        history.push(`/company/${id}`);
    }

    return (
        <div className="top_property_frame" data-aos="zoom-in-right">
            <Container>
                <Stack className="top_property_main_box">
                    <Stack>

                        <Box className="top_home_definer">
                            <div data-aos="fade-up"
                                 data-aos-anchor-placement="top-center">

                                <p>Top Properties</p>
                                <Box className="top_home_definer">
                                    <h2>Explore Elevated Living.</h2>
                                </Box>
                            </div>
                        </Box>
                        <Stack className="all_top_property_img_box" flexDirection={"row"} sx={{flexWrap: "wrap"}}>
                            <Box className="top_home_main_box">

                                {topHomes.map((ele: Product) => {
                                    const image_path = `${serverApi}/${ele.product_images[0]}`;
                                    return (
                                        <Box className="top_property_box"
                                             key={ele._id}
                                             onClick={() => chosenTopHomesHandler(ele._id)}
                                             sx={{
                                                 cursor: "pointer",

                                             }}
                                        >
                                            <Stack flexDirection={"row"}>
                                                <Box className="property_img_box">
                                                    <img src={image_path}/>
                                                </Box>
                                            </Stack>
                                            <Box className="top_property_price">
                                                <span>{ele.product_price} $ / month </span>
                                                <text> {ele.product_name}</text>
                                            </Box>
                                            <Stack className={"top_property_location_box"} flexDirection={"row"}>
                                                <Box className="top_property_location">
                                                    <img src={"/icons/location.svg"}/>
                                                </Box>
                                                <Box>
                                                    <text> {ele.product_address}</text>
                                                </Box>
                                            </Stack>
                                            <Stack className={"top_property_icon_box"} flexDirection={"row"}>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/bed.svg"}/>
                                                    <text> {ele.product_value} room</text>
                                                </Box>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/bath.svg"}/>
                                                    <text> 2 bath</text>
                                                </Box>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/kv.svg"}/>
                                                    <text> {ele.product_size} kv</text>
                                                </Box>

                                            </Stack>
                                            <Stack className={"favorite_box"} flexDirection={"row"}>
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontSize: "16px",
                                                        lineHeight: "1.5",
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex",
                                                        marginRight: "20px"
                                                    }}
                                                >
                                                    {ele.product_views}
                                                    <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>
                                                {/*<Box sx={{width: 2, bgcolor: "divider"}}/>*/}
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex"
                                                    }}>
                                                    <div
                                                        // ref={(element) => (refs.current[ele._id] = element)}
                                                    >
                                                        {ele.product_likes}
                                                    </div>
                                                    <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    )
                                })}

                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
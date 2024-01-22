import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import {Box, Container, Stack} from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {CssVarsProvider} from "@mui/joy/styles";
import {CardOverflow} from "@mui/joy";
import {IconButton} from '@mui/joy';
import {Favorite} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/joy/Typography';
// OTHERS
import {serverApi} from '../../../lib/config';
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiSservices/memberApiService";
import {useRef} from "react";
import {useHistory} from "react-router-dom";
// REDUX
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTopHomes} from "./selector";
import {Member} from '../../../types/user';
import {verifiedMemberData} from "../../apiSservices/verify";
import {Product} from "../../../types/product";


/** REDUX SELECTOR */
const topHomesRetriever = createSelector(
    retrieveTopHomes,
    (topHomes) => ({
        topHomes,
    })
);

export function TopHomes() {

    return (
        <div className="top_property_frame">
            <Container>
                <Stack className="top_property_main_box">
                    <Stack>
                        <Box className="top_home_definer">
                            <p>Top Properties</p>
                            <Box className="top_home_definer">
                                <h2>Explore Elevated Living.</h2>
                            </Box>
                        </Box>
                        <Stack className="all_top_property_img_box" flexDirection={"row"}>
                            <Box className="top_home_main_box">

                                <Box className="top_property_box">
                                    <Stack flexDirection={"row"}>
                                        <Box className="property_img_box">
                                            <img src={"/home/immio.jpg"}/>
                                        </Box>
                                    </Stack>
                                    <Box className="top_property_price">
                                        <span>
                                            50$ /month
                                        </span>
                                        <text> zara building</text>
                                    </Box>
                                    <Stack className={"top_property_location_box"} flexDirection={"row"}>
                                        <Box className="top_property_location">
                                            <img src={"/icons/location.svg"}/>
                                        </Box>
                                        <Box>
                                            <text> tashkent city oybek metro</text>
                                        </Box>
                                    </Stack>
                                    <Stack className={"top_property_icon_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bed.svg"}/>
                                            <text> 3 beds</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bath.svg"}/>
                                            <text> 2 bath</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 57 kv</text>
                                        </Box>

                                    </Stack>
                                    <Stack className={"favorite_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 45</text>
                                            |
                                        </Box>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 65 kv</text>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box className="top_property_box">
                                    <Stack flexDirection={"row"}>
                                        <Box className="property_img_box">
                                            <img src={"/home/immio.jpg"}/>
                                        </Box>
                                    </Stack>
                                    <Box className="top_property_price">
                                        <span>
                                            50$ /month
                                        </span>
                                        <text> zara building</text>
                                    </Box>
                                    <Stack className={"top_property_location_box"} flexDirection={"row"}>
                                        <Box className="top_property_location">
                                            <img src={"/icons/location.svg"}/>
                                        </Box>
                                        <Box>
                                            <text> tashkent city oybek metro</text>
                                        </Box>
                                    </Stack>
                                    <Stack className={"top_property_icon_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bed.svg"}/>
                                            <text> 3 beds</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bath.svg"}/>
                                            <text> 2 bath</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 57 kv</text>
                                        </Box>

                                    </Stack>
                                    <Stack className={"favorite_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 45</text>
                                            |
                                        </Box>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 65 kv</text>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box className="top_property_box">
                                    <Stack flexDirection={"row"}>
                                        <Box className="property_img_box">
                                            <img src={"/home/immio.jpg"}/>
                                        </Box>
                                    </Stack>
                                    <Box className="top_property_price">
                                        <span>
                                            50$ /month
                                        </span>
                                        <text> zara building</text>
                                    </Box>
                                    <Stack className={"top_property_location_box"} flexDirection={"row"}>
                                        <Box className="top_property_location">
                                            <img src={"/icons/location.svg"}/>
                                        </Box>
                                        <Box>
                                            <text> tashkent city oybek metro</text>
                                        </Box>
                                    </Stack>
                                    <Stack className={"top_property_icon_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bed.svg"}/>
                                            <text> 3 beds</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/bath.svg"}/>
                                            <text> 2 bath</text>
                                        </Box>
                                        <Box className="top_property_each_icon">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 57 kv</text>
                                        </Box>

                                    </Stack>
                                    <Stack className={"favorite_box"} flexDirection={"row"}>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 45</text>
                                            |
                                        </Box>
                                        <Box className="top_property_each_icon_2">
                                            <img src={"icons/kv.svg"}/>
                                            <text> 65 kv</text>
                                        </Box>
                                    </Stack>
                                </Box>



                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
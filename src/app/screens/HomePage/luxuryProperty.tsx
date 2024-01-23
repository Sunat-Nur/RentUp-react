import React from "react";
import {Box, Container, Stack} from "@mui/material";

export function LuxuryProperty() {
    return (
        <div className="recommendation_frame">
            <Container>
                <Stack className="recommendation_frame_rent">
                    <Stack className="recommendation_right_frame">
                        <Stack className="recommendation_frame_tex">
                            <Stack className="recommendation_frame_propperties">
                                <Box className="recom_text_right">
                                    <p> Green places</p>
                                </Box>
                                <Box className="recom_text_span">
                                    <span>
                                        Green Living: Eco-Friendly Properties
                                    </span>
                                </Box>
                                <Box className="recom_text_p">
                                    <p>
                                        Ut felis sem, placerat vel sollicitudin ut, mollis non dui. Donec vehicula
                                        scelerisque mauris facilis
                                    </p>
                                </Box>
                            </Stack>

                            <Stack sx={{flexDirection: "row"}}>
                                <Stack sx={{flexDirection: "column"}}>
                                    <Box className="recom_first_box">
                                        <Box className="recom_first_box_img" style={{flexDirection: "row"}}>
                                            <img src="/home/eco2.webp"/>
                                            <Box sx={{flexDirection: "row"}}>
                                                <Box className="recom_first_box_name">
                                                    <p>
                                                        Prestige Park Place
                                                    </p>
                                                </Box>
                                                <Box className="recom_first_box_name">
                                                    <img src={"/icons/location.svg"}/>1000 W Redondo Beach Blvd,
                                                    Gardena, CA
                                                </Box>
                                                <Box className="recom_icons_box">
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bed.svg"}/>
                                                        <text>4 beds</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bath.svg"}/>
                                                        <text>2 bath</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/kv.svg"}/>
                                                        <text>56 kv</text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className="recom_first_box">
                                        <Box className="recom_first_box_img" style={{flexDirection: "row"}}>
                                            <img src="/home/immio.jpg"/>
                                            <Box sx={{flexDirection: "row"}}>
                                                <Box className="recom_first_box_name">
                                                    <p>
                                                        Prestige Park Place
                                                    </p>
                                                </Box>
                                                <Box className="recom_first_box_name">
                                                    <img src={"/icons/location.svg"}/>1000 W Redondo Beach Blvd,
                                                    Gardena, CA
                                                </Box>
                                                <Box className="recom_icons_box">
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bed.svg"}/>
                                                        <text>4 beds</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bath.svg"}/>
                                                        <text>2 bath</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/kv.svg"}/>
                                                        <text>56 kv</text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className="recom_first_box">
                                        <Box className="recom_first_box_img" style={{flexDirection: "row"}}>
                                            <img src="/home/img.png"/>
                                            <Box sx={{flexDirection: "row"}}>
                                                <Box className="recom_first_box_name">
                                                    <p>
                                                        Prestige Park Place
                                                    </p>
                                                </Box>
                                                <Box className="recom_first_box_name">
                                                    <img src={"/icons/location.svg"}/>1000 W Redondo Beach Blvd,
                                                    Gardena, CA
                                                </Box>
                                                <Box className="recom_icons_box">
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bed.svg"}/>
                                                        <text>4 beds</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/bath.svg"}/>
                                                        <text>2 bath</text>
                                                    </Box>
                                                    <Box className="bed_cont">
                                                        <img src={"/icons/kv.svg"}/>
                                                        <text>5600 m</text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>

                                <Box className="recom_background_left_img">
                                    <img src={"/home/immio.jpg"}/>

                                </Box>
                                <Box></Box>
                            </Stack>
                        </Stack>
                        <Stack className="recommendation_frame_map">
                            <Box className="recommendation_frame_map_box">

                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}
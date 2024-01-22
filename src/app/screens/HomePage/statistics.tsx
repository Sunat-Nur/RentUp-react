import React from "react";
import {Box, Container, Stack} from "@mui/material";

export function Statistics() {
    return (
        <div className="statistics_container">
            <Container>
                {/*<Stack className="statistics_frame">*/}
                    <Stack className="definer_statistics">
                        <Box className="property_tex">
                            <Box className="property_difiner_h1">
                                Curated Collection
                            </Box>
                            <Box className="property_difiner_p">
                                Spaces to Grow and Thrive.
                            </Box>
                        </Box>
                        <Stack className="box_property" sx={{flexDirection: "row", display: "flex"}}>
                            <Stack className="property_types">
                                <Box className="property_box">
                                    <Box className="property_img">
                                        <img src="/icons/h1.png"/>
                                    </Box>
                                    <Box className="property_name">
                                        <p>House</p>
                                    </Box>
                                    <Box className="property_cnt">
                                        <span>48 property</span>
                                    </Box>
                                </Box>
                            </Stack>
                            <Stack className="property_types">
                                <Stack className="property_box">
                                    <Box className="property_img">
                                        <img src="/icons/h2.png"/>
                                    </Box>
                                    <Box className="property_name">
                                        <p>Villa</p>
                                    </Box>
                                    <Box className="property_cnt">
                                        <span>25 property</span>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack className="property_types">
                                <Stack className="property_box">
                                    <Box className="property_img">
                                        <img src="/icons/h3.png"/>
                                    </Box>
                                    <Box className="property_name">
                                        <p>Office</p>
                                    </Box>
                                    <Box className="property_cnt">
                                        <span>19 property</span>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack className="property_types">
                                <Stack className="property_box">
                                    <Box className="property_img">
                                        <img src="/icons/h4.png"/>
                                    </Box>
                                    <Box className="property_name">
                                        <p>Studio</p>
                                    </Box>
                                    <Box className="property_cnt">
                                        <span>32 property</span>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack className="property_types">
                                <Stack className="property_box">
                                    <Box className="property_img">
                                        <img src="/icons/h6.png"/>
                                    </Box>
                                    <Box className="property_name">
                                        <p>Farm</p>
                                    </Box>
                                    <Box className="property_cnt">
                                        <span>14 property</span>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                {/*</Stack>*/}
            </Container>
        </div>
    );
}
import React from "react";
import {Container, Stack, Box, Avatar} from "@mui/material";
import Typography from "@mui/joy/Typography";
import {Favorite, Visibility} from "@mui/icons-material";

export function CompanyPage() {
    return (
        <div className="property_frame">
            <Container>
                <Stack className="property_fix_main_frame" sx={{flexDirection: "row"}}>
                    {/*<Stack className="property_left_filter" sx={{ flexDirection: "column"}}>*/}

                    {/*    <Box className="property_filter_main">*/}
                    {/*        <Box className="property_type_box">*/}
                    {/*            <img src={"/icons/bed.svg"}/>*/}
                    {/*            <a> villla</a>*/}
                    {/*        </Box>*/}
                    {/*        <Box className="property_type_box">*/}
                    {/*            <img src={"/icons/bed.svg"}/>*/}
                    {/*            <a> Apartment</a>*/}
                    {/*        </Box>*/}
                    {/*        <Box className="property_type_box">*/}
                    {/*            <img src={"/icons/bed.svg"}/>*/}
                    {/*            <a> Office</a>*/}
                    {/*        </Box>*/}
                    {/*        <Box className="property_type_box">*/}
                    {/*            <img src={"/icons/bed.svg"}/>*/}
                    {/*            <a> Studio</a>*/}
                    {/*        </Box>*/}
                    {/*        <Box className="property_type_box">*/}
                    {/*            <img src={"/icons/bed.svg"}/>*/}
                    {/*            <a> House</a>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}


                    {/*</Stack>*/}

                    <Stack className="property_main_frame_middle">


                        <Box className="property_filter_main_middle"
                             sx={{flexDirection: "row"}}
                        >
                            <Box className="property_type_box_middle">
                                <img src={"/icons/bed.svg"}/>
                                <a> Apartment</a>
                            </Box>
                            <Box className="property_type_box_middle">
                                <img src={"/icons/bed.svg"}/>
                                <a> villla</a>
                            </Box>
                            <Box className="property_type_box_middle">
                                <img src={"/icons/bed.svg"}/>
                                <a> Apartment</a>
                            </Box>
                            <Box className="property_type_box_middle">
                                <img src={"/icons/bed.svg"}/>
                                <a> Apartment</a>
                            </Box>
                        </Box>


                        <Stack className="all_top_property_img_box" flexDirection={"row"}
                        sx={{ marginRight: "50px"}}>
                            <Stack className="property_left_filter" sx={{ flexDirection: "column"}}>

                                <Box className="property_filter_main">
                                    <Box className="property_type_box">
                                        <img src={"/icons/bed.svg"}/>
                                        <a> villla</a>
                                    </Box>
                                    <Box className="property_type_box">
                                        <img src={"/icons/bed.svg"}/>
                                        <a> Apartment</a>
                                    </Box>
                                    <Box className="property_type_box">
                                        <img src={"/icons/bed.svg"}/>
                                        <a> Office</a>
                                    </Box>
                                    <Box className="property_type_box">
                                        <img src={"/icons/bed.svg"}/>
                                        <a> Studio</a>
                                    </Box>
                                    <Box className="property_type_box">
                                        <img src={"/icons/bed.svg"}/>
                                        <a> House</a>
                                    </Box>
                                </Box>


                            </Stack>
                            <Box className="top_home_main_box">

                                <Box className="top_property_box" >
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
                                            {/*{ele.mb_views}*/} 45
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
                                                {/*{ele.mb_likes}*/} 20
                                            </div>
                                            <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
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
                                    <Stack className="favorite_box" flexDirection={"row"}>

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
                                            {/*{ele.mb_views}*/} 45
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
                                                {/*{ele.mb_likes}*/} 20
                                            </div>
                                            <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
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
                                    <Stack className="favorite_box" flexDirection={"row"}>

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
                                            {/*{ele.mb_views}*/} 45
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
                                                {/*{ele.mb_likes}*/} 20
                                            </div>
                                            <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                        <Stack className="all_property_bottom_box" sx={{marginRight: "50px"}}>
                            <Stack className="agency_frame_box">
                                <Box className="agency_define">
                                    <Box className="property_partner" sx={{ marginLeft: "100px", marginTop: "140px"}}>

                                        <h1>
                                             Our Expert Agents
                                        </h1>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box className="best_agency_main_box_scroll" sx={{flexDirection: "column"}}>
                                        <Box className="agencybox_1">
                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/profile.4.png"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@sunat_nur</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/women1.jpeg"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@anjelina</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/women2.jpeg"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@shaxzoda</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/women3.jpeg"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@lili</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/profile.4.png"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@sunat_nur</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Box className="best_agency_main_box">
                                                    <img src="/home/profile.4.png"/>
                                                </Box>
                                                <Box className="best_agency_name">
                                                    <p>@sunat_nur</p>
                                                    <span> Preshampton Agent </span>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>

                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}
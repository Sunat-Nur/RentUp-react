import React from "react";
import {Box, Button, Container, Stack} from "@mui/material";

export function TopHomes() {
    return (
        <div className="top_property">
            <Container className="top_prpperty_frame">
                <Stack>
                    <Box className="luxury_villias">
                        <p>Luxury Villas</p>
                    </Box>
                    <Box className="Top_property_ele">
                        <h1>Best Luxury Property.</h1>
                    </Box>
                    <Box className="top_property_button_box">
                        <Box className="top_property_type_box">
                            <Button className="all_property_button"
                                    style={{
                                        color: "#1B6F58",
                                        fontWeight: 700,
                                    }}
                            >
                                All Property
                            </Button>
                        </Box>
                        <Box className="top_property_type_box">
                            <Button className="all_property_button"
                                    style={{
                                        color: "#1B6F58",
                                        fontWeight: 700,
                                    }}
                            >
                                For Sale
                            </Button>
                        </Box>
                        <Box className="top_property_type_box">
                            <Button className="all_property_button"
                                    style={{
                                        color: "#1B6F58",
                                        fontWeight: 700,
                                    }}
                            >
                                For Rent
                            </Button>
                        </Box>
                    </Box>
                </Stack>

                <Stack className="top_property_card">
                    <Stack className="top_property_single_card">
                        <Box className="top_property_img_section">
                            <Box className="top_property_img">
                                <img src={"/home/2.webp"}/>
                            </Box>
                            <Box sx={{ flexDirection: "row"}}>
                                <Box className="price_cunt" style={{ flexDirection: "row"}}>
                                    <span> 45 $ </span>
                                    <img src={"icons/kv.svg"}/>
                                </Box>
                                <Box className="top_property_location_icon">
                                    <img src={"/icons/location.svg"} />
                                    Zara building tashkent city

                                </Box>
                            </Box>
                        </Box>

                        <Box className="price_cunt">
                        </Box>


                    </Stack>

                </Stack>

                <Stack>

                </Stack>


            </Container>
        </div>
    )
}
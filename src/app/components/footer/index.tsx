import {Box, Container, Stack} from "@mui/material";
import React from "react";

export function Footer() {
    return (
        <div className="footer_config">
            <Container>
                <Stack className="main_footer_container">
                    <Stack flexDirection={"row"} style={{height: "242px"}}>
                        <Stack className="info" flexDirection={"column"}>
                            <Box>
                                <img src={"/icons/logo-light.png"}/>
                            </Box>
                            <Box className="main_text">
                                when an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.
                                It has survived not only five centuries, but also the leap
                            </Box>
                            <Stack className="contact_links">
                                <Box>
                                    <img src={"/icons/facebook.svg"}/>
                                </Box>
                                <Box>
                                    <img src={"/icons/twitter.svg"}/>
                                </Box>
                                <Box>
                                    <img src={"/icons/instagram.svg"}/>
                                </Box>
                                <Box>
                                    <img src={"/icons/youtube.svg"}/>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack className="parts">
                            <Box className="part_subject">pages</Box>
                            <Box className="divider"></Box>
                            <Box className="targets">
                                Main Page Agency Community Help
                            </Box>
                        </Stack>
                        <Stack className="find_us">
                            <Box className="find">Bizni top</Box>
                            <Box className="divider"></Box>
                            <Stack className="details" sx={{mt: "19px"}}>
                                <Box className="details_first">L.</Box>
                                <Box className="details_second">Uzbekistan</Box>
                            </Stack>
                            <Stack className="details" sx={{mt: "42px"}}>
                                <Box className="details_first">P.</Box>
                                <Box className="details_second">+998 - 99 266 25 62</Box>
                            </Stack>
                            <Stack className="details" sx={{mt: "9px"}}>
                                <Box className="details_first">E.</Box>
                                <Box className="details_second">RentUp@buildyourdream.com</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box className="liner"></Box>
                    <Box className="copyrights">
                        Copyright Papays 2022, All right reserved.
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}
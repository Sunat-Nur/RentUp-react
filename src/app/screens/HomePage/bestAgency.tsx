import React from "react";
import {Container, Stack, Box} from "@mui/material";

export function BestAgency() {
    return (
        <div className="best_agency_frame">
            <Container>
                <Stack className="agency_frame_box">
                    <Box className="agency_define">
                        <Box className="property_partner">
                            <p>
                                Property Partners
                            </p>
                            <h1>
                                Meet Our Expert Agents.
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
                                        <img src="/home/women.jpeg"/>
                                    </Box>
                                    <Box className="best_agency_name">
                                        <p>@ruxshona</p>
                                        <span> Preshampton Agent </span>
                                    </Box>
                                </Box>









                            </Box>
                        </Box>

                    </Box>
                </Stack>

            </Container>
        </div>
    )
}
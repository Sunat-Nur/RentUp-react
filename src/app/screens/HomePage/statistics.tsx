import React from "react";
import {Box, Container, Stack} from "@mui/material";

export function Statistics() {
    return (
        <div className="statistics_container">
            <Stack className="statistics_frame">
                <Stack className="definer_statistics">
                    <Box className="property_tex">
                        <Box className="property_difiner_h1">
                            Featured Property Types
                        </Box>
                        <Box className="property_difiner_p">

                        </Box>
                    </Box>
                    <Box className="find_property">

                    </Box>
                    <Stack className="property_types">
                        <Stack className="property_box">
                            <Box className="property_img">

                            </Box>
                            <Box className="property_name">

                            </Box>
                            <Box className="property_cnt">

                            </Box>
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}
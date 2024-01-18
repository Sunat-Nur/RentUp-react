import React from "react";
import {Box, Button, Container, Stack} from "@mui/material";

export function Login() {
    return (
        <div className="search_home_frame">
            <Container>
                <Stack className="sing_up_frame">
                    <Box className="signup_text">
                        <Box className="define_company">
                            Find your dream with us
                        </Box>
                        <Box className="define_service">
                            Find new & featured property located in your local city.
                        </Box>
                    </Box>
                    <Box className="signup_botton">
                        <Button
                            variant="contained"
                            style={{
                                width: "210px",
                                height: "60px",
                                background: "#27ae60",
                                color: "#ffffff",
                                borderRadius: "50px"
                            }}
                        >
                            Sing up
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}

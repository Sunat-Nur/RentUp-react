import React from "react";
import {Box, Button, Container, IconButton, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Badge from "@mui/material/Badge";


export function NavbarHome(props: any) {
    return (
        <div className="format home_navbar">
            <Container>
                <Stack
                    flexDirection={"row"}
                    className="navbar_config"
                    justifyContent={"space-between"}
                >
                    <Box className="header_logo">
                        <img src={"/icons/logo.png"}/>
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent="space-evenly"
                        alignItems={"center"}
                        className="navbar_links"
                    >
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/" activeClassName="uderline" >
                                Home
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/company" activeClassName="uderline">
                                Property
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/orders" activeClassName="uderline">
                                Search
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="uderline">
                                Community
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="uderline">
                                Help
                            </NavLink>
                        </Box>


                    </Stack>

                    <Box className="hover-line">
                        <IconButton
                            aria-label="cart"
                            id="basic-button"
                            aria-controls={undefined}
                            aria-haspopup="true"
                            aria-expanded={undefined}

                        >
                            <Badge badgeContent={3} color="secondary">
                                <img src={"/icons/1favorite.svg"}/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="cart"
                            id="basic-button"
                            aria-controls={undefined}
                            aria-haspopup="true"
                            aria-expanded={undefined}
                        >
                            <Badge badgeContent={3} color="secondary">
                                <img src={"/icons/message.png"}/>
                            </Badge>
                        </IconButton>
                    </Box>
                        <Box>
                            <Button className="navbar_button"
                                style={{color: "#FFFFFF", background: "#27ae60"}}
                            >
                                Login
                            </Button>
                        </Box>
                </Stack>
                {/*<Stack className="head_information">*/}
                {/*    <Stack*/}
                {/*        justifyContent={"column"}*/}
                {/*        style={{marginTop: "86px", marginLeft: "24px"}}*/}
                {/*    >*/}
                {/*        <Box>*/}
                {/*            <img src="/icons/Welcome%20to%20Papay.svg"/>*/}
                {/*        </Box>*/}
                {/*        <Box className="define_company">*/}
                {/*            The Authentic Agency & and User*/}
                {/*        </Box>*/}
                {/*        <Box className="timeline_service">*/}
                {/*            24 soat xizmatingdamiz.*/}
                {/*        </Box>*/}
                {/*        <Box sx={{mt: "90px"}}>*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                style={{*/}
                {/*                    width: "210px",*/}
                {/*                    height: "60px",*/}
                {/*                    background: "#1976d2",*/}
                {/*                    color: "#ffffff",*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                RO'YHATDAN O'TISH*/}
                {/*            </Button>*/}
                {/*        </Box>*/}
                {/*    </Stack>*/}
                {/*    <Box className="big_img"></Box>*/}
                {/*</Stack>*/}

            </Container>
        </div>
    );
}
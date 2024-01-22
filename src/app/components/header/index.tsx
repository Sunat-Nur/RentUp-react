import React from 'react';
import {Box, Button, Container,  Stack, Menu,MenuItem, ListItemIcon} from "@mui/material";
import { Logout } from '@mui/icons-material';
import {NavLink} from "react-router-dom";
import Basket from "./basket";
import {verifiedMemberData} from "../../apiSservices/verify";

export function NavbarHome(props: any) {


    return (
        <div className="format home_navbar">
            <Container>
                <Stack
                    flexDirection={"row"}
                    className="navbar_config"
                    justifyContent={"space-between"}
                >
                    <Box>
                        <img src='/icons/Papay..svg' alt=''/>
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent="space-evenly"
                        alignItems={"center"}
                        className="navbar_links"
                    >
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/" activeClassName="underline">
                                Home
                            </NavLink>
                        </Box>

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/company" activeClassName="underline">
                                Property
                            </NavLink>
                        </Box>
                        {/*{verifiedMemberData ? (*/}
                        {/*    <Box className="hover-line" onClick={props.setPath}>*/}
                        {/*        <NavLink to="/orders" activeClassName="underline">*/}
                        {/*            Buyurtma*/}
                        {/*        </NavLink>*/}
                        {/*    </Box>*/}
                        {/*) : null}*/}

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Community
                            </NavLink>
                        </Box>
                        {verifiedMemberData ? (
                            <Box className="hover-line" onClick={props.setPath}>
                                <NavLink to="/member-page" activeClassName="underline">
                                    My page
                                </NavLink>
                            </Box>
                        ) : null}

                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Help
                            </NavLink>
                        </Box>
                        <Basket
                            cartItems={props.cartItems}
                            onAdd={props.onAdd}
                            onRemove={props.onRemove}
                            onDelete={props.onDelete}
                            onDeleteAll={props.onDeleteAll}
                            setOrderRebuild={props.setOrderRebuild}
                        />
                        {!verifiedMemberData ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    style={{color: "#FFFFFF", background: "#1976d2"}}
                                    onClick={props.handleLoginOpen}
                                >
                                    KIRISH
                                </Button>
                            </Box>
                        ) : (
                            <img
                                style={{width: "48px", height: "48px", borderRadius: "24px"}}
                                src={verifiedMemberData.mb_image}
                                onClick={props.handleLogOutClick}
                            />
                        )}
                        <Menu
                            anchorEl={props.anchorEl}
                            open={props.open}
                            onClose={props.handleCloseLogOut}
                            onClick={props.handleCloseLogOut}
                            slotProps={{
                                // Use slotProps instead of PaperProps
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0
                                        }
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                            <MenuItem onClick={props.handleLogOutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: "blue" }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
                <Stack className="head_information" justifyContent={"row"}>
                    <Stack
                        justifyContent={'column'}
                        style={{marginTop: "86px", marginLeft: "24px"}}>
                        <Box>
                            <img src="/icons/welcome.svg" alt=''/>
                        </Box>
                        <Box className="define_restaurant">
                            The Authentic Restaurant & Cafe
                        </Box>
                        <Box className="timeline_service">
                            24 soat xizmatinggizdamiz.
                        </Box>
                        <Box sx={{mt: "90px"}}>
                            {!verifiedMemberData ? (
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "210px",
                                        height: "60px",
                                        background: "#1976d2",
                                        color: "#FFFFF",
                                    }}
                                    onClick={props.handleSignUpOpen}
                                >
                                    RO'YXATDAN O'TISH
                                </Button>
                            ) : null}

                        </Box>
                    </Stack>
                    <Stack flexDirection={'column'}>
                        <Box className="big_img"></Box>

                    </Stack>

                </Stack>
            </Container>
        </div>
    );
}
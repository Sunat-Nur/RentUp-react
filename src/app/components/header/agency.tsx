import React from "react";
import {Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Badge from "@mui/material/Badge";
import {Logout} from "@mui/icons-material";
import Basket from "./basket";
import {verifiedMemberData} from "../../apiSservices/verify";

export function NavbarAgency(props: any) {
    return (
        <div className="format_agency home_navbar" data-aos="zoom-in">
            <Container>
                <Stack
                    flexDirection={"row"}
                    className="navbar_config"
                    justifyContent={"space-between"}
                >
                    <Box  className={"header_logo"}>
                        <img src={"/icons/logo.png"} alt=''/>
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent="space-evenly"
                        alignItems={"center"}
                        className="navbar_links"
                    >


                        <Box className="hover_line" onClick={props.setPath}>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </Box>

                        <Box className="hover_line" onClick={props.setPath}>
                            <NavLink to="/company" activeClassName="underline">
                                Property
                            </NavLink>
                        </Box>
                        <Box className="hover_line" onClick={props.setPath}>
                            <NavLink to="/agency" activeClassName="underline">
                                Agency
                            </NavLink>
                        </Box>

                        <Box className="hover_line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Community
                            </NavLink>
                        </Box>

                        {verifiedMemberData ? (
                            <Box className="hover_line" onClick={props.setPath}>
                                <NavLink to="/member-page" activeClassName="underline">
                                    My Page
                                </NavLink>
                            </Box>
                        ) : null}

                        <Box className="hover_line" onClick={props.setPath}
                             sx={{marginRight: "80px"}}
                        >
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
                                src={verifiedMemberData.mb_image} alt=''
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
                            transformOrigin={{horizontal: "right", vertical: "top"}}
                            anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
                            <MenuItem onClick={props.handleLogOutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{color: "blue"}}/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
                {/*main stack qismi*/}
            </Container>
        </div>
    );
}

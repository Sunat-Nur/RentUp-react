import {Box, Button, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import {serverApi} from "../../../lib/config";
import {CartItem} from "../../../types/others";
import {useHistory} from "react-router-dom";

export default function Basket(props: any) {
    /** INITIALIZATIONS **/
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const {cartItems,  onDelete, onDeleteAll, setOrderRebuild} = props;


    /** HANDLERS **/
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const chosenProductHandler = (id: string) => {
        history.push(`/company/products/${id}`);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Box className={"hover-line"}>
            <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <img src={"/icons/favorite2.svg"}/>
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
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
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <Stack className={"basket_frame"}>
                    <Box className={"all_check_box"}>
                        {!cartItems ? (
                            <div>Cart is empty!</div>
                        ) : (
                            <div>My favorites</div>
                        )}
                    </Box>
                    <Box className={"orders_main_wrapper"}>
                        <Box className={"orders_wrapper"}>
                            {cartItems?.map((item: CartItem) => {
                                const image_path = `${serverApi}/${item.image}`;
                                return (
                                    <Box key={item?._id} className={"basket_info_box"}>
                                        <div className={"cancel_btn"}>
                                            <CancelIcon
                                                color={"primary"}
                                                onClick={(e) => onDelete(item)}
                                            />
                                        </div>
                                        <Box onClick={() => chosenProductHandler(item._id)}>
                                        <img src={image_path} className={"product_img"}/>
                                        </Box>
                                        <span className={"product_name"}>{item.name}</span>
                                        <p className={"product_price"}>
                                            ${item.price}
                                        </p>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Stack>
            </Menu>
        </Box>
    );
}
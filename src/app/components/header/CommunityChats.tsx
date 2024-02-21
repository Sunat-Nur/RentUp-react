//@ts-nocheck
import {Avatar, Box, Stack} from "@mui/material";
import React, {ChangeEvent, FC, ReactElement, useCallback, useContext, useEffect, useRef, useState,} from "react";
import {SocketContext} from "../../../context/socket";
import {ChatGreetMsg, ChatInfoUsers, ChatMessage, NewMessageProps} from "../../../types/others";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {verifiedMemberData} from "../../apiSservices/verify";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import {RippleBadge} from "../../MaterialTheme/styled";
import SendIcon from "@mui/icons-material/Send";
import "./chatting.css";

const NewMessage: FC<NewMessageProps> = ({data, key}) => {
    if (!data) {
        return null;
    }

    const {mb_id, msg, mb_nick, mb_image} = data;
    if (mb_id === verifiedMemberData?._id) {
        return (
            <Box className="chat_main_right">
                <div className="msg_right">{msg}</div>
            </Box>
        );
    } else {
        return (
            <Box className="chat_main_left">
                <Avatar alt={mb_nick} src={mb_image}/>
                <div className="msg_left">{msg}</div>
            </Box>
        );
    }
};

const CommunityChats = () => {
    const msgInputRef: any = useRef(null);
    const [messagesList, setMessagesList] = useState<Array<ReactElement<any>>>([]);
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    // const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

    console.log("socket", socket);
    useEffect(() => {
        socket.connect();
        socket.on("connect", function () {
            console.log("Client connected");
        });

        socket.on("newMsg", (new_msg: ChatMessage) => {
            messagesList.push(
                //@ts-ignore
                <NewMessage data={new_msg} key={messagesList.length}/>
            );
            setMessagesList([...messagesList]);
        });

        socket.on("greetMsg", (new_msg: ChatGreetMsg) => {
            messagesList.push(
                //@ts-ignore
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "large",
                        fontFamily: "serif",
                    }}
                >
                    {new_msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
                </p>
            );
            setMessagesList([...messagesList]);
        });

        socket.on("infoUsers", (msg: ChatInfoUsers) => {
            console.log("Client: info users");
            setOnlineUsers(msg.total);
        });
        return () => {
            socket.disconnect();
        };
    }, [socket]);


    const getInputMessageHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            setMessage(text);
        },
        [message]
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const getKeyHandler = async (e: any) => {
        try {
            if (e.key === "Enter") {
                assert.ok(message, Definer.input_err2);
                onSendBtnHandler();
            }
        } catch (err: any) {
            console.log(`getKeyHandler, ERROR: ${err}`);
            await sweetErrorHandling(err).then();
        }
    };

    const onSendBtnHandler = async () => {
        try {
            if (!verifiedMemberData) {
                msgInputRef.current.value = "";
                sweetFailureProvider("Please login first", true);
                return false;
            } else {
                msgInputRef.current.value = "";
                assert.ok(message, Definer.input_err2);

                const mb_image_url = verifiedMemberData?.mb_image;
                socket.emit("createMsg", {
                    msg: message,
                    mb_id: verifiedMemberData?._id,
                    mb_nick: verifiedMemberData?.mb_nick,
                    mb_image: mb_image_url,
                });
                setMessage("");
            }
        } catch (err: any) {
            console.log(`onSendBtnHandler, ERROR: ${err}`);
            await sweetErrorHandling(err).then();
        }
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
                <Badge className={"message_icons"}>
                    <img src={"/icons/message.png"}/>
                </Badge>
            </IconButton>
            <Menu
                // anchorEl={anchorEl}
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

                    <Stack className={`chat_frame ${open ? "open" : ""}`}>
                        <Box className="chat_top">
                            Live Chatting
                            <RippleBadge style={{margin: "-30px 0 0 20px"}} badgeContent={onlineUsers} />
                        </Box>
                        <Stack className="chat_content">
                            <span className="chiziq"></span>
                            <Box className="chat_main">
                                {messagesList}
                            </Box>
                        </Stack>
                        <Box className="chat_bott">
                            <input
                                ref={msgInputRef}
                                type="text"
                                name="message"
                                className="msg_input"
                                placeholder="Type message"
                                onChange={getInputMessageHandler}
                                onKeyDown={getKeyHandler}
                                // onClose={handleClose}
                            />
                            <button className="send_msg_btn"  onClick={onSendBtnHandler}>
                                <SendIcon/>
                            </button>
                        </Box>
                    </Stack>
                </Stack>
            </Menu>
        </Box>
    );
};

export default CommunityChats;
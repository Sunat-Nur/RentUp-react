//@ts-nocheck
import {Avatar, Box, Button, Stack} from "@mui/material";
import React, {ChangeEvent, FC, ReactElement, useCallback, useContext, useEffect, useRef, useState,} from "react";
import SendIcon from "@mui/icons-material/Send";
import {SocketContext} from "../../context/socket";
import {ChatGreetMsg, ChatInfoUsers, ChatMessage, NewMessageProps} from "../../types/others";
import {sweetErrorHandling, sweetFailureProvider} from "../../lib/sweetAlert";
import assert from "assert";
import {Definer} from "../../lib/Definer";
import {verifyMemberData} from "../../app/ApiServices/verify";
import {RippleBadge} from "../../app/MaterialTheme/styled";
import {CloseRounded, MessageRounded} from "@mui/icons-material";
import "../../pages/CommunityPage/community.css";

const NewMessage: FC<NewMessageProps> = ({data, key}) => {
    if (!data) {
        return null;
    }

    const {mb_id, msg, mb_nick, mb_image} = data;
    if (mb_id === verifyMemberData?._id) {
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
    const [messagesList, setMessagesList] = useState<Array<ReactElement<any>>>(
        []
    );
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState(false);

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
                    {new_msg.text}, dear {verifyMemberData?.mb_nick ?? "guest"}
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

    //Handler//

    const getInputMessageHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            setMessage(text);
        },
        [message]
    );

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
            if (!verifyMemberData) {
                msgInputRef.current.value = "";
                sweetFailureProvider("Please login first", true);
                return false;
            } else {
                msgInputRef.current.value = "";
                assert.ok(message, Definer.input_err2);

                const mb_image_url = verifyMemberData?.mb_image;
                socket.emit("createMsg", {
                    msg: message,
                    mb_id: verifyMemberData?._id,
                    mb_nick: verifyMemberData?.mb_nick,
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
        <div>
            <Button
                className={
                    open
                        ? "bg-red-500 chat_btn "
                        : "chat_btn bg-primary hover:bg-orange-500"
                }
                onClick={() => setOpen(!open)}
            >
                {open ? <CloseRounded/> : <MessageRounded/>}
            </Button>

            <Stack className={`chat_frame ${open ? "open" : ""}`}>
                <Box className="chat_top">
                    Live Chatting
                    <RippleBadge
                        style={{margin: "-30px 0 0 20px"}}
                        badgeContent={onlineUsers}
                    />
                </Box>
                <Stack className="chat_content">
                    <span className="chiziq"></span>
                    <Box className="chat_main">
                        <Box className="chat_main_left">
                            <div className="msg_left">Enjoy the live chatting !</div>
                        </Box>
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
                    />
                    <button className="send_msg_btn" onClick={onSendBtnHandler}>
                        <SendIcon/>
                    </button>
                </Box>
            </Stack>
        </div>
    );
};

export default CommunityChats;

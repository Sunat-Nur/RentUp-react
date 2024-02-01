import React, {ChangeEvent, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Avatar, Box, Stack} from "@mui/material";
import {Send} from "@mui/icons-material";
import "../../../css/community.css";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";
import {SocketContext} from "../../context/socket";
import {verifiedMemberData} from "../../apiSservices/verify";
import {ChatGreetMsg, ChatMessage} from "../../../types/others";
import {RippleBadge} from "../../MaterialTheme/styled";
import {connect} from "socket.io-client";

const NewMessage = (data: any) => {
    console.log(data.new_message)
    if (data.new_message.mb_id === verifiedMemberData?._id) {
        return (
            <Box flexDirection={"row"} style={{display: "flex"}} sx={{m: "10px 0px"}} justifyContent={"flex-end"}>
                <div className="msg_left">{data.new_message.msg}</div>
            </Box>
        );
    } else {
        return (
            <Box flexDirection={"row"} style={{display: "flex"}} sx={{m: "10px 0px"}} justifyContent={"flex-end"}>
                <Avatar alt={data.new_message.mb_nick} src={data.new_message.mb_image}/>
                <div className="msg_left">{data.new_message.msg}</div>
            </Box>
        )
    }
};

export function CommunityChats() {
    /** Initializations **/
    const msgInputRef: any = useRef(null);
    const [messagesList, setMessagesList] = useState([]);
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    // useEffect(() => {
    //     socket.connect();
    //     console.log("connect:::", connect);
    //     console.log("Printed");
    //     socket?.on("connect", function () {
    //         console.log("CLIENT: connected");
    //     });
    //
    //     socket?.on("newMsg", (new_message: ChatMessage) => {
    //         console.log("Client: new message");
    //         messagesList.push(
    //             //@ts-ignore
    //             <NewMessage new_message={new_message} key={messagesList.length}/>,
    //         );
    //         setMessagesList([...messagesList]);
    //     });
    //     socket?.on("greetMsg", (msg: ChatGreetMsg) => {
    //         console.log("Client: greet message");
    //         messagesList.push(
    //             //@ts-ignore
    //             <p style={{textAlign: "center", fontSize: "large", fontFamily: "serif"}}>
    //                 {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
    //             </p>
    //         );
    //         setMessagesList([...messagesList]);
    //     });
    //
    //     socket?.on("infoMsg", (msg: any) => {
    //         console.log("CLIENT: info message");
    //         setOnlineUsers(msg.total);
    //     });
    //
    //
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);

    /** Handler **/
    const getInputMessageHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            setMessage(text);
        },
        [message]
    );

    const getKeyHandler = (e: any) => {
        try {
            if (e.key === "Enter") {
                assert.ok(message, Definer.input_err3);
                onSendBtnHandler();
            }
        } catch (err: any) {
            console.log(`getKeyHandler, ERROR: ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    const onSendBtnHandler = () => {
        try {
            if (!verifiedMemberData) {
                msgInputRef.current.value = "";
                sweetFailureProvider("Please login first", true);
                return;
            }

            msgInputRef.current.value = "";
            assert.ok(message, Definer.input_err3);

            const mb_image_url = verifiedMemberData?.mb_image ?? "/auth/odamcha.svg";
            socket.emit("createMsg", {
                msg: message,
                mb_id: verifiedMemberData?._id,
                mb_nick: verifiedMemberData?.mb_nick,
                mb_image: mb_image_url,
            });
            setMessage("");
        } catch (err: any) {
            console.log(`onSendBtnHandler, ERROR: ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Stack className="chat_frame">
            <Box className="chat_top">
                live chatting{" "}
                <RippleBadge
                    style={{margin: "-30px 0 0 20px"}}
                    badgeContent={onlineUsers}
                />
            </Box>
            <Box className="chat_content">
                <Stack className="chat_main">
                    <Box flexDirection={"row"} style={{display: "flex"}} sx={{m: "10px 0px"}}>
                        <div className="msg_left">Bu yerda jonli muloqot</div>
                    </Box>
                    {messagesList}
                </Stack>
            </Box>
            <Box className="chat_bott">
                <input
                    ref={msgInputRef}
                    type="text"
                    name="message"
                    className="msg_input"
                    placeholder="Xabar jo'natish"
                    onKeyDown={getKeyHandler}
                    onChange={getInputMessageHandler}
                />
                <button className="send_msg_btn" onClick={onSendBtnHandler}>
                    <Send style={{color: "red"}}/>
                </button>
            </Box>
        </Stack>
    );
}
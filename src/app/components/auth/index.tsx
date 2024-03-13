import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Fab, Stack, TextField} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import {sweetErrorHandling} from "../../../lib/sweetAlert";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import MemberApiService from "../../apiSservices/memberApiService";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
}));

const ModalImg = styled.img`
    width: 62%;
    height: 100%;
    border-radius: 10px;
    background: #000;
    margin-top: 9px;
    margin-left: 10px;
`;

export default function AuthenticationModal(props: any) {
    /** INITIALIZATION **/
        // const { signUpOpen, loginOpen, handleLoginOpen, handleSignUpOpen } = props;
    const classes = useStyles();
    const [mb_nick, setMbNick] = useState<string>("");
    const [mb_phone, setMbPhone] = useState<number>(0);
    const [mb_password, setMbPassword] = useState<string>("");

    /** HANDLERS **/

    const handleUserName = (e: any) => {
        setMbNick(e.target.value);
    };

    const handlePhone = (e: any) => {
        setMbPhone(Number(e.target.value));
    };

    const handlePassword = (e: any) => {
        setMbPassword(e.target.value);
    };

    const handleSignupRequest = async () => {
        try {
            const is_fulfilled = mb_nick !== "" && mb_password !== "" && mb_phone !== 0;
            assert.ok(is_fulfilled, Definer.input_err1);

            const signup_data = {
                mb_nick: mb_nick,
                mb_phone: mb_phone,
                mb_password: mb_password
            };

            const memberApiService = new MemberApiService();
            await memberApiService.signupRequest(signup_data);

            props.handleSignUpClose();
            window.location.reload();
        } catch (err) {
            console.log(err);
            props.handleSignUpClose();
            sweetErrorHandling(err).then();
        }
    };

    const handleLoginRequest = async () => {
        try {
            const is_fulfilled = mb_nick !== "" && mb_password !== "";
            assert.ok(is_fulfilled, Definer.input_err1);

            // login_data object ni yasab olib uniga mb_nick va passwordni kiritib olyabman
            const login_data = {
                mb_nick: mb_nick,
                mb_password: mb_password
            };
            const memberApiService = new MemberApiService();
            await memberApiService.loginRequest(login_data);
            props.handleLoginClose();
            window.location.reload();
        } catch (err) {
            console.log(err);
            props.handleLoginClose();
            sweetErrorHandling(err).then();
        }
    };

    const passwordKeyPressHandler = (e: any) => {
        try {
            if (e.key === "Enter" && props.signUpOpen) {
                handleSignupRequest().then();
            } else if (e.key === "Enter" && props.loginOpen) {
                handleLoginRequest().then();
            }
        } catch (err: any) {
            console.log(`getKeyHandler, ERROR: ${err}`);
            sweetErrorHandling(err).then();
        }
    };


    return (
        <div>
            {/*@ts-ignore*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.signUpOpen}
                onClose={props.handleSignUpClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.signUpOpen}>
                    <Stack
                        className={classes.paper}
                        direction={"row"}
                        sx={{width: "800px"}}
                    >
                        <ModalImg src={"/auth/password.jpeg"} alt="camera"/>
                        <Stack sx={{marginLeft: "69px", alignItems: "center"}}>
                            <h2>SignUp Form</h2>
                            <TextField
                                onChange={handleUserName}
                                sx={{marginTop: "7px"}}
                                id="outlined-basic"
                                label="username"
                                variant="outlined"
                            />
                            <TextField
                                onChange={handlePhone}
                                sx={{my: "17px"}}
                                id="outlined-basic"
                                label="phone number"
                                variant="outlined"
                                onKeyPress={passwordKeyPressHandler}
                            />
                            <TextField
                                onChange={handlePassword}
                                id="outlined-basic"
                                label="password"
                                variant="outlined"
                            />
                            <Fab
                                onClick={handleSignupRequest}
                                sx={{marginTop: "30px", width: "120px"}}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{mr: 1}}/>
                                Signup
                            </Fab>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>

            {/*@ts-ignore*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.loginOpen}
                onClose={props.handleLoginClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.loginOpen}>
                    <Stack
                        className={classes.paper}
                        direction={"row"}
                        sx={{width: "700px"}}
                    >
                        <ModalImg src={"/auth/password.jpeg"} alt="camera"/>
                        <Stack
                            sx={{
                                marginLeft: "65px",
                                marginTop: "25px",
                                alignItems: "center",
                            }}
                        >
                            <h2>Login Form</h2>
                            <TextField
                                onChange={handleUserName}
                                id="outlined-basic"
                                label="username"
                                variant="outlined"
                                sx={{my: "10px"}}
                            />
                            <TextField
                                onChange={handlePassword}
                                id="outlined-basic"
                                label="password"
                                variant="outlined"
                                onKeyPress={passwordKeyPressHandler}
                            />
                            <Fab
                                onClick={handleLoginRequest}
                                sx={{marginTop: "27px", width: "120px"}}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{mr: 1}}/>
                                Login
                            </Fab>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </div>
    );
}

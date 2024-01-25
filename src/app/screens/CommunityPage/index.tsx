import React from "react";
import {Box, Container, Stack, Button} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";


export function CommunityPage() {
    return (
        <div className={"myPage_container"}>
            <Container>
                <Stack className={"myPage_first_stack"}>
                    {/*<TabContext value={value}>*/}
                    <Stack className={"mypage_profile"}>
                        <Stack className={"mypage_second_box"}
                               sx={{flexDirection: "row"}}
                        >
                            <Box className={"myPage_pics"}>
                                <img src={"/home/men.webp"}/>
                            </Box>
                            <Stack sx={{flexDirection: "column"}}>
                                <Stack sx={{flexDirection: "row"}}>
                                    <Box className={"user_name"}>
                                        <p>Sunat Nur</p>
                                        <a>Agency</a>
                                    </Box>
                                    <Box className={"star_box"}>
                                        <img src={"/icons/rating.svg"}/>

                                    </Box>
                                    {/*<a onClick={() => setValue("6")} className={"settings_btn"}>*/}
                                    <SettingsIcon/>
                                    {/*</a>*/}
                                </Stack>
                                <Stack className={"all_box_follow"} sx={{flexDirection: "row"}}>
                                <Box className={"cont_article"}>
                                        <p>Articles</p>
                                        <a>48</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Followers</p>
                                        <a>23</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Following</p>
                                        <a>87</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Rating</p>
                                        <a>8.9</a>
                                    </Box>
                                </Stack>
                                <Box sx={{display: 'flex', gap: 1.5, '& > button': {flex: 1}, marginTop: "15px", marginLeft: "50px"}}>
                                    <Button sx={{backgroundColor: "#0044bb", color: "#fff"}}>
                                        Chat
                                    </Button>
                                    <Button sx={{backgroundColor: "#0044bb", color: "#fff"}}>
                                        Follow
                                    </Button>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack className={"rating_cnt"} sx={{flexDirection: "row"}}>

                        </Stack>

                    </Stack>
                    {/*</TabContext>*/}
                </Stack>
            </Container>
        </div>
    )
}
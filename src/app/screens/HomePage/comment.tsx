import { Box, Pagination } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import "../../../css/home.css"

export function Comment() {
    return (
        <div className="comment_frame">
            <Container>
                <Stack
                    className="comment_box"
                    sx={{ flexDirection: "column", alignItems: "center" }}
                >
                    <Box className="comment_frame_box">
                        <a>Comments</a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </p>
                    </Box>

                    <Stack className="comment_middle_box" sx={{ flexDirection: "row" }}>
                        <Stack
                            className="comment_main_box"
                            sx={{ flexDirection: "column", marginRight: "40px" }}
                        >
                            <Box className="comment_img">
                                <img src="/icons/rating.svg"></img>
                            </Box>
                            <Box className="text_def">
                                <h4>
                                    Shoping book in Clevr. is very easy. Quick delivery and fast
                                    respon. They services is awesome!
                                </h4>
                                <p>Steve Henry</p>
                            </Box>
                            <Box className="author_book">
                                <Box>
                                    <img src="/home/profile.4.png"></img>
                                </Box>
                            </Box>
                        </Stack>

                        <Stack
                            className="comment_main_box"
                            sx={{ flexDirection: "column", marginRight: "40px" }}
                        >
                            <Box className="comment_img">
                                <img src="/icons/rating.svg"></img>
                            </Box>
                            <Box className="text_def">
                                <h4>
                                    Shoping book in Clevr. is very easy. Quick delivery and fast
                                    respon. They services is awesome!
                                </h4>
                                <p>Steve Henry</p>
                            </Box>
                            <Box className="author_book">
                                <Box>
                                    <img src="/home/profile.4.png"></img>
                                </Box>
                            </Box>
                        </Stack>

                        <Stack
                            className="comment_main_box"
                            sx={{ flexDirection: "column", marginRight: "40px" }}
                        >
                            <Box className="comment_img">
                                <img src="/icons/rating.svg"></img>
                            </Box>
                            <Box className="text_def">
                                <h4>
                                    Shoping book in Clevr. is very easy. Quick delivery and fast
                                    respon. They services is awesome!
                                </h4>
                                <p>Steve Henry</p>
                            </Box>
                            <Box className="author_book">
                                <Box>
                                    <img src="/home/profile.4.png"></img>
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack spacing={1} sx={{flexDirection: "row", marginTop: "30px"}}>
                        <Pagination count={4} size="large" />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
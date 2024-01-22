import React, {useEffect} from "react";
import {Container, Stack, Box, Avatar} from "@mui/material";
import {BoArticle} from "../../../types/boArticle";
import {Dispatch, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {setBestBoArticles, setNewsBoArticles, setTrendBoArticles,} from "./slice";
import {retrieveBestBoArticles, retrieveNewsBoArticles, retrieveTrendBoArticles,} from "./selector";
import CommunityApiService from "../../apiSservices/communityApiService";
import {serverApi} from "../../../lib/config";
import Button from "@mui/material/Button";
// import {TViewer} from "../MemberPage/TViewer";


// /** REDUX SLICE */
// const actionDispatch = (dispatch: Dispatch) => ({
//     setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),
//     setTrendBoArticles: (data: BoArticle[]) => dispatch(setTrendBoArticles(data)),
//     setNewsBoArticles: (data: BoArticle[]) => dispatch(setNewsBoArticles(data)),
// });
//
// /** REDUX SELECTOR */
// const ArticlessRetriever = createSelector(
//     retrieveBestBoArticles,
//     retrieveNewsBoArticles,
//     retrieveTrendBoArticles,
//     (bestBoArticles, newsBoArticles, trendBoArticles) => ({
//         bestBoArticles,
//         newsBoArticles,
//         trendBoArticles,
//     })
// );

export default function Recommendations() {


    // const {setBestBoArticles, setTrendBoArticles, setNewsBoArticles} =
    //     actionDispatch(useDispatch());
    //
    // const {newsBoArticles, trendBoArticles, bestBoArticles} =
    //     useSelector(ArticlessRetriever);
    //
    // useEffect(() => {
    //     const communityService = new CommunityApiService();
    //     communityService.getTargetArticles({bo_id: "all", page: 1, limit: 2, order: "art_views"})
    //         .then((data) => setBestBoArticles(data))
    //         .catch((err) => console.log(err));
    //
    //     communityService.getTargetArticles({bo_id: "all", page: 1, limit: 2, order: "art_likes"})
    //         .then((data) => setTrendBoArticles(data))
    //         .catch((err) => console.log(err));
    //
    //     communityService.getTargetArticles({bo_id: "celebrity", page: 1, limit: 2, order: "art_views"})
    //         .then((data) => setNewsBoArticles(data))
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <div className="top_article_frame">
            <Container>
                <Stack>
                    <Stack className="article_main_definer_box">
                        <Box className="article_main_definer">
                            <p>Urban Updates</p>
                            <h1>Updated with the Latest Articles!</h1>
                        </Box>
                    </Stack>
                    <Stack className="article_post_box" sx={{flexDirection: "row"}}>
                        <Stack className="article_main_box">

                            <Box className="article_left_img_box">
                                <Box className="article_img_box">
                                    <img src={"/home/immio.jpg"}/>
                                </Box>
                                <Box className="article_createdAt">
                                    <p> January 22, 2024</p>
                                    <h1>
                                        Donec interdum diam id nisi rutrum pellentesque. Donec blandit cursus mauris,
                                        nec bibendum.
                                    </h1>
                                </Box>
                                <Stack className="user_articel_info" sx={{ flexDirection: "row"}}>
                                    <Box className="article_user_img">
                                        <img src={"home/profile.4.png"}/>
                                        <text> @sunat_nur</text>
                                    </Box>
                                    <Button className="article_pagination">
                                        <span>Read More</span>
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack className="article_right_box">

                            <Stack className="article_right_img_box" sx={{flexDirection: "row"}}>
                                <Box className="article_img_box_right">
                                    <img src={"/home/immio.jpg"}/>
                                </Box>
                                <Box className="article_right_createdAt">
                                    <span> January 22, 2024</span>
                                    <h1>
                                        Donec interdum diam id nisi rutrum pellentesque.
                                        nec bibendum.
                                    </h1>

                                <Box className="user_img_right_box">
                                    <img src={"home/profile.4.png"}/>
                                    <text> @sunat_nur</text>
                                </Box>
                                </Box>
                            </Stack>


                            <Stack className="article_right_img_box" sx={{flexDirection: "row"}}>
                                <Box className="article_img_box_right">
                                    <img src={"/home/home5.png"}/>
                                </Box>
                                <Box className="article_right_createdAt">
                                    <span> January 22, 2024</span>
                                    <h1>
                                        Donec interdum diam id nisi rutrum pellentesque.
                                        nec bibendum.
                                    </h1>


                                    <Box className="user_img_right_box">
                                        <img src={"home/profile.4.png"}/>
                                        <text> @sunat_nur</text>
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack className="article_right_img_box" sx={{flexDirection: "row"}}>
                                <Box className="article_img_box_right">
                                    <img src={"/home/img.png"}/>
                                </Box>
                                <Box className="article_right_createdAt">
                                    <span> January 22, 2024</span>
                                    <h1>
                                        Donec interdum diam id nisi rutrum pellentesque.
                                        nec bibendum.
                                    </h1>

                                    <Box className="user_img_right_box">
                                        <img src={"home/profile.4.png"}/>
                                        <text> @sunat_nur</text>
                                    </Box>
                                </Box>
                            </Stack>

                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
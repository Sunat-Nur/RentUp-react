import React, {useEffect} from "react";
import {Container, Stack, Box, Avatar} from "@mui/material";
import {BoArticle} from "../../../types/boArticle";
import {Dispatch, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {setBestBoArticles, setNewsBoArticles, setTrendBoArticles,} from "./slice";
import {retrieveBestBoArticles, retrieveNewsBoArticles, retrieveTrendBoArticles,} from "./selector";
import CommunityApiService from "../../apiSservices/communityApiService";
import {serverApi} from "../../../lib/config";
import moment from "moment";
import Button from "@mui/material/Button";
import {TViewer} from "../MemberPage/TViewer";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),
    setTrendBoArticles: (data: BoArticle[]) => dispatch(setTrendBoArticles(data)),
});

/** REDUX SELECTOR */
const ArticlessRetriever = createSelector(
    retrieveBestBoArticles,
    retrieveTrendBoArticles,
    (bestBoArticles,  trendBoArticles) => ({
        bestBoArticles,
        trendBoArticles,
    })
);

export default function Recommendations() {


    const {setBestBoArticles, setTrendBoArticles} =
        actionDispatch(useDispatch());

    const { trendBoArticles, bestBoArticles} =
        useSelector(ArticlessRetriever);

    useEffect(() => {
        const communityService = new CommunityApiService();
        communityService.getTargetArticles({bo_id: "all", page: 1, limit: 1, order: "art_views"})
            .then((data) => setBestBoArticles(data))
            .catch((err) => console.log(err));

        communityService.getTargetArticles({bo_id: "all", page: 1, limit: 3, order: "art_likes"})
            .then((data) => setTrendBoArticles(data))
            .catch((err) => console.log(err));

        communityService.getTargetArticles({bo_id: "celebrity", page: 1, limit: 2, order: "art_views"})
            .then((data) => setNewsBoArticles(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="top_article_frame">
            <Container>
                <Stack>
                    <Stack className="article_main_definer_box">
                        <Box className="article_main_definer">
                            <div data-aos="fade-up"
                                 data-aos-anchor-placement="top-bottom">
                                <p>Urban Updates</p>
                                <h1>Updated with the Latest Articles!</h1>
                            </div>
                        </Box>
                    </Stack>
                    <div data-aos="fade-up">
                        {/*<div data-aos="fade-up" data-aos-anchor-placement="bottom-center">*/}
                        <Stack className="article_post_box" sx={{flexDirection: "row"}}>

                            {bestBoArticles?.map((article: BoArticle) => {
                                const image = article?.art_image
                                    ? `${serverApi}/${article?.art_image}`
                                    : "/auth/odamcha.svg";
                                return (
                                    <Stack
                                        className="article_main_box"
                                        key={article._id}
                                    >
                                        <Box className="article_left_img_box">
                                            <Box className="article_img_box">
                                                <img src={image}/>
                                            </Box>
                                            <Box className="article_createdAt">
                                                <p>{moment(article?.createdAt).format("YY-MM-DD HH:mm")}</p>
                                                <p className={"all_article_desc"}>Article about
                                                    :{article?.art_subject}</p>
                                            </Box>
                                            <Stack className="user_articel_info" sx={{flexDirection: "row"}}>
                                                <Box className="article_user_img">
                                                    <img src={article?.member_data?.mb_image
                                                        ? `${serverApi}/${article?.member_data?.mb_image}`
                                                        : "/auth/odamcha.svg"}/>
                                                    <text> {article?.member_data?.mb_nick}</text>
                                                </Box>
                                                <Button className="article_pagination">
                                                    <span>Read More</span>
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Stack>

                                )
                            })}


                            <Stack className="article_right_box">
                                {trendBoArticles?.map((article: BoArticle) => {
                                    const image = article?.art_image
                                        ? `${serverApi}/${article?.art_image}`
                                        : "/community/odamcha.svg";
                                    return (
                                        <Stack className="article_right_img_box" sx={{flexDirection: "row"}}>
                                            <Box className="article_img_box_right">
                                                <img src={image}/>
                                            </Box>
                                            <Box className="article_right_createdAt">
                                                <span>{moment(article?.createdAt).format("YY-MM-DD HH:mm")}</span>
                                                <h1>
                                                    Article about: {article?.art_subject}
                                                </h1>

                                                <Box className="user_img_right_box">
                                                    <img src={ article?.member_data?.mb_image
                                                        ? `${serverApi}/${article?.member_data?.mb_image}`
                                                        : "/auth/odamcha.svg"}/>
                                                    <text> @{article?.member_data?.mb_nick}</text>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    </div>
                </Stack>
            </Container>
        </div>
    );
}
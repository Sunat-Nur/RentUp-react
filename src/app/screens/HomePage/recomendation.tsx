import React, {useEffect} from "react";
import {Container, Stack, Box, Avatar} from "@mui/material";
import {BoArticle} from "../../../types/boArticle";
import {Dispatch, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {setBestBoArticles, setNewsBoArticles, setTrendBoArticles,} from "./slice";
import {retrieveBestBoArticles, retrieveNewsBoArticles, retrieveTrendBoArticles,} from "./selector";
import CommunityApiService from "../../apiSservices/communityApiService";
import {serverApi} from "../../../lib/config";
import {verifiedMemberData} from "../../apiSservices/verify";
// import {TViewer} from "../MemberPage/TViewer";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setBestBoArticles: (data: BoArticle[]) => dispatch(setBestBoArticles(data)),
    setTrendBoArticles: (data: BoArticle[]) => dispatch(setTrendBoArticles(data)),
    setNewsBoArticles: (data: BoArticle[]) => dispatch(setNewsBoArticles(data)),
});

/** REDUX SELECTOR */
const ArticlessRetriever = createSelector(
    retrieveBestBoArticles,
    retrieveNewsBoArticles,
    retrieveTrendBoArticles,
    (bestBoArticles, newsBoArticles, trendBoArticles) => ({
        bestBoArticles,
        newsBoArticles,
        trendBoArticles,
    })
);

export default function Recommendations() {
    const {setBestBoArticles, setTrendBoArticles, setNewsBoArticles} =
        actionDispatch(useDispatch());

    const {newsBoArticles, trendBoArticles, bestBoArticles} =
        useSelector(ArticlessRetriever);

    useEffect(() => {
        const communityService = new CommunityApiService();
        communityService.getTargetArticles({bo_id: "all", page: 1, limit: 2, order: "art_views"})
            .then((data) => setBestBoArticles(data))
            .catch((err) => console.log(err));

        communityService.getTargetArticles({bo_id: "all", page: 1, limit: 2, order: "art_likes"})
            .then((data) => setTrendBoArticles(data))
            .catch((err) => console.log(err));

        communityService.getTargetArticles({bo_id: "celebrity", page: 1, limit: 2, order: "art_views"})
            .then((data) => setNewsBoArticles(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="top_article_frame">
            <Container maxWidth="lg" sx={{mb: "50px", mt: "60px"}} style={{position: "relative"}}>
                <Stack flexDirection={"column"} alignItems={"center"} sx={{mt: "45px"}}>
                    <Box className={"category_title"}>Tafsiya qilingan maqolalar</Box>
                    <Stack className={"article_main"} flexDirection={"row"}>
                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Ko'p ko'rilgan</Box>
                            {bestBoArticles?.map((article: BoArticle) => {
                                const image = article?.art_image
                                    ? `${serverApi}/${article?.art_image}`
                                    : "/community/odamcha.svg";
                                return (
                                    <Stack className={"article_box"} key={article._id}>
                                        <Box className={"article_img"} sx={{backgroundImage: `url(${image})`}}></Box>
                                        <Box className={"article_info"}>
                                            <Box className={"article_main_info"}>
                                                <div className={"article_author"}>
                                                    <Avatar
                                                        alt="Author_photo"
                                                        src={
                                                            article?.member_data?.mb_image
                                                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                                                : "/auth/odamcha.svg"
                                                        }
                                                    />
                                                    <span
                                                        className={"author_username"}>{article?.member_data?.mb_nick}
                                                    </span>
                                                </div>
                                                <span className={"article_title"}>{article?.art_subject}</span>
                                                <p className={"article_desc"}></p>
                                            </Box>
                                        </Box>
                                    </Stack>
                                );
                            })};
                            <Box className={"article_category"} sx={{marginTop: "10px"}}> Ko'p yoqtirilgan </Box>

                            {trendBoArticles?.map((article: BoArticle) => {
                                const image = article?.art_image
                                    ? `${serverApi}/${article?.art_image}`
                                    : "/community/odamcha.svg";
                                return (
                                    <Stack className={"article_box"} key={article._id}>
                                        <Box className={"article_img"} sx={{backgroundImage: `url(${image})`}}></Box>
                                        <Box className={"article_info"}>
                                            <Box className={"article_main_info"}>
                                                <div className={"article_author"}>
                                                    <Avatar
                                                        alt="Author_photo"
                                                        src={
                                                            article?.member_data?.mb_image
                                                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                                                : "/auth/odamcha.svg"
                                                        }
                                                        sx={{width: "35px", height: "35px"}}
                                                    />
                                                    <span
                                                        className={"author_username"}>{article?.member_data?.mb_nick}
                                                    </span>
                                                </div>
                                                <span className={"article_title"}>{article?.art_subject}</span>
                                                <p className={"article_desc"}></p>
                                            </Box>
                                        </Box>
                                    </Stack>
                                );
                            })};
                        </Stack>
                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Mashhurlar</Box>
                            {newsBoArticles?.map((article: BoArticle) => {
                                return (
                                    <Box className={"article_news"}>
                                        {/*<TViewer chosenSingleBoArticle={article}/>*/}
                                    </Box>
                                )
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
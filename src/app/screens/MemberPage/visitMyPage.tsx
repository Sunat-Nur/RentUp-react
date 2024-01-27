import React, {useEffect, useState} from "react";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Box, Container, Pagination, PaginationItem, Stack} from "@mui/material";
// import {MemberPosts} from "./memberPosts";
// import {MemberFollowers} from "./memberFollowers";
// import {MemberFollowing} from "./memberFollowing";
// import {MySettings} from "./mySettings";
// import {TuiEditor} from "./TuiEditor";
import {TViewer} from "./TViewer"
/** others  */
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Button, Tab} from "@mui/material";
/** Redux*/
import {Dispatch} from "@reduxjs/toolkit";
import {Member} from "../../../types/user";
import {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle} from "./slice";
import {retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle} from "./selector";
import {BoArticle, SearchMemberArticlesObj} from "../../../types/boArticle";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiSservices/communityApiService";
import MemberApiService from "../../apiSservices/memberApiService";
import {serverApi} from "../../../lib/config";
import {verifiedMemberData} from "../../apiSservices/verify";
import {MemberPosts} from "./memberPosts";
import {MySettings} from "./mySettings";
import {MemberFollowing} from "./memberFollowing";
import {TuiEditor} from "./TuiEditor";
import {MemberFollowers} from "./memberFollowers";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setChosenMemberBoArticles: (data: BoArticle[]) =>
        dispatch(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data: BoArticle) =>
        dispatch(setChosenSingleBoArticle(data)),
});

/** REDUX SELECTOR **/
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({
        chosenMember,
    })
);
const chosenMemberBoArticlesRetriever = createSelector(
    retrieveChosenMemberBoArticles,
    (chosenMemberBoArticles) => ({
        chosenMemberBoArticles,
    })
);
const chosenSingleBoArticleRetriever = createSelector(
    retrieveChosenSingleBoArticle,
    (chosenSingleBoArticle) => ({
        chosenSingleBoArticle,
    })
);


export function VisitMyPage(props: any) {
    /** INITIALIZATIONS */

    const {
        setChosenMember,
        setChosenMemberBoArticles,
        setChosenSingleBoArticle,
    } = actionDispatch(useDispatch());

    const {chosenMember} = useSelector(chosenMemberRetriever);
    const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
    const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
    const [value, setValue] = useState("1");
    const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
    const [followRebuild, setFollowRebuild] = useState<boolean>(false);
    const [memberArticleSearchObj, setMemberArticleSearchObj] =
        useState<SearchMemberArticlesObj>({mb_id: "none", page: 1, limit: 4});


    useEffect(() => {
        if (!verifiedMemberData) {
            sweetFailureProvider("Please login first", true, true);
        }

        const communityService = new CommunityApiService();
        communityService.getMemberCommunityArticles(memberArticleSearchObj)
            .then(data => setChosenMemberBoArticles(data))
            .catch((err) => console.log(err));

        const memberService = new MemberApiService();
        memberService.getChosenMember(verifiedMemberData?._id)
            .then((data) => setChosenMember(data))
            .catch((err) => console.log(err));

    }, [memberArticleSearchObj, articlesRebuild, followRebuild]);

    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
    const handlePaginationChange = (event: any, value: number) => {
        memberArticleSearchObj.page = value
        setMemberArticleSearchObj({...memberArticleSearchObj});
    };

    const renderChosenArticleHandler = async (art_id: string) => {
        try {
            const communityService = new CommunityApiService()
            communityService.getChosenArticle(art_id)
                .then((data) => {
                    setChosenSingleBoArticle(data);
                    setValue("5");
                })
                .catch((err) => console.log(err));

        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then()
        }
    }

    return (
        <div className={"myPage_container"}>
            <Container>
                <Stack className={"myPage_first_stack"}>
                    <TabContext value={value}>
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
                                        <a onClick={() => setValue("6")} className={"settings_btn"} style={{ marginLeft: "200px"}}>
                                        <SettingsIcon/>
                                        </a>
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
                        <Stack className={"my_page_left"}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className={"menu_name"}>Contents</Box>
                                    <Box className={"menu_content"}>
                                        <MemberPosts
                                            chosenMemberBoArticles={chosenMemberBoArticles}
                                            renderChosenArticleHandler={renderChosenArticleHandler}
                                            setArticlesRebuild={setArticlesRebuild}
                                        />
                                        <Stack
                                            sx={{my: "40px"}}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box className={"bottom_box"}>
                                                <Pagination
                                                    count={memberArticleSearchObj.page >= 3 ? memberArticleSearchObj.page + 1 : 3}
                                                    page={memberArticleSearchObj.page}
                                                    renderItem={(item) => (
                                                        <PaginationItem
                                                            components={{
                                                                previous: ArrowBackIcon,
                                                                next: ArrowForwardIcon,
                                                            }}
                                                            {...item}
                                                            color={"secondary"}
                                                        />
                                                    )}
                                                    onChange={handlePaginationChange}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"2"}>
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowers
                                            actions_enabled={true}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                            mb_id={verifiedMemberData?._id}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"3"}>
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing
                                            actions_enabled={true}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                            mb_id={verifiedMemberData?._id}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"4"}>
                                    <Box className={"menu_name"}>Maqola yozish</Box>
                                    <Box className={"write_content"}>
                                        <TuiEditor
                                            setValue={setValue}
                                            setArticlesRebuild={setArticlesRebuild}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"5"}>
                                    <Box className={"menu_name"}>tanlangan maqola</Box>
                                    <Box className={"menu_content"}>
                                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle}/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"6"}>
                                    <Box className={"menu_name"}>Ma'lumotlarni o'zgartirish</Box>
                                    <Box className={"menu_content"}>
                                        <MySettings/>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Stack>



                    </TabContext>
                </Stack>
            </Container>
        </div>
    )
}

























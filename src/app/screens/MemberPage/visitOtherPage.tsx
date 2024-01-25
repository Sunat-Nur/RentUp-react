import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Box, Container, Pagination, PaginationItem, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {MemberPosts} from "./memberPosts";
import {MemberFollowers} from "./memberFollowers";
import {MemberFollowing} from "./memberFollowing";
import {MySettings} from "./mySettings";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
/** others*/
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Button, Tab} from "@mui/material";
import {TViewer} from "./TViewer";
/** Redux */
import {Dispatch} from "@reduxjs/toolkit";
import {Member} from "../../../types/user";
import {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle} from "./slice";
import {BoArticle, SearchMemberArticlesObj} from "../../../types/boArticle";
import {createSelector} from "reselect";
import {retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle} from "./selector";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import MemberApiService from "../../apiSservices/memberApiService";
import CommunityApiService from "../../apiSservices/communityApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import FollowApiService from "../../apiSservices/followApiService";
import {serverApi} from "../../../lib/config";
import {verifiedMemberData} from "../../apiSservices/verify";


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

export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS */
    const history = useHistory()
    const { chosen_mb_id, chosen_art_id} = props;
    const {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle,} = actionDispatch(useDispatch());

    const {chosenMember} = useSelector(chosenMemberRetriever);
    const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
    const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
    const [value, setValue] = useState("1");
    const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
    const [followRebuild, setFollowRebuild] = useState<boolean>(false);
    const [memberArticleSearchObj, setMemberArticleSearchObj] =
        useState<SearchMemberArticlesObj>({mb_id: chosen_mb_id, page: 1, limit: 4});


    useEffect(() => {
        if (chosen_mb_id === verifiedMemberData?._id) {
            history.push("/member-page")
        }
        const communityService = new CommunityApiService();
        if (chosen_art_id) {
            communityService.getChosenArticle(chosen_art_id)
                .then((data) => {
                    setChosenSingleBoArticle(data);
                    setValue("4")
                })
                .catch((err) => console.log(err));
        }

        communityService.getMemberCommunityArticles(memberArticleSearchObj)
            .then(data => setChosenMemberBoArticles(data))
            .catch((err) => console.log(err));
    }, [memberArticleSearchObj, chosen_mb_id, articlesRebuild]);

    useEffect(() => {
        if (chosen_mb_id === verifiedMemberData?._id) {
            history.push("/member-page");
        }
        const memberService = new MemberApiService();
        memberService.getChosenMember(memberArticleSearchObj?.mb_id)
            .then((data) => setChosenMember(data))
            .catch((err) => console.log(err));
    }, [verifiedMemberData, chosen_mb_id, followRebuild]);

    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
    const handlePaginationChange = (event: any, value: number) => {
        memberArticleSearchObj.page = value
        setMemberArticleSearchObj({...memberArticleSearchObj});
    };

    const renderChosenArticleHandler = async (e: any, art_id: string) => {
        try {
            e.stopPropagation();
            const communityService = new CommunityApiService()
            communityService.getChosenArticle(art_id)
                .then((data) => {
                    setChosenSingleBoArticle(data);
                    setValue("4");
                })
                .catch((err) => console.log(err));

        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then()
        }
    };

    const subscribeHandler = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const followService = new FollowApiService();
            await followService.subscribe(e.target.value);
            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
            setFollowRebuild(!followRebuild);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const unsubscribeHandler = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const followService = new FollowApiService();
            await followService.unsubscribe(e.target.value);
            await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
            setFollowRebuild(!followRebuild);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className={"my_page"}>
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px",}}>
                <Stack className={"my_page_frame"} sx={{flexDirection: "row"}}>
                    <TabContext value={value}>
                        <Stack className={"my_page_left"}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className={"menu_name"}> contents</Box>
                                    <Box className={"menu_content"}>
                                        <MemberPosts
                                            chosenMemberBoArticles={chosenMemberBoArticles}
                                            renderChosenArticleHandler={renderChosenArticleHandler}
                                            articlesRebuild={articlesRebuild}
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
                                            actions_enabled={false}
                                            mb_id={chosen_mb_id}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"3"}>
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing
                                            actions_enabled={false}
                                            mb_id={chosen_mb_id}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="4">
                                    <Box className="menu_name">Tanlangan Maqola</Box>
                                    <Box className="menu_content">
                                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Stack>
                        <Stack className={"my_page_right"} style={{height: "365px"}}>
                            <Box className={"order_info_box"}>
                                {/*<a onClick={() => setValue("6")} className={"settings_btn"}>*/}
                                {/*    <SettingsIcon/>*/}
                                {/*</a>*/}
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    <div className={"order_user_img"}>
                                        <img src={
                                            chosenMember?.mb_image
                                                ? `${serverApi}/${chosenMember?.mb_image}`
                                                : "/auth/default_user.svg"
                                        } className={"order_user_avatar"}/>
                                    </div>
                                    <span className={"order_user_name"}>{chosenMember?.mb_nick}</span>
                                    <span className={"order_user_prof"}>{chosenMember?.mb_type}</span>
                                </Box>
                                <Box className={"user_media_box"}
                                     sx={{color: "#a1a1a1", justifyContent: "space-between", alignItems: "center"}}>
                                    <FacebookIcon/>
                                    <InstagramIcon/>
                                    <TelegramIcon/>
                                    <YouTubeIcon/>
                                </Box>
                                <Box className={"user_media_box_follow"} sx={{flexDirection: "row", mt: "10px"}}>
                                    Follower: {chosenMember?.mb_subscriber_cnt} "
                                    Following: {chosenMember?.mb_follow_cnt}
                                </Box>
                                <Box className={"user_desc"} sx={{mt: "10px", marginBottom: "9px"}}>
                                    {chosenMember?.mb_description ??
                                        "qushimcha ma'lumotlar mavjud emas"}
                                </Box>
                                <Box display={"flex"} justifyContent={"flex-end"} sx={{mt: "5px"}}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {chosenMember?.me_followed && chosenMember?.me_followed[0]?.my_following ? (
                                            <Tab
                                                value={"4"}
                                                component={() => (
                                                    <Button
                                                        value={chosenMember?._id}
                                                        variant="contained"
                                                        className="btn_cancel"
                                                        onClick={unsubscribeHandler}
                                                    >
                                                        unFollow
                                                    </Button>
                                                )}
                                            />
                                        ) : (
                                            <Tab
                                                value={"4"}
                                                component={() => (
                                                    <Button
                                                        value={chosenMember?._id}
                                                        variant="contained"
                                                        className="btn_follow"
                                                        onClick={subscribeHandler}
                                                    >
                                                        Follow
                                                    </Button>
                                                )}
                                            />
                                        )}
                                    </TabList>
                                </Box>
                            </Box>

                            <Box className={"my_page_menu"}
                                 sx={{flexDirection: "column"}}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Stack flexDirection={"column"}>
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"1"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("1")}>
                                                    <img src={"/icons/Pencil.svg"} alt=""/>
                                                    <span> Contents</span>
                                                </div>
                                            )}
                                        />

                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"2"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("2")}>
                                                    <img src={"/icons/Group.svg"} alt=""/>
                                                    <span>Follower</span>
                                                </div>
                                            )}
                                        />
                                        <Tab
                                            style={{flexDirection: "column"}}
                                            value={"3"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("3")}>
                                                    <img src={"/icons/user.svg"} alt=""/>
                                                    <span>Following</span>
                                                </div>
                                            )}
                                        />

                                    </Stack>
                                </TabList>
                            </Box>
                        </Stack>
                    </TabContext>
                </Stack>
            </Container>
        </div>
    );
}

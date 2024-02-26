import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Box, Container, Pagination, PaginationItem, Stack,} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {MemberPosts} from "./memberPosts";
import {MemberFollowers} from "./memberFollowers";
import {MemberFollowing} from "./memberFollowing";
/** others*/
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Button, Tab} from "@mui/material";
/** Redux */
import {Dispatch} from "@reduxjs/toolkit";
import {TViewer} from "./TViewer";
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
import {CssVarsProvider} from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";


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
    const {chosen_mb_id, chosen_art_id} = props;
    const refs: any = useRef([]);
    const {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle,} = actionDispatch(useDispatch());

    const {chosenMember} = useSelector(chosenMemberRetriever);
    const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
    const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
    const [value, setValue] = useState("1");
    const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
    const [followRebuild, setFollowRebuild] = useState<boolean>(false);
    const [memberArticleSearchObj, setMemberArticleSearchObj] =
        useState<SearchMemberArticlesObj>({mb_id: chosen_mb_id, page: 1, limit: 2});


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
                <Stack className={"mypage_top"} sx={{flexDirection: "column"}}>
                    <Stack className={"mypage_profile"}>
                        <Stack className={"mypage_second_box"}
                               sx={{flexDirection: "row"}}
                        >
                            <Box className={"myPage_pics"}>
                                <img src={
                                    chosenMember?.mb_image
                                        ? `${serverApi}/${chosenMember?.mb_image}`
                                        : "/auth/odamcha.svg"
                                }/>
                            </Box>
                            <Stack sx={{flexDirection: "column"}}>
                                <Stack sx={{flexDirection: "row"}}>
                                    <Box className={"user_name"}>
                                        <p>{chosenMember?.mb_nick}</p>
                                        <a>{chosenMember?.mb_type}</a>
                                    </Box>
                                    <Box className={"star_box"}>
                                        <img src={"/icons/rating.svg"}/>
                                    </Box>
                                </Stack>
                                <Stack className={"all_box_follow"} sx={{flexDirection: "row"}}>
                                    <Box className={"cont_article"}>
                                        <p>phone</p>
                                        <a>{chosenMember?.mb_phone}</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Followers</p>
                                        <a> {chosenMember?.mb_subscriber_cnt}</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Following</p>
                                        <a> {chosenMember?.mb_follow_cnt}</a>
                                    </Box>
                                    <Box className={"cont_article"}>
                                        <p>Rating</p>
                                        <a>8.9</a>
                                    </Box>
                                </Stack>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                    '& > button': {flex: 1},
                                    marginTop: "15px",
                                    marginLeft: "50px"
                                }}>
                                    <Box display={"flex"} justifyContent={"flex-end"} sx={{mt: "5px"}}>
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
                                                        className="btn_follow"
                                                        onClick={subscribeHandler}
                                                        sx={{backgroundColor: "#0044bb", color: "#fff", width: "115px"}}
                                                    >
                                                        Follow
                                                    </Button>
                                                )}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>


                    <Stack flexDirection={"row"}>
                        <Stack className={"mypage_middle"} sx={{flexDirection: "row"}}>
                            <TabContext value={value}>
                                <Stack className={"my_page_left"}>
                                    <Stack className={"my_page_right"}>
                                        <Box className={"my_page_menu"}
                                             sx={{flexDirection: "column"}}
                                        >
                                            <TabList
                                                onChange={handleChange}
                                                variant="scrollable"
                                                // value={value}
                                                className="my_page_menu"
                                                aria-label="Vertical tabs example"
                                                sx={{
                                                    borderRight: 1,
                                                    borderColor: "divider",
                                                    width: "560px",
                                                    marginTop: "30px"
                                                }}
                                            >
                                                <Stack flexDirection={"row"}>
                                                    <Tab
                                                        style={{flexDirection: "column",}}
                                                        value={"1"}
                                                        component={() => (
                                                            <div className={`menu_box ${value}`}
                                                                 onClick={() => setValue("1")}>
                                                                <span>Contents</span>
                                                            </div>
                                                        )}
                                                    />
                                                    <Tab
                                                        style={{flexDirection: "column",}}
                                                        value={"2"}
                                                        component={() => (
                                                            <div className={`menu_box ${value}`}
                                                                 onClick={() => setValue("2")}>
                                                                <span>Follower</span>
                                                            </div>
                                                        )}
                                                    />
                                                    <Tab
                                                        style={{flexDirection: "column",}}
                                                        value={"3"}
                                                        component={() => (
                                                            <div className={`menu_box ${value}`}
                                                                 onClick={() => setValue("3")}>
                                                                <span>Following</span>
                                                            </div>
                                                        )}
                                                    />
                                                </Stack>
                                            </TabList>
                                        </Box>
                                    </Stack>
                                    <Box display={"flex"} flexDirection={"column"}>
                                        <TabPanel value={"1"}>
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
                                            <Box className={"menu_content"}>
                                                <MemberFollowing
                                                    actions_enabled={false}
                                                    mb_id={chosen_mb_id}
                                                    followRebuild={followRebuild}
                                                    setFollowRebuild={setFollowRebuild}
                                                />
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value={"4"}>
                                            <Box className={"menu_name"}>Chosen content</Box>
                                            <Box className={"menu_content"}>
                                                <TViewer chosenSingleBoArticle={chosenSingleBoArticle}/>
                                            </Box>
                                        </TabPanel>
                                    </Box>
                                </Stack>
                            </TabContext>

                        </Stack>
                        <Stack className={"right_pics"}>
                            <h4>home town</h4>
                        </Stack>
                    </Stack>
                    <Stack className={"right_side"}>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

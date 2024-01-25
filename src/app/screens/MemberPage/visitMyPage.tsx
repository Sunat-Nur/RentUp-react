/** others  */
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Box, Button, Container, Stack, Tab} from "@mui/material";
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
import {useEffect, useState} from "react";
import TabContext from "@mui/lab/TabContext";


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
                            <Box className={"myPage_pics"}>
                                <img src={"/home/odamcha.svg"}/>
                            </Box>

                        </Stack>
                    </TabContext>
                </Stack>
            </Container>
        </div>
    )
}

























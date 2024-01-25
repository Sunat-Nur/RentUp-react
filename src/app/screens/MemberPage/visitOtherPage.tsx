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
import {useEffect, useState} from "react";

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

export function VisitOtherPage(props:any) {
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


}






























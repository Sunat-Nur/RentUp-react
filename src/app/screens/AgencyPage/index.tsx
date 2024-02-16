/** other  */
import {serverApi} from "../../../lib/config";
import React, {useEffect, useRef, useState} from "react";
import assert from "assert";
import CompanyApiService from "../../apiSservices/companyApiService";
import {Definer} from "../../../lib/definer";
import SwiperCore from "swiper";
import Autoplay from "swiper";
import Navigation from "swiper";
import MemberApiService from "../../apiSservices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import {useHistory} from "react-router-dom";
import {SearchObj} from "../../../types/others";
import AspectRatio from '@mui/joy/AspectRatio';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {PaginationItem} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import "../../../css/home.css"

/** REDUX  */
import {createSelector} from "reselect";
import {retrieveTargetCompanys} from "./selector";
import {Company} from '../../../types/user';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setTargetCompany} from "./slice";
import {verifiedMemberData} from "../../apiSservices/verify";
import {Box, Container, Stack} from "@mui/system";
import {CssVarsProvider} from "@mui/joy/styles";
import {Comments} from "../HomePage/comments";


SwiperCore.use([Autoplay, Navigation,]);

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetCompany: (data: Company[]) => dispatch(setTargetCompany(data)),
});

/** REDUX SELECTOR */
const targetCompanyRetriever = createSelector(
    retrieveTargetCompanys,
    (targetCompany) => ({
        targetCompany,
    })
);


export function AgencyPage() {
    /** INITIALIZATIONS */
    const {setTargetCompany} = actionDispatch(useDispatch());
    const {targetCompany} = useSelector(targetCompanyRetriever);
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());
    const [targetSearchObject, setTartgetSearchObject] = useState<SearchObj>({
        page: 1,
        limit: 12,
        order: "mb_point",
    });
    const refs: any = useRef([]);
    const history = useHistory();


    useEffect(() => {
        const companyService = new CompanyApiService();
        companyService.getCompanys(targetSearchObject)
            .then(data => setTargetCompany(data))
            .catch((err) => console.log(err));
    }, [targetSearchObject, productRebuild]);

    /** HANDLERS  */
    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    };

    const searchHandler = (category: string) => {
        targetSearchObject.page = 1;
        targetSearchObject.order = category;
        setTartgetSearchObject({...targetSearchObject});  // targetSearchObject ning qiymatlaridan tashkil topgan yangi object hosil qilyabman
    };
    const handlePaginationChange = (event: any, value: number) => {
        targetSearchObject.page = value;
        setTartgetSearchObject({...targetSearchObject});
    };


    // const targetLikeHandler = async (e: any, id: string) => {
    //     try {
    //         assert.ok(verifiedMemberData, Definer.auth_err1);
    //         const memberService = new MemberApiService();
    //         const like_result: any = await memberService.memberLikeTarget({
    //             like_ref_id: id,
    //             group_type: "member",
    //         });
    //         assert.ok(like_result, Definer.general_err1);
    //         if (like_result.like_status > 0) {
    //             e.target.style.fill = "red";
    //             refs.current[like_result.like_ref_id].innerHTML++;
    //         } else {
    //             e.target.style.fill = "white"
    //             refs.current[like_result.like_ref_id].innerHTML--;
    //         }
    //         await sweetTopSmallSuccessAlert("success", 700, false);
    //     } catch (err: any) {
    //         console.log("targetLikeTop, ERROR:", err);
    //         sweetErrorHandling(err).then();
    //     }
    // };

    const targetLikeHandler = async (e: any, targetId: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: targetId,
                group_type: "member",
            });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            setProductRebuild(new Date());
        } catch (err: any) {
            console.log("targetLikeProduct, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className={"all_agency"}>
            <Container>
                <Stack className={"all_agency_frame"} flexDirection={"column"} alignItems={"center"}>
                    <div data-aos="zoom-in">
                        <Box className={"fil_search_box"} sx={{display: "flex", justifyContent: "space-between"}}>
                            <Box className={"fil_box"} style={{cursor: "pointer"}}>
                                <a onClick={() => searchHandler("mb_point")}>best</a>
                                <a onClick={() => searchHandler("mb_views")}>famous</a>
                                <a onClick={() => searchHandler("mb_likes")}>trend</a>
                                <a onClick={() => searchHandler("createdAt")}>new</a>
                            </Box>
                        </Box>
                    </div>

                    <div data-aos="zoom-in">
                        <Stack className={"all_agency_box"}>
                            <Stack className={"agency_second"} sx={{flexDirection: "row", flexWrap: "wrap",}}>
                                <CssVarsProvider>
                                    {targetCompany.map((ele: Company) => {
                                        const image_path = `${serverApi}/${ele.mb_image}`;
                                        return (
                                            <Card
                                                onClick={() => visitMemberHandler(ele._id)}
                                                variant="plain"
                                                sx={{
                                                    width: 300,
                                                    bgcolor: 'initial',
                                                    p: 0,
                                                    marginRight: "15px",
                                                    marginBottom: "40px"
                                                }}
                                            >
                                                <Box sx={{position: 'relative'}}>
                                                    <AspectRatio ratio="4/3">
                                                        <figure>
                                                            <img
                                                                src={image_path}
                                                                loading="lazy"
                                                            />
                                                        </figure>
                                                    </AspectRatio>
                                                    <CardCover
                                                        className="gradient-cover"
                                                        sx={{
                                                            '&:hover, &:focus-within': {
                                                                opacity: 1,
                                                            },
                                                            opacity: 0,
                                                            transition: '0.1s ease-in',
                                                            background:
                                                                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                                                        }}
                                                    >
                                                        <div>
                                                            <Box
                                                                sx={{
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 1.5,
                                                                    flexGrow: 1,
                                                                    alignSelf: 'flex-end',
                                                                }}
                                                            >
                                                                <Typography level="h2" noWrap sx={{fontSize: 'lg'}}>
                                                                    <Link
                                                                        href="#dribbble-shot"
                                                                        overlay
                                                                        underline="none"
                                                                        sx={{
                                                                            color: '#fff',
                                                                            textOverflow: 'ellipsis',
                                                                            overflow: 'hidden',
                                                                            display: 'block',
                                                                        }}
                                                                    >
                                                                        {ele.mb_nick}
                                                                    </Link>
                                                                </Typography>
                                                                <IconButton
                                                                    size="sm"
                                                                    variant="solid"
                                                                    color="neutral"
                                                                    sx={{ml: 'auto', bgcolor: 'rgba(0 0 0 / 0.2)'}}
                                                                >
                                                                    <CreateNewFolder/>
                                                                </IconButton>
                                                                <IconButton
                                                                    size="sm"
                                                                    variant="solid"
                                                                    color="neutral"
                                                                    sx={{bgcolor: 'rgba(0 0 0 / 0.2)'}}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                    }}
                                                                >
                                                                    <Favorite
                                                                        onClick={(e) => targetLikeHandler(e, ele._id)}
                                                                        style={{
                                                                            fill:
                                                                                ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                                                    ? "red"
                                                                                    : "white",
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Box>
                                                        </div>
                                                    </CardCover>
                                                </Box>
                                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                    <Avatar
                                                        src="https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff"
                                                        size="sm"
                                                        sx={{'--Avatar-size': '1.5rem'}}
                                                    />
                                                    <Typography sx={{fontSize: 'sm', fontWeight: 'md'}}>
                                                        {ele.mb_address}
                                                    </Typography>
                                                    <Chip
                                                        variant="outlined"
                                                        color="neutral"
                                                        size="sm"
                                                        sx={{
                                                            borderRadius: 'sm',
                                                            py: 0.25,
                                                            px: 0.5,
                                                        }}
                                                    >
                                                        profile
                                                    </Chip>
                                                    <Link
                                                        href="#dribbble-shot"
                                                        level="body-xs"
                                                        underline="none"
                                                        startDecorator={<Favorite/>}
                                                        sx={{
                                                            fontWeight: 'md',
                                                            ml: 'auto',
                                                            color: 'text.secondary',
                                                            '&:hover': {color: 'danger.plainColor'},
                                                        }}
                                                    >
                                                        {ele.mb_likes}
                                                    </Link>
                                                    <Link
                                                        href="#dribbble-shot"
                                                        level="body-xs"
                                                        underline="none"
                                                        startDecorator={<Visibility/>}
                                                        sx={{
                                                            fontWeight: 'md',
                                                            color: 'text.secondary',
                                                            '&:hover': {color: 'primary.plainColor'},
                                                        }}
                                                    >
                                                        {ele.mb_views}
                                                    </Link>
                                                </Box>
                                            </Card>
                                        );
                                    })}
                                </CssVarsProvider>
                            </Stack>
                        </Stack>
                    </div>
                    <Stack className={"bottom_box"}>
                        <img className={"line_img"} src={"/restaurant/icons_right.svg"} alt=""/>
                        <Pagination
                            count={targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3}
                            page={targetSearchObject.page}
                            renderItem={(item) => (
                                <PaginationItem components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }} sx={{color: "brown"}} {...item}
                                />
                            )}
                            onChange={handlePaginationChange}
                        />
                        <img className={"line_img_two"} src={"/restaurant/icons_right.svg"} alt=""/>
                    </Stack>
                    <Stack sx={{marginTop: "50px"}}>
                        {/*<Comments/>*/}
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
};

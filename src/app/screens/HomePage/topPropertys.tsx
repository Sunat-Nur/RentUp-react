import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import {Box, Container, Stack} from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {CssVarsProvider} from "@mui/joy/styles";
import {CardOverflow} from "@mui/joy";
import {IconButton} from '@mui/joy';
import {Favorite} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/joy/Typography';
// OTHERS
import {serverApi} from '../../../lib/config';
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiSservices/memberApiService";
import {useRef} from "react";
import {useHistory} from "react-router-dom";
// REDUX
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTopPropertys} from "./selector";
import {Member} from '../../../types/user';
import {verifiedMemberData} from "../../apiSservices/verify";
import {Product} from "../../../types/product";


/** REDUX SELECTOR */
const topPropertyRetriever = createSelector(
    retrieveTopPropertys,
    (topPropertys) => ({
        topPropertys,
    })
);

export function TopPropertys() {
    /** INITIALIZATION */
    const history = useHistory();
    const {topPropertys} = useSelector(topPropertyRetriever);
    console.log("topPropertys:::", topPropertys);
    const refs: any = useRef([]);

    /** HANDLERS */
    // const chosenProductHandler = (id: string) => {
    //     history.push(`/product/${id}`);
    // }
    // const targetLikeTop = async (e: any, id: string) => {
    //     try {
    //         assert.ok(verifiedMemberData, Definer.auth_err1);
    //         const memberService = new MemberApiService();
    //         const like_result: any = await memberService.memberLikeTarget({
    //             like_ref_id: id,
    //             group_type: "member",
    //         });
    //         assert.ok(like_result, Definer.general_err1);
    //
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

    return (
        <div className="top_property_frame">
            <Container>
                <Stack flexDirection={'column'} alignItems={'center'} sx={{mt: "45px"}}>
                    <Box className={'category_title'}>TOP Property</Box>
                    <Stack sx={{mt: "43px"}} flexDirection={'row'} m={"16px"}>
                        {topPropertys.map((ele: Product) => {
                            const image_path = `${serverApi}/${ele.product_images}`;
                            console.log("ele::::", ele);
                            return (
                                <CssVarsProvider key={ele._id}>
                                    <Card
                                        // onClick={() => chosenProductHandler(ele._id)}
                                        sx={{
                                            minHeight: 430,
                                            minWidth: 325,
                                            mr: "35px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <CardCover>
                                            <img src={image_path} loading="lazy"/>
                                        </CardCover>
                                        <CardCover
                                            sx={{background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',}}
                                        />
                                        <CardContent sx={{justifyContent: 'flex-end'}}>
                                            <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                                                {/*{ele.product_name}*/}
                                            </Typography>
                                            <Typography
                                                startDecorator={<LocationOnRoundedIcon/>}
                                                textColor="neutral.300">
                                                {/*{ele.product_address}*/}
                                            </Typography>
                                        </CardContent>
                                        <CardOverflow
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 1.5,
                                                py: 1.5,
                                                px: "var(--Card-padding)",
                                                borderTop: "1px solid",
                                            }}
                                        >
                                            <IconButton aria-label="Like minimal Photography"
                                                        size="md"
                                                        variant="solid"
                                                        color="neutral"
                                                        sx={{
                                                            position: "absolute",
                                                            zIndex: 2,
                                                            borderRadius: "50%",
                                                            right: "1rem",
                                                            bottom: 45,
                                                            transform: "translateY(50%)",
                                                            color: "rgba(0,0,0,.4)",
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}
                                            >
                                                <Favorite
                                                    // onClick={(e) => targetLikeTop(e, ele._id)}
                                                    style={{
                                                        fill:
                                                            ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                                ? "red"
                                                                : "white",
                                                    }}
                                                />
                                            </IconButton>
                                            <Typography
                                                level="body-sm"
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "1.5",
                                                    fontWeight: "md",
                                                    color: "neutral.300",
                                                    alignItems: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                {/*{ele.mb_views}*/}
                                                <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                            </Typography>
                                            <Box sx={{width: 2, bgcolor: "divider"}}/>
                                            <Typography
                                                sx={{
                                                    fontWeight: "md",
                                                    color: "neutral.300",
                                                    alignItems: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                <div ref={(element) => (refs.current[ele._id] = element)}>
                                                    {/*{ele.mb_likes}*/}
                                                </div>
                                                <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                            </Typography>
                                        </CardOverflow>
                                    </Card>
                                </CssVarsProvider>
                            )
                        })};
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
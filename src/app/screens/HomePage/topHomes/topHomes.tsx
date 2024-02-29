// OTHERS
import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
import "./residence.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import IconButton from '@mui/joy/IconButton';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {serverApi} from '../../../../lib/config';
import {useHistory} from "react-router-dom";

// REDUX
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTopHomes} from "../selector";
import {Product} from "../../../../types/product";
import {useEffect, useState} from "react";
import ProductApiService from "../../../apiSservices/productApiService";
import {Dispatch} from "@reduxjs/toolkit";
import { setTopHomes} from "../slice";
import {CssVarsProvider} from "@mui/joy/styles";
import assert from "assert";
import {verifiedMemberData} from "../../../apiSservices/verify";
import {Definer} from "../../../../lib/definer";
import MemberApiService from "../../../apiSservices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../../lib/sweetAlert";
import CardCover from "@mui/joy/CardCover";


/** REDUX SELECTOR */
const topHomesRetriever = createSelector(
    retrieveTopHomes,
    (topHomes) => ({
        topHomes,
    })
);


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
    setTopHomes: (data: Product[]) => dispach(setTopHomes(data)),
});


export function TopHomes(props: any) {
    /** INITIALIZATION */
    const history = useHistory();
    const {setTopHomes} = actionDispatch(useDispatch());
    const {topHomes} = useSelector(topHomesRetriever);
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    const chosenTopHomesHandler = () => {
        history.push("/company");
    }

    useEffect(() => {
        const productService = new ProductApiService();
        productService
            .getTopHomes({
                order: "createdAt",
                limit: 3,
                page: 1,
            })
            .then((data) => {
                console.log("data", data);

                setTopHomes(data);
            })
            .catch((err) => console.log(err));

    }, [productRebuild]);


    const targetLikeHandler = async (e: any, targetId: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: targetId,
                group_type: "product",
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
        <div className="top_property_frame" data-aos="zoom-in-right">
            <Container>
                <Stack className="top_property_main_box">
                    <Stack>
                        <Box className="top_home_definer">
                            <div data-aos="zoom-out-down">
                                <p>Top Properties</p>
                                <Box className="top_home_definer">
                                    <h2>Explore Elevated Living.</h2>
                                </Box>
                            </div>
                        </Box>
                        <Stack className="all_top_property_img_box" flexDirection={"row"} sx={{flexWrap: "wrap"}}>
                            <Box className="top_home_main_box">
                                {topHomes.map((ele: Product) => {
                                    const image_path = `${serverApi}/${ele.product_images[0]}`;
                                    return (
                                        <div data-aos="fade-left">
                                            <CssVarsProvider key={ele._id}>
                                                <Card
                                                    key={ele._id}
                                                    onClick={() => chosenTopHomesHandler()}
                                                    sx={{
                                                        minHeight: 430,
                                                        minWidth: 325,
                                                        mr: "55px",
                                                        ml: "25px",
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
                                                            {ele.product_name}
                                                        </Typography>
                                                        <Typography
                                                            startDecorator={<LocationOnRoundedIcon/>}
                                                            textColor="neutral.300">
                                                            {ele.product_address}
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
                                                                onClick={(e) => targetLikeHandler(e, ele._id)}
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
                                                            {ele.product_views}
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
                                                            <div>
                                                                {ele.product_likes}
                                                            </div>
                                                            <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                        </Typography>
                                                    </CardOverflow>
                                                </Card>
                                            </CssVarsProvider>
                                        </div>
                                    )
                                })}
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
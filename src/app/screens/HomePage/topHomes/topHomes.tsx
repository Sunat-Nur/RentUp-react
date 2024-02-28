import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
import "./residence.css"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
// OTHERS
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
import {Company} from "../../../../types/user";
import {setBestCompany, setTopHomes} from "../slice";
import {CssVarsProvider} from "@mui/joy/styles";
import assert from "assert";
import {verifiedMemberData} from "../../../apiSservices/verify";
import {Definer} from "../../../../lib/definer";
import MemberApiService from "../../../apiSservices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../../lib/sweetAlert";


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
                                        <Box className="top_property_box"
                                             key={ele._id}
                                             onClick={() => chosenTopHomesHandler()}
                                             // setProductRebuild={setProductRebuild}
                                             sx={{
                                                 cursor: "pointer",

                                             }}
                                        >
                                            <Stack flexDirection={"row"}>
                                                <Box className="property_img_box">
                                                    <img src={image_path}/>
                                                </Box>
                                            </Stack>
                                            <Box className="top_property_price">
                                                <span>{ele.product_price} $ / month </span>
                                                <text> {ele.product_name}</text>
                                            </Box>
                                            <Stack className={"top_property_location_box"} flexDirection={"row"}>
                                                <Box className="top_property_location">
                                                    <img src={"/icons/location.svg"}/>
                                                </Box>
                                                <Box>
                                                    <text> {ele.product_address}</text>
                                                </Box>
                                            </Stack>
                                            <Stack className={"top_property_icon_box"} flexDirection={"row"}>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/bed.svg"}/>
                                                    <text> {ele.product_value} room</text>
                                                </Box>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/bath.svg"}/>
                                                    <text> 2 bath</text>
                                                </Box>
                                                <Box className="top_property_each_icon">
                                                    <img src={"icons/kv.svg"}/>
                                                    <text> {ele.product_size} kv</text>
                                                </Box>

                                            </Stack>
                                            <Stack className={"favorite_box"} flexDirection={"row"}>
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontSize: "16px",
                                                        lineHeight: "1.5",
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex",
                                                        marginRight: "20px"
                                                    }}
                                                >
                                                    {ele.product_views}
                                                    <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>
                                                {/*<Box sx={{width: 2, bgcolor: "divider"}}/>*/}
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex"
                                                    }}>
                                                    <div
                                                        // ref={(element) => (refs.current[ele._id] = element)}
                                                    >
                                                        {ele.product_likes}
                                                    </div>
                                                    <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>
                                            </Stack>
                                        </Box>


                                        // <CssVarsProvider>
                                        //     <Card variant="outlined" sx={{width: 400, marginRight: "20px"}}>
                                        //         <CardOverflow>
                                        //             <AspectRatio ratio="1.1">
                                        //                 <Box className={"card_image_box"}
                                        //                      key={ele._id}
                                        //                      onClick={() => chosenTopHomesHandler()}
                                        //                 >
                                        //                     <img
                                        //
                                        //                         src={image_path}
                                        //                         loading="lazy"
                                        //                         alt=""
                                        //                     />
                                        //                 </Box>
                                        //             </AspectRatio>
                                        //             <IconButton
                                        //                 aria-label="Like minimal photography"
                                        //                 size="md"
                                        //                 variant="solid"
                                        //                 sx={{
                                        //                     position: 'absolute',
                                        //                     zIndex: 2,
                                        //                     borderRadius: '50%',
                                        //                     right: '1rem',
                                        //                     bottom: 0,
                                        //                     transform: 'translateY(50%)',
                                        //                 }}
                                        //             >
                                        //                 <Favorite
                                        //                     onClick={(e) => {
                                        //                         targetLikeHandler(e, ele._id);
                                        //                     }}
                                        //                     style={{
                                        //                         fill:
                                        //                             ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                        //                                 ? "red"
                                        //                                 : "white",
                                        //                     }}
                                        //
                                        //                 />
                                        //             </IconButton>
                                        //         </CardOverflow>
                                        //         <CardContent>
                                        //             <Typography level="title-md">
                                        //                 <Link href="#multiple-actions" overlay underline="none">
                                        //                     {ele.product_name} && {ele.product_collection}
                                        //                 </Link>
                                        //             </Typography>
                                        //             <Typography level="body-sm">
                                        //                 <Link
                                        //                     href="#multiple-actions">{ele.product_address} / {ele.product_price}$
                                        //                     month</Link>
                                        //             </Typography>
                                        //         </CardContent>
                                        //         <CardOverflow variant="soft">
                                        //             <Divider inset="context"/>
                                        //             <CardContent orientation="horizontal">
                                        //                 <Typography
                                        //                     level="body-xs">{ele.product_views} views</Typography>
                                        //                 <Divider orientation="vertical"/>
                                        //                 <Typography
                                        //                     level="body-xs">{ele.product_likes} likes</Typography>
                                        //             </CardContent>
                                        //         </CardOverflow>
                                        //     </Card>
                                        // </CssVarsProvider>
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
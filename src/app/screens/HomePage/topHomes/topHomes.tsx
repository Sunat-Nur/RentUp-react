import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
import "./residence.css"
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
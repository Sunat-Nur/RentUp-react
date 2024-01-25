import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
// OTHERS
import {serverApi} from '../../../lib/config';
import {useHistory} from "react-router-dom";
// REDUX
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveLuxuryProperty, retrieveTopHomes} from "./selector";
import {Product} from "../../../types/product";
import {setBestCompany, setLuxuryProperty, setTopHomes} from "./slice";
import {Dispatch} from "@reduxjs/toolkit";
import {Company} from "../../../types/user";
import {useEffect} from "react";
import ProductApiService from "../../apiSservices/productApiService";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
    setLuxuryProperty: (data: Product[]) => dispach(setLuxuryProperty(data)),
});

/** REDUX SELECTOR */
const luxuryPropertyRetriever = createSelector(
    retrieveLuxuryProperty,
    (luxuryProperty) => ({
        luxuryProperty,
    })
);


export function LuxuryProperty() {
    /** INITIALIZATION */
    const {setLuxuryProperty,} = actionDispatch(useDispatch());
    const history = useHistory();
    const {luxuryProperty} = useSelector(luxuryPropertyRetriever);

    useEffect(() => {
        const productService = new ProductApiService();
        productService.getAllProducts({order: "product_likes", page: 1, limit: 3})
            .then(data => setLuxuryProperty(data))
            .catch(err => console.log(err));

    }, []);

    const chosenluxuryProperty = (id: string) => {
        history.push(`/company/${id}`);
    }

    // const chosenDishHandler = (id: string) => {
    //     history.push(`/restaurant/dish/${id}`);
    // };


    return (
        <div className="recommendation_frame">
            <Container>
                <Stack className="recommendation_frame_rent">
                    <Stack className="recommendation_right_frame">
                        <Stack className="recommendation_frame_tex">
                            <Stack className="recommendation_frame_propperties">
                                <Box className="recom_text_right">
                                    <p> Green places</p>
                                </Box>
                                <Box className="recom_text_span">
                                    <span>
                                        Green Living: Eco-Friendly Properties
                                    </span>
                                </Box>
                                <Box className="recom_text_p">
                                    <p>
                                        Ut felis sem, placerat vel sollicitudin ut, mollis non dui. Donec vehicula
                                        scelerisque mauris facilis
                                    </p>
                                </Box>
                            </Stack>
                            <Stack sx={{flexDirection: "row"}}>
                                <Stack sx={{flexDirection: "column"}}>

                                    {luxuryProperty.map((ele: Product) => {
                                        const image_path = `${serverApi}/${ele.product_images[0]}`;
                                        return(
                                            <Box className="recom_first_box"
                                                 key={ele._id}
                                                 onClick={() => chosenluxuryProperty(ele._id)}
                                                 sx={{cursor: "pointer"}}

                                            >
                                                <Box className="recom_first_box_img" style={{flexDirection: "row"}}>
                                                    <img src={image_path}/>
                                                    <Box sx={{flexDirection: "row"}}>
                                                        <Box className="recom_first_box_name">
                                                            <p>{ele.product_name}</p>
                                                        </Box>
                                                        <Box className="recom_first_box_name">
                                                            <img src={"/icons/location.svg"}/> {ele.product_address}
                                                        </Box>
                                                        <Box className="recom_icons_box">
                                                            <Box className="bed_cont" sx={{ marginRight: "20px"}}>
                                                                <img src={"/icons/bed.svg"}/>
                                                                <text>{ele.product_value} room </text>
                                                            </Box>
                                                            <Box className="bed_cont" sx={{ marginRight: "20px"}}>
                                                                <img src={"/icons/bath.svg"}/>
                                                                <text>2 bath</text>
                                                            </Box>
                                                            <Box className="bed_cont">
                                                                <img src={"/icons/kv.svg"}/>
                                                                <text>{ele.product_size} kv</text>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        )
                                    })}
                                </Stack>
                                <Box className="recom_background_left_img">
                                    <img src={"/home/immio.jpg"}/>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack className="recommendation_frame_map">
                            <Box className="recommendation_frame_map_box">

                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}
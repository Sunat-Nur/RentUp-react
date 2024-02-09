import React, {useEffect, useState} from "react";
import {Box, Container, Stack} from "@mui/material";
import {CssVarsProvider} from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {Dispatch} from "@reduxjs/toolkit";
import {Product} from "../../../types/product";
import {setChosenMemberProduct} from "./slice";
import {createSelector} from "reselect";
import {retrieveChosenMemberProduct} from "./selector";
import {useHistory} from "react-router-dom";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMemberProduct: (data: Product[]) =>
        dispatch(setChosenMemberProduct(data)),
});


/** REDUX SELECTOR  */
const chosenMemberProductRetriever = createSelector(
    retrieveChosenMemberProduct,
    (chosenMemberProduct) => ({
        chosenMemberProduct,
    })
);



export function chosenMemberProduct(props: any) {
    /** HANDLERS */
    // const history = useHistory();



    return (
        <div className={"chosenMemberProduct_frame"}>
            <Container>
                <CssVarsProvider>
                    <Stack className={"user_property_box"} sx={{flexDirection: "column"}}>
                        <h4>Property</h4>
                        <Stack sx={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Card
                                sx={{minHeight: '280px', width: 320, marginRight: "20px"}}
                                // onClick={() => chosenProductHandler(ele._id)}
                            >
                                <CardCover>
                                    <img
                                        src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                                        srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </CardCover>
                                <CardCover
                                    sx={{
                                        background:
                                            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                    }}
                                />
                                <CardContent sx={{justifyContent: 'flex-end'}}>
                                    <Typography level="title-lg" textColor="#fff">
                                        Yosemite National Park
                                    </Typography>
                                    <Typography
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="neutral.300"
                                    >
                                        California, USA
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Stack>
                    </Stack>
                </CssVarsProvider>


            </Container>
        </div>
    )
}
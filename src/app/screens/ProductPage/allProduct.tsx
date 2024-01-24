import React, {useEffect, useRef, useState} from "react";
import {Container, Stack, Box, Avatar} from "@mui/material";
import Typography from "@mui/joy/Typography";
import {Favorite, Visibility} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Dispatch} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import {ProductSearchObj, SearchObj} from "../../../types/others";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import CompanyApiService from "../../apiSservices/companyApiService";
import {Product} from "../../../types/product";
import ProductApiService from "../../apiSservices/productApiService";
import {setChosenProduct, setTargetAllProducts} from "./slice";
import {retrieveChosenProduct, retrieveTargetAllProducts} from "./selector";
import assert from "assert";
import {verifiedMemberData} from "../../apiSservices/verify";
import {Definer} from "../../../lib/definer";
import MemberApiService from "../../apiSservices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import {serverApi} from "../../../lib/config";
import {BestCompany} from "../HomePage/bestCompany";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetAllProducts: (data: Product[]) => dispatch(setTargetAllProducts(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

/** REDUX SELECTOR */
const targetAllProductsRetriever = createSelector(
    retrieveTargetAllProducts,
    (targetAllProducts) => ({
        targetAllProducts,
    })
);

const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({
        chosenProduct,
    })
);


export function AllProductPage(props: any) {

    /** INITIALIZATIONS */
    const refs: any = useRef([]);
    const history = useHistory();

    let {company_id} = useParams<{ company_id: string }>();

    const {setTargetAllProducts,setChosenProduct} = actionDispatch(useDispatch())

    const {targetAllProducts} = useSelector(targetAllProductsRetriever);
    const {chosenProduct} = useSelector(chosenProductRetriever);


    const [targetProductsSearchObj, setTargetProductSearchObj] =
        useState<ProductSearchObj>({
            page: 1,
            limit: 8,
            order: "createdAt",
            company_mb_id: company_id,
            product_collection: "apartment",
        });

    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    useEffect(() => {

        const productService = new ProductApiService();
        productService.getAllProducts({order: "product_likes", page: 1, limit: 3})
            .then((data) => setTargetAllProducts(data))
            .catch((err) => console.log(err));
    }, [targetProductsSearchObj, productRebuild]);


    /** HANDLERS  */
    const searchCollectionHandler = (collection: string) => {
        targetProductsSearchObj.page = 1;
        targetProductsSearchObj.product_collection = collection;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };

    // const chosenUserHandler = (id: string) => {
    //     history.push(`/company/member_page/${id}`);
    // };


    const targetLikeProduct = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
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
        <div className="property_frame">
            <Container>
                <Stack className="property_fix_main_frame" sx={{flexDirection: "row"}}>
                    <Stack className="property_main_frame_middle">

                        <Box className="property_filter_main_middle" sx={{flexDirection: "row"}}>
                            <Button
                                className="property_type_box_middle"
                                variant={"contained"}
                                color="secondary"
                                sx={{fontWeight: 600, color: "#000", background: "#e3c08D"}}
                                onClick={() => searchCollectionHandler("Apartment")}
                            >
                                Apartment
                            </Button>
                            <Button
                                className="property_type_box_middle"
                                variant={"contained"}
                                color="secondary"
                                sx={{fontWeight: 600, color: "#000", background: "#e3c08D"}}
                                onClick={() => searchCollectionHandler("Villla")}
                            >
                                Villla
                            </Button>
                            <Button
                                className="property_type_box_middle"
                                variant={"contained"}
                                color="secondary"
                                sx={{fontWeight: 600, color: "#000", background: "#e3c08D"}}

                                onClick={() => searchCollectionHandler("Office")}
                            >
                                Office / Studio
                            </Button>

                            <Button className="property_type_box_middle"
                                    variant={"contained"}
                                    color="secondary"
                                    sx={{fontWeight: 600, color: "#000", background: "#e3c08D"}}
                                    onClick={() => searchCollectionHandler("House")}
                            >
                                Family House
                            </Button>
                            <Button className="property_type_box_middle"
                                    variant={"contained"}
                                    color="secondary"
                                    sx={{fontWeight: 600, color: "#000", background: "#e3c08D"}}
                                    onClick={() => searchCollectionHandler("etc")}
                            >
                                etc
                            </Button>
                        </Box>

                        <Stack className="all_top_property_img_box" flexDirection={"row"}
                               sx={{marginRight: "50px"}}>
                            <Stack className="property_left_filter" sx={{flexDirection: "column"}}>
                                <Box className="property_filter_main">
                                    {/*<Stack className={"dish_category_box"}>*/}
                                    {/*    <form>*/}

                                    {/*    </form>*/}
                                    {/*</Stack>*/}
                                </Box>
                            </Stack>


                            <Box className="top_home_main_box">
                                <Box className="top_property_box">



                                </Box>
                            </Box>
                        </Stack>


                        <Stack className="all_property_bottom_box" sx={{marginRight: "50px"}}>
                            <Stack className="agency_frame_box">
                                <BestCompany/>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
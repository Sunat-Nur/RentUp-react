import React, {useEffect, useRef, useState} from "react";
import {Container, Stack, Box, FormControl, MenuItem, Select} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {CssVarsProvider} from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";
import {Bed, Favorite, FormatSize, Home, Visibility} from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {PaginationItem} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import {setTargetAllProducts} from "./slice";
import assert from "assert";

/** REDUX  */
import {retrieveTargetAllProducts} from "./selector";
import {ProductSearchObj, SearchObj,} from "../../../types/others";
import {Dispatch} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import ProductApiService from "../../apiSservices/productApiService";
import MemberApiService from "../../apiSservices/memberApiService";
import {verifiedMemberData} from "../../apiSservices/verify";
import {Product} from "../../../types/product";
import {useHistory, useParams,} from "react-router-dom";

/** Others */
import {Definer} from "../../../lib/definer";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import {serverApi} from "../../../lib/config";
import {BestCompany} from "../HomePage/bestCompany";
import {Posts} from "../HomePage/posts";
import {SwiperSlide} from "swiper/react";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetAllProducts: (data: Product[]) => dispatch(setTargetAllProducts(data)),
});

/** REDUX SELECTOR */
const targetAllProductsRetriever = createSelector(
    retrieveTargetAllProducts,
    (targetAllProducts) => ({
        targetAllProducts,
    })
);

export function AllProductPage(props: any) {
    /** INITIALIZATIONS */
    let {company_id} = useParams<{ company_id: string }>();
    const {setTargetAllProducts} = actionDispatch(useDispatch());
    const {targetAllProducts} = useSelector(targetAllProductsRetriever);
    const [targetSearchObject, setTartgetSearchObject] = useState<SearchObj>({
        page: 1,
        limit: 8,
        order: "mb_point",
    });


    const [targetProductsSearchObj, setTargetProductSearchObj] =
        useState<ProductSearchObj>({
            page: 1,
            limit: 4,
            order: "createdAt",
            company_mb_id: company_id,
            product_collection: "office",
        });
    const refs: any = useRef([]);
    const history = useHistory();

    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    useEffect(() => {
        const productService = new ProductApiService();
        productService
            .getAllProducts(targetSearchObject)
            .then((data) => setTargetAllProducts(data))
            .catch((err) => console.log(err));
    }, [targetProductsSearchObj, productRebuild, targetSearchObject]);


    /** HANDLERS  */
    const searchCollectionHandler = (collection: string) => {
        targetProductsSearchObj.page = 1;
        targetProductsSearchObj.product_collection = collection;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };
    const handlePaginationChange = (event: any, value: number) => {
        targetProductsSearchObj.page = value;
        setTartgetSearchObject({...targetSearchObject});
    };


    const chosenProductHandler = (id: string) => {
        history.push(`/company/products/${id}`);
    };

    const targetLikeHandler = async (e: any, id: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "product",
            });
            assert.ok(like_result, Definer.general_err1);
            if (like_result.like_status > 0) {
                e.target.style.fill = "red";
                refs.current[like_result.like_ref_id].innerHTML++;
            } else {
                e.target.style.fill = "white"
                refs.current[like_result.like_ref_id].innerHTML--;
            }
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log("targetLikeTop, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };


    return (
        <div className="all_property_frame">
            <Container>
                <Stack className="allProduct_main">
                    <Stack className="allProduct_hearder">
                        <Stack className="allProduct_type_button">
                            <Box className="property_filter_main_middle" sx={{flexDirection: "row"}}>
                                <Button
                                    className="property_type_box_middle"
                                    variant={"contained"}
                                    color="secondary"
                                    sx={{fontWeight: 600, color: "#000", background: "#e3c08D", marginRight: "25px"}}
                                    onClick={() => searchCollectionHandler("Apartment")}
                                >
                                    Apartment
                                </Button>
                                <Button
                                    className="property_type_box_middle"
                                    variant={"contained"}
                                    color="secondary"
                                    sx={{fontWeight: 600, color: "#000", background: "#e3c08D", marginRight: "25px"}}
                                    onClick={() => searchCollectionHandler("House")}
                                >
                                    House
                                </Button>
                                <Button
                                    className="property_type_box_middle"
                                    variant={"contained"}
                                    color="secondary"
                                    sx={{fontWeight: 600, color: "#000", background: "#e3c08D", marginRight: "25px"}}
                                    onClick={() => searchCollectionHandler("Office")}
                                >
                                    Office
                                </Button>

                                <Button className="property_type_box_middle"
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            background: "#e3c08D",
                                            marginRight: "25px"
                                        }}
                                        onClick={() => searchCollectionHandler("Villa")}
                                >
                                    Villa
                                </Button>
                                <Button className="property_type_box_middle"
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            background: "#e3c08D",
                                            marginRight: "25px"
                                        }}
                                        onClick={() => searchCollectionHandler("studio")}
                                >
                                    studio
                                </Button>
                            </Box>
                        </Stack>
                        <Stack className="allProduct_search_part" >
                            <Stack className="allProduct_each_box" sx={{ flexDirection: 'row', justifyContent: "space-between"}}>
                                <FormControl sx={{width: "259px", background: "white", }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >
                                        <MenuItem value="">Categoryni tanalang</MenuItem>
                                        <MenuItem value={"celebrity"}>Apartment</MenuItem>
                                        <MenuItem value={"evaluation"}>Office</MenuItem>
                                        <MenuItem value={"story"}>Villa</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{width: "259px", background: "white", }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >
                                        <MenuItem value="">Categoryni tanalang</MenuItem>
                                        <MenuItem value={"celebrity"}>Tashkent</MenuItem>
                                        <MenuItem value={"evaluation"}>Surkhandaryo</MenuItem>
                                        <MenuItem value={"story"}>Xorazm</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{width: "159px", background: "white", }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >
                                        <MenuItem value="">1</MenuItem>
                                        <MenuItem value={"celebrity"}>2</MenuItem>
                                        <MenuItem value={"evaluation"}>3</MenuItem>
                                        <MenuItem value={"story"}>4</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button sx={{ width: "120px", color: "#fff", background: "green"}}> search</Button>
                            </Stack>

                        </Stack>
                    </Stack>

                    <Stack className="allProduct_middle">
                        {/* <Stack className="allProduct_middle_left"></Stack> */}
                        <Stack className="allProduct_middle_middle" sx={{flexDirection: "row"}}>
                            {targetAllProducts.map((ele: Product) => {
                                const image_path = `${serverApi}/${ele.product_images[0]}`;
                                return (
                                    <CssVarsProvider>
                                        <Card
                                            // onClick={() => targetLikeProduct(ele._id)}
                                            onClick={() => chosenProductHandler(ele._id)}
                                            className={"dish_box"} key={ele._id}
                                            variant="outlined"
                                            sx={{
                                                minHeight: 456,
                                                minWidth: 320,
                                                mr: "35px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <CardOverflow>
                                                <AspectRatio ratio="1">
                                                    {/*<SwiperSlide style={{ height: "456px", display: "flex"}}>*/}
                                                    <img src={image_path} alt=""/>
                                                    {/*</SwiperSlide>*/}
                                                </AspectRatio>
                                                <IconButton aria-label="Like minimal Photography"
                                                            size="md"
                                                            variant="solid"
                                                            color="neutral"
                                                            sx={{
                                                                position: "absolute",
                                                                zIndex: 2,
                                                                borderRadius: "50%",
                                                                right: "1rem",
                                                                bottom: 1,
                                                                transform: "translateY(50%)",
                                                                color: "rgba(0,0,0,.4)",
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                            }}
                                                >
                                                    <Favorite
                                                        onClick={(e) => {
                                                            targetLikeHandler(e, ele._id);
                                                        }}
                                                        style={{
                                                            fill:
                                                                ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                                    ? "red"
                                                                    : "white",
                                                        }}
                                                    />


                                                </IconButton>
                                            </CardOverflow>
                                            {/*<Typography level="h2" sx={{fontSize: "md", mt: 0.1}}>*/}
                                            {/*    {ele.product_name}*/}
                                            {/*</Typography>*/}
                                            <Typography level="body-sm" sx={{mt: 0.5, mb: 0.1}}>
                                                <Link href="" startDecorator={<LocationOnRoundedIcon/>}
                                                      textColor="neutral.700">
                                                    {ele.product_address}
                                                </Link>
                                            </Typography>
                                            <Typography level="body-sm" sx={{mt: 0.5, mb: 0.1}}>
                                                <Link href="" startDecorator={<Home/>} textColor="neutral.700"
                                                      sx={{mr: "30px"}}>
                                                    {ele.product_collection}
                                                </Link>
                                                <Link href="" startDecorator={<Bed/>} textColor="neutral.700"
                                                      sx={{mr: "30px"}}>
                                                    {ele.product_value}
                                                </Link>
                                                <Link href="" startDecorator={<FormatSize/>} textColor="neutral.700">
                                                    {ele.product_size} kv
                                                </Link>
                                            </Typography>
                                            <CardOverflow
                                                variant="soft"
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: 1.5,
                                                    py: 1.5,
                                                    px: "var(--Card-padding)",
                                                    borderTop: "1px solid",
                                                    borderColor: "neutral.outlinedBorder",
                                                    bgcolor: "background.level1",
                                                }}
                                            >
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontSize: "16px",
                                                        lineHeight: "1.5",
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex",
                                                    }}
                                                >
                                                    {ele.product_views}
                                                    <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>
                                                <Box sx={{width: 2, bgcolor: "divider"}}/>
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        fontWeight: "md",
                                                        color: "black",
                                                        alignItems: "center",
                                                        display: "flex"
                                                    }}>
                                                    <div
                                                        ref={(element) => (refs.current[ele._id] = element)}
                                                    >
                                                        {ele.product_likes}
                                                    </div>
                                                    <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                                </Typography>

                                            </CardOverflow>
                                        </Card>
                                    </CssVarsProvider>
                                )
                            })}
                        </Stack>


                    </Stack>
                    <Stack className="allProduct_bottom">
                        <Pagination
                            count={targetProductsSearchObj.page >= 3 ? targetProductsSearchObj.page + 1 : 3}
                            page={targetProductsSearchObj.page}
                            renderItem={(item) => (
                                <PaginationItem components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }} sx={{color: "brown"}} {...item}
                                />
                            )}
                            onChange={handlePaginationChange}
                        />
                    </Stack>
                    <Stack className="allProduct_bottom_main">
                        <Posts/>
                        <BestCompany/>
                    </Stack>
                </Stack>

            </Container>
        </div>
    );
}
import React, {useEffect, useRef, useState} from "react";
import {Container, Stack, Box, FormControl, MenuItem, Select} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {CssVarsProvider} from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";
import {Favorite} from "@mui/icons-material";
import CardContent from '@mui/joy/CardContent';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import {PaginationItem} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Avatar from '@mui/joy/Avatar';
import Button from "@mui/material/Button";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../../lib/sweetAlert";
import {setTargetAllProducts} from "../slice";
import ProductBanner from "../ProductBanner";
import assert from "assert";
import {useCombinedContext} from "../../../../context/useCombinedContext";
import Slider, {sliderClasses} from '@mui/joy/Slider';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CardCover from '@mui/joy/CardCover';

/** REDUX  */
import {retrieveTargetAllProducts} from "../selector";
import {ProductSearchObj,} from "../../../../types/others";
import {Dispatch} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import ProductApiService from "../../../apiSservices/productApiService";
import MemberApiService from "../../../apiSservices/memberApiService";
import {verifiedMemberData} from "../../../apiSservices/verify";
import {Product} from "../../../../types/product";
import {useHistory, useParams,} from "react-router-dom";

/** Others */
import {Definer} from "../../../../lib/definer";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import {serverApi} from "../../../../lib/config";
import {BestCompany} from "../../HomePage/bestCompany";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


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
    const refs: any = useRef([]);
    const history = useHistory();
    const {setTargetAllProducts} = actionDispatch(useDispatch());
    const {targetAllProducts} = useSelector(targetAllProductsRetriever);
    // const {filter, handleChangeCategory} = useCombinedContext();
    const [targetProductsSearchObj, setTargetProductSearchObj] = useState<ProductSearchObj>({
        page: 1,
        limit: 8,
        order: "createdAt",
        product_collection: "office",
    });

    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    useEffect(() => {
        const productService = new ProductApiService();
        productService
            .getAllProducts(targetProductsSearchObj)
            .then((data) => setTargetAllProducts(data))
            .catch((err) => console.log(err));

    }, [productRebuild, targetProductsSearchObj,]);


    /** HANDLERS  */
    const searchCollectionHandler = (collection: string) => {
        targetProductsSearchObj.page = 1;
        targetProductsSearchObj.product_collection = collection;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };
    const handlePaginationChange = (event: any, value: number) => {
        targetProductsSearchObj.page = value;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };


    const chosenProductHandler = (id: string) => {
        history.push(`/company/products/${id}`);
    };

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
        <div className="all_property_frame" style={{flexDirection: "column"}}>
            <ProductBanner/>
            <Container>
                <Stack className="allProduct_main" sx={{marginTop: "100px"}}>
                    <Stack className="allProduct_hearder">
                        <div data-aos="flip-down">
                            <Stack className="allProduct_type_button">
                                <Box className="property_filter_main_middle" sx={{flexDirection: "row"}}>
                                    <Button
                                        className="property_type_box_middle"
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            background: "#fff",
                                            marginRight: "30px",
                                            borderRadius: "50px"
                                        }}
                                        // onClick={() => handleChangeCategory("", "Apartment")}
                                    >
                                        Apartment
                                    </Button>
                                    <Button
                                        className="property_type_box_middle"
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            background: "#fff",
                                            marginRight: "30px",
                                            borderRadius: "50px",
                                        }}
                                        // onClick={() => searchCollectionHandler("", "House")}
                                    >
                                        House
                                    </Button>
                                    <Button
                                        className="property_type_box_middle"
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            background: "#fff",
                                            marginRight: "30px",
                                            borderRadius: "50px",
                                        }}
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
                                                background: "#fff",
                                                marginRight: "30px",
                                                borderRadius: "50px",
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
                                                background: "#fff",
                                                marginRight: "30px",
                                                borderRadius: "50px"
                                            }}
                                            onClick={() => searchCollectionHandler("Studio")}
                                    >
                                        studio
                                    </Button>
                                </Box>
                            </Stack>
                        </div>
                    </Stack>
                    <Stack className="allProduct_middle" sx={{flexDirection: "row"}}>
                        <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                            {/*<Stack className="allProduct_middle_left">*/}
                            {/*    <FormControl*/}
                            {/*        className={"form_box"}*/}
                            {/*        sx={{*/}
                            {/*            width: "200px",*/}
                            {/*            background: "white",*/}
                            {/*            marginBottom: "30px"*/}
                            {/*        }}>*/}
                            {/*        <Select*/}
                            {/*            // value={communityArticleData?.bo_id}*/}
                            {/*            displayEmpty*/}
                            {/*            inputProps={{"aria-label": "Without label"}}*/}
                            {/*            // onChange={changeCategoryHandler}*/}
                            {/*        >*/}
                            {/*            <MenuItem value="">chose type</MenuItem>*/}
                            {/*            <MenuItem value={"House"}>House</MenuItem>*/}
                            {/*            <MenuItem value={"Office"}>Office</MenuItem>*/}
                            {/*            <MenuItem value={"Villa"}>Villa</MenuItem>*/}
                            {/*            <MenuItem value={"studio"}>Studio</MenuItem>*/}
                            {/*            <MenuItem value={"etc"}>etc</MenuItem>*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*    <FormControl*/}
                            {/*        className={"form_box"}*/}
                            {/*        sx={{*/}
                            {/*            width: "200px",*/}
                            {/*            background: "white",*/}
                            {/*            marginBottom: "30px"*/}
                            {/*        }}>*/}
                            {/*        <Select*/}
                            {/*            // value={communityArticleData?.bo_id}*/}
                            {/*            displayEmpty*/}
                            {/*            inputProps={{"aria-label": "Without label"}}*/}
                            {/*            // onChange={changeCategoryHandler}*/}
                            {/*        >*/}
                            {/*            <MenuItem value="">chose address</MenuItem>*/}
                            {/*            <MenuItem value={"tashkent"}>Tashkent</MenuItem>*/}
                            {/*            <MenuItem value={"samarkand"}>Samarkand</MenuItem>*/}
                            {/*            <MenuItem value={"bukhara"}>Bukhara</MenuItem>*/}
                            {/*            <MenuItem value={"xoramz"}>Xoramz</MenuItem>*/}
                            {/*            <MenuItem value={"andijan"}>Andijan</MenuItem>*/}
                            {/*            <MenuItem value={"surkhandaryo"}>Surkhandaryo</MenuItem>*/}
                            {/*            <MenuItem value={"qarshi"}>Qarshi</MenuItem>*/}
                            {/*            <MenuItem value={"navoiy"}>Navoiy</MenuItem>*/}
                            {/*            <MenuItem value={"namamgan"}>Namamgan</MenuItem>*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*    <FormControl*/}
                            {/*        className={"form_box"}*/}
                            {/*        sx={{*/}
                            {/*            width: "200px",*/}
                            {/*            background: "white",*/}
                            {/*            marginBottom: "30px"*/}
                            {/*        }}>*/}
                            {/*        <Select*/}
                            {/*            // value={communityArticleData?.bo_id}*/}
                            {/*            displayEmpty*/}
                            {/*            inputProps={{"aria-label": "Without label"}}*/}
                            {/*            // onChange={changeCategoryHandler}*/}
                            {/*        >*/}

                            {/*            <MenuItem value="">chose room</MenuItem>*/}
                            {/*            <MenuItem value={"1"}>1 room</MenuItem>*/}
                            {/*            <MenuItem value={"2"}>2 rooms</MenuItem>*/}
                            {/*            <MenuItem value={"3"}>3 rooms</MenuItem>*/}
                            {/*            <MenuItem value={"4"}>4 rooms</MenuItem>*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*    <Box>*/}
                            {/*        <CssVarsProvider>*/}
                            {/*            <a> size of property</a>*/}
                            {/*            <Box sx={{width: 180, marginTop: "30px", marginBottom: "30px"}}>*/}
                            {/*                <Slider*/}
                            {/*                    track={false}*/}
                            {/*                    defaultValue={[0, 200]}*/}
                            {/*                    getAriaLabel={() => 'Amount'}*/}
                            {/*                    // getAriaValueText={valueText}*/}
                            {/*                    marks={[*/}
                            {/*                        {*/}
                            {/*                            value: 0,*/}
                            {/*                            label: '0 sqft',*/}
                            {/*                        },*/}
                            {/*                        {*/}
                            {/*                            value: 100,*/}
                            {/*                            label: '100 sqft',*/}
                            {/*                        },*/}
                            {/*                    ]}*/}
                            {/*                    valueLabelDisplay="on"*/}
                            {/*                    sx={{*/}
                            {/*                        // Need both of the selectors to make it works on the server-side and client-side*/}
                            {/*                        [`& [style*="left:0%"], & [style*="left: 0%"]`]: {*/}
                            {/*                            [`&.${sliderClasses.markLabel}`]: {*/}
                            {/*                                transform: 'none',*/}
                            {/*                            },*/}
                            {/*                            [`& .${sliderClasses.valueLabel}`]: {*/}
                            {/*                                left: 'calc(var(--Slider-thumbSize) / 2)',*/}
                            {/*                                borderBottomLeftRadius: 0,*/}
                            {/*                                '&::before': {*/}
                            {/*                                    left: 0,*/}
                            {/*                                    transform: 'translateY(100%)',*/}
                            {/*                                    borderLeftColor: 'currentColor',*/}
                            {/*                                },*/}
                            {/*                            },*/}
                            {/*                        },*/}
                            {/*                        [`& [style*="left:100%"], & [style*="left: 100%"]`]: {*/}
                            {/*                            [`&.${sliderClasses.markLabel}`]: {*/}
                            {/*                                transform: 'translateX(-100%)',*/}
                            {/*                            },*/}
                            {/*                            [`& .${sliderClasses.valueLabel}`]: {*/}
                            {/*                                right: 'calc(var(--Slider-thumbSize) / 2)',*/}
                            {/*                                borderBottomRightRadius: 0,*/}
                            {/*                                '&::before': {*/}
                            {/*                                    left: 'initial',*/}
                            {/*                                    right: 0,*/}
                            {/*                                    transform: 'translateY(100%)',*/}
                            {/*                                    borderRightColor: 'currentColor',*/}
                            {/*                                },*/}
                            {/*                            },*/}
                            {/*                        },*/}
                            {/*                    }}*/}
                            {/*                />*/}
                            {/*            </Box>*/}
                            {/*        </CssVarsProvider>*/}
                            {/*    </Box>*/}
                            {/*    <Button sx={{width: "120px", color: "#fff", background: "green"}}> search</Button>*/}
                            {/*</Stack>*/}
                        </div>

                        <div data-aos="fade-left"
                             data-aos-anchor="#example-anchor"
                             data-aos-offset="500"
                             data-aos-duration="500">

                            <Stack className="allProduct_middle_middle" sx={{flexDirection: "row"}}>
                                {targetAllProducts.map((ele: Product) => {
                                    const image_path = `${serverApi}/${ele.product_images[0]}`;
                                    return (
                                        <CssVarsProvider>
                                            <Card sx={{ minHeight: '380px', width: 350, marginRight: "20px", cursor: "pointer", marginBottom: "30px" }}
                                                      onClick={() => chosenProductHandler(ele._id)}
                                            >
                                                <CardCover>
                                                    <img
                                                        src={image_path}
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
                                                <CardContent sx={{ justifyContent: 'flex-end' }}>
                                                    <Typography level="title-lg" textColor="#fff">
                                                        {ele.product_collection}
                                                    </Typography>
                                                    <Typography
                                                        startDecorator={<LocationOnRoundedIcon />}
                                                        textColor="neutral.300"
                                                    >
                                                        {ele.product_address}    {ele.product_price}$ /month
                                                    </Typography>
                                                    <Stack flexDirection={"row"}>
                                                    <Typography
                                                        startDecorator={<Favorite />}
                                                        textColor="neutral.300"
                                                    >
                                                        {ele.product_likes}__
                                                    </Typography>
                                                    <Typography
                                                        startDecorator={<RemoveRedEyeIcon />}
                                                        textColor="neutral.300"
                                                    >
                                                         {ele.product_views}
                                                    </Typography>
                                                    </Stack>
                                                </CardContent>
                                            </Card>



                                        </CssVarsProvider>
                                    )
                                })}
                            </Stack>
                        </div>
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
                    <Stack className="allProduct_bottom_main" sx={{marginTop: "150px"}}>
                        {/*<Posts/>*/}
                        <BestCompany/>
                    </Stack>
                </Stack>

            </Container>
        </div>
    );
}
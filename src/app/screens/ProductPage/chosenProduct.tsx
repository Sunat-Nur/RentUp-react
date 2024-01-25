import React, {useEffect, useRef, useState} from "react";
import {Box, Container, Stack} from "@mui/system";
import {Swiper, SwiperSlide} from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs} from "swiper";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import {useHistory, useParams} from "react-router-dom";
import {Product} from "../../../types/product";

// REDUX
import {createSelector} from "reselect";
import {retrieveChosenProduct, retrieveChosenCompany} from "./selector";
import {Company} from '../../../types/user';
import {Dispatch} from "@reduxjs/toolkit";
import {setChosenProduct, setChosenCompany} from "./slice";
import {useDispatch, useSelector} from "react-redux";
import ProductApiService from "../../apiSservices/productApiService";
import CompanyApiService from "../../apiSservices/companyApiService";
import {serverApi} from "../../../lib/config";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import MemberApiService from "../../apiSservices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import {verifiedMemberData} from "../../apiSservices/verify";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setChosenCompany: (data: Company) => dispatch(setChosenCompany(data)),
});

/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({
        chosenProduct,
    })
);

const chosenCompanyRetriever = createSelector(
    retrieveChosenCompany,
    (chosenCompany) => ({
        chosenCompany,
    })
);

const chosen_list = Array.from(Array(3).keys());

export function ChosenProductPage(props: any) {

    /** INITIALIZATIONS */
    let {product_id} = useParams<{ product_id: string }>();

    const {setChosenProduct, setChosenCompany,} = actionDispatch(useDispatch());
    const {chosenProduct} = useSelector(chosenProductRetriever);
    const {chosenCompany} = useSelector(chosenCompanyRetriever);
    const label = {inputProps: {"aria-label": "Checkbox demo"}};
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    const productRelatedProcess = async () => {
        try {
            const productService = new ProductApiService();

            const product: Product = await productService.getChosenProduct(product_id);
            setChosenProduct(product);
            const companyApiService = new CompanyApiService();
            const company = await companyApiService.getChosenCompany(
                product.company_mb_id
            );
            console.log("company", company);
            setChosenCompany(company);
        } catch (err) {
            console.log(`dishRelatedProcess, ERROR:  `, err);
        }
    };

    useEffect(() => {
        productRelatedProcess().then();
    }, [productRebuild]);

    /** HANDLERS  */
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
        <div className="chosen_dish_page">
            <Container className="dish_container" sx={{flexDirection: "column"}}>
                <Stack sx={{flexDirection: "row"}}>
                    <Stack className="chosen_dish_slider">
                        <Swiper
                            className="dish_swiper"
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                        >
                            {chosenProduct?.product_images.map((ele: string) => {
                                const image_path = `${serverApi}/${ele}`
                                return (
                                    <SwiperSlide>
                                        <img style={{width: "100%", height: "100%"}} src={image_path}/>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <Swiper
                            className="dish_swiper_second"
                            loop={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            spaceBetween={25}
                            navigation={{
                                nextEl: null,
                            }}
                            slidesPerView={3}
                            modules={[FreeMode, Navigation, Thumbs]}
                        >
                            {chosenProduct?.product_images.map((ele: string) => {
                                const image_path = `${serverApi}/${ele}`
                                return (
                                    <SwiperSlide style={{height: "107px", display: "flex"}}>
                                        <img style={{width: "100%", height: "100%"}} src={image_path}/>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Stack>
                    <Stack className={"chosen_dish_info_container"}>
                        <Box className={"chosen_dish_info_box"}>
                            <Box className={"logo_box"}>
                                <img src={"/icons/logo.png"}/>
                            </Box>
                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> type: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_collection}</span>
                            </Box>
                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> room: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_value}</span>
                            </Box>
                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> home-size: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_size} mk</span>
                            </Box>
                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> address: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_address}</span>
                            </Box>

                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> monthly rent: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_price} $</span>
                            </Box>

                            <Box className={"location_icon"} flexDirection={"row"}>
                                <a> name of building: </a>
                                <span className={"dish_text"}>{chosenProduct?.product_name}</span>
                            </Box>

                            <Box className={"rating_box"}>
                                <Rating name="half_rating" defaultValue={3.5} precision={0.5}
                                        style={{fontSize: "30px"}}/>
                                <div className={"evaluation_box"}>
                                    <div style={{display: "flex", alignItems: "center", marginRight: "20px",}}>
                                        <Checkbox
                                            {...label}
                                            icon={<FavoriteBorder/>}
                                            checkedIcon={<Favorite style={{color: "red"}}/>}
                                            id={chosenProduct?._id}
                                            onClick={targetLikeProduct}
                                            checked={!!chosenProduct?.me_liked[0]?.my_favorite
                                            }
                                        />
                                        <span>{chosenProduct?.product_likes}</span>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <RemoveRedEyeIcon sx={{mr: "10px"}}/>
                                        <span>{chosenProduct?.product_views}</span>
                                    </div>
                                </div>
                            </Box>
                            <Marginer
                                direction="horizontal"
                                height="1"
                                width="100%"
                                bg="#000000"
                            />
                            <div className={"button_box"}>
                                <Button variant="contained" sx={{background: "blue"}}
                                        onClick={() => {
                                            props.onAdd(chosenProduct)
                                        }}
                                >
                                    add favorite</Button>
                            </div>
                        </Box>
                    </Stack>
                </Stack>
                <Stack className={"property_description"}>
                    <Stack className={"property_post_box"} sx={{flexDirection: "column"}}>

                        <Box className={"description_main_box"}>
                            <h4>Home about</h4>
                            <p>{chosenProduct?.product_description}</p>
                        </Box>
                        <h1>what do People think about property?</h1>
                        <Box className={"chosenProperty_post"}>
                            <text>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less norma
                            </text>
                            <Box className={"post_data"} sx={{flexDirection: "row"}}>
                                <img src={"/auth/odamcha.svg"}/>
                                <a>{chosenCompany?.mb_nick}</a>
                            </Box>
                        </Box>
                        <Box className={"chosenProperty_post"}>
                            <text>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less norma
                            </text>
                            <Box className={"post_data"} sx={{flexDirection: "row"}}>
                                <img src={"/auth/odamcha.svg"}/>
                                <a>{chosenCompany?.mb_nick}</a>
                            </Box>
                        </Box>
                        <Box className={"chosenProperty_post"}>
                            <text>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less norma
                            </text>
                            <Box className={"post_data"} sx={{flexDirection: "row"}}>
                                <img src={"/auth/odamcha.svg"}/>
                                <a>{chosenCompany?.mb_nick}</a>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack className={"chosenProperty_chat"}></Stack>
                    <Stack
                        sx={{mt: "60px"}}
                        style={{display: "flex", flexDirection: "column", alignItems: "center",}}
                    >
                        <Box className={"category_title"}>
                        <h1> Address</h1>
                        </Box>
                        <iframe
                            style={{marginTop: "10px",}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.242382150278!2d127.05066999999998!3d37.58379085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2sDongdaemun-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1700545060503!5m2!1sen!2skr"
                            width="1300"
                            height="500"
                        ></iframe>
                    </Stack>


                </Stack>
            </Container>
        </div>
    );
}
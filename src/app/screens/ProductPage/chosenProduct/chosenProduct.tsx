import React, { useEffect, useState} from "react";
import {Box, Container, Stack} from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {Favorite, FavoriteBorder,} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import {useHistory, useParams} from "react-router-dom";
import {Product} from "../../../../types/product";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import "keen-slider/keen-slider.min.css"
import "./style.css";
import {useKeenSlider, KeenSliderPlugin, KeenSliderInstance,} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Marginer from "../../../components/marginer";


// REDUX
import {createSelector} from "reselect";
import {retrieveChosenProduct, retrieveChosenCompany, retrieveComments} from "../selector";
import {Company} from '../../../../types/user';
import {Dispatch} from "@reduxjs/toolkit";

import {setChosenProduct, setChosenCompany, setComments} from "../slice";
import {useDispatch, useSelector} from "react-redux";
import ProductApiService from "../../../apiSservices/productApiService";
import CompanyApiService from "../../../apiSservices/companyApiService";
import {serverApi} from "../../../../lib/config";
import assert from "assert";
import {Definer} from "../../../../lib/definer";
import MemberApiService from "../../../apiSservices/memberApiService";
import CommentApiService from "../../../apiSservices/commentApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../../lib/sweetAlert";
import {verifiedMemberData} from "../../../apiSservices/verify";
import IconButton from "@mui/joy/IconButton";
import {CssVarsProvider} from "@mui/joy/styles";
import CommentExampleComment from "../../../components/Comment/Comment";
import {CommentReply} from "../../../../types/others";
import {Comment} from "../../../../types/others";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setChosenCompany: (data: Company) => dispatch(setChosenCompany(data)),
    setComments: (data: Comment[]) => dispatch(setComments(data))
});


/** REDUX SELECTOR */
const commentsRetriever = createSelector(
    retrieveComments,
    (comments) => ({
        comments,
    })
);

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


function ThumbnailPlugin(
    mainRef: React.MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}

interface AppProps {
    chosenProduct: { product_images: string[] };
}


// const chosen_list = Array.from(Array(3).keys());

export function ChosenProductPage(props: any) {

    /** INITIALIZATIONS */
    let {product_id} = useParams<{ product_id: string }>();
    console.log("product_id:::", product_id);
    const history = useHistory();
    const {setChosenProduct, setChosenCompany, setComments} = actionDispatch(useDispatch());


    const {chosenProduct} = useSelector(chosenProductRetriever);
    const {chosenCompany} = useSelector(chosenCompanyRetriever);
    const {comments} = useSelector(commentsRetriever);
    const label = {inputProps: {"aria-label": "Checkbox demo"}};
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());



    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    });
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    );

    const productRelatedProcess = async () => {
        try {
            const companyApiService = new CompanyApiService();
            const productService = new ProductApiService();
            const product: Product = await productService.getChosenProduct(product_id);
            setChosenProduct(product);
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
        const commentService = new CommentApiService();
        commentService.getAllComments(product_id)
            .then((data) => {
                setComments(data);
            })
            .catch((err) => console.log(err));
        productRelatedProcess().then();
    }, [productRebuild]);


    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    };


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
            <Container className="dish_container">
                <Stack sx={{flexDirection: "column"}}>
                    <div data-aos="fade-down">
                        <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            style={{height: "236px"}}
                        >
                            <Stack className="static_box">
                                <Box className="static_num">Name</Box>
                                <Box className="static_text" style={{ color: "#0044bb"}}>{chosenProduct?.product_name}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_num">Type</Box>
                                <Box className="static_text" style={{ color: "#0044bb"}}>{chosenProduct?.product_collection}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_num">Address:</Box>
                                <Box className="static_text" style={{color: "#0044bb"}}>{chosenProduct?.product_address}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_num">Room</Box>
                                <Box className="static_text"  style={{marginLeft: "15px", color: "#0044bb"}}>{chosenProduct?.product_value}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_num">Price $</Box>
                                <Box className="static_text"  style={{marginLeft: "15px", color: "#0044bb"}}>{chosenProduct?.product_price}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_num">SQft</Box>
                                <Box className="static_text"  style={{marginLeft: "10px", color: "#0044bb"}}>{chosenProduct?.product_size}</Box>
                            </Stack>

                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Checkbox
                                    {...label}
                                    icon={<FavoriteBorder/>}
                                    checkedIcon={<Favorite style={{color: "red"}}/>}
                                    id={chosenProduct?._id}
                                    onClick={targetLikeProduct}
                                    checked={!!chosenProduct?.me_liked[0]?.my_favorite
                                    }
                                />
                                <Box className="static_num" style={{marginLeft: "15px", color: "#0044bb"}}>{chosenProduct?.product_likes}</Box>
                            </Stack>
                            <Marginer direction="vertical" height="64" width="2" bg="#E3C08D"/>
                            <Stack className="static_box">
                                <Box className="static_text"><RemoveRedEyeIcon/></Box>
                                <Box className="static_num" style={{marginLeft: "8px", color: "#0044bb"}}>{chosenProduct?.product_views}</Box>
                            </Stack>

                        </Stack>
                    </div>
                    <div data-aos="flip-left">
                        <Stack sx={{flexDirection: "column", marginTop: "40px"}}>
                            <Stack className="chosen_dish_slider">
                                <div ref={sliderRef} className="keen-slider" style={{height: "600px"}}>
                                    {chosenProduct?.product_images.map((ele: string, index: number) => (
                                        <div
                                            key={index}
                                            className="keen-slider__slide"
                                            style={{backgroundImage: `url(${serverApi}/${ele})`, backgroundSize: "cover"}}
                                        />
                                    ))}
                                </div>

                                <div ref={thumbnailRef} className="keen-slider thumbnail"  style={{height: "200px"}}>
                                    {chosenProduct?.product_images.map((ele: string, index: number) => (
                                        <div
                                            key={index}
                                            className="keen-slider__slide"
                                            style={{backgroundImage: `url(${serverApi}/${ele})`}}
                                        />
                                    ))}
                                </div>

                            </Stack>
                        </Stack>
                    </div>
                    <Stack className={"chosen_dish_info_container"} sx={{flexDirection: "row"}}>
                        <Stack>
                            <div data-aos="flip-down">
                                <Box className={"chosen_dish_info_box"}>
                                    <a>Overview</a>
                                    <Stack sx={{flexDirection: "row", marginTop: "25px"}}>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                            <img src={"/icons/right3.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Garage</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/bath.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>bath</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/right3.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>parking</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "80px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/telephone.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>telephone</a>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/refragtor.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>refrigerator</a>
                                            </Box>
                                        </Box>
                                    </Stack>
                                    <Stack sx={{flexDirection: "row", marginTop: "15px"}}>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/iron.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Iron</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/lamp.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Lamp</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "100px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/grinder.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Grinder</a>
                                            </Box>
                                        </Box>
                                        <Box sx={{marginRight: "125px"}}>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/mixer.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Mixer</a>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box className={"icons_box"}>
                                                <img src={"/icons/fan.svg"}/>
                                            </Box>
                                            <Box className={"icons_box_a"}>
                                                <a>Fan</a>
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            </div>
                        </Stack>
                        <Stack className={"chosenProduct_agency"}>
                            <div data-aos="zoom-out">
                                <Box className={"chosenProduct_user"}>
                                    <CssVarsProvider>
                                        <Card
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            data-resizable
                                            sx={{
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                width: 343,
                                                overflow: 'auto',
                                                resize: 'horizontal',
                                                '--icon-size': '100px',
                                            }}
                                        >
                                            <CardOverflow variant="solid" color="warning">
                                                <AspectRatio
                                                    variant="outlined"
                                                    color="warning"
                                                    ratio="1"
                                                    sx={{
                                                        m: 'auto',
                                                        transform: 'translateY(50%)',
                                                        borderRadius: '50%',
                                                        width: 'var(--icon-size)',
                                                        boxShadow: 'sm',
                                                        bgcolor: 'background.surface',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <div>
                                                        <Box color="warning" sx={{fontSize: '4rem'}}/>
                                                        <img
                                                            src={
                                                                chosenCompany?.mb_image
                                                                    ? `${serverApi}/${chosenCompany?.mb_image}`
                                                                    : "/auth/default_user.svg"
                                                            }
                                                        />
                                                    </div>
                                                </AspectRatio>
                                            </CardOverflow>
                                            <Typography level="title-lg" sx={{mt: 'calc(var(--icon-size) / 2)'}}>
                                                🎊 {chosenCompany?.mb_nick} 🎊
                                                <p>Follower: {chosenCompany?.mb_follow_cnt} |
                                                    Following: {chosenCompany?.mb_subscriber_cnt}</p>
                                            </Typography>
                                            <CardContent sx={{maxWidth: '40ch'}}>
                                                {chosenCompany?.mb_description} best Agency

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 2,
                                                        mt: 1,
                                                        '& > button': {borderRadius: '2rem'},
                                                    }}
                                                >
                                                    <IconButton size="sm" variant="plain" color="neutral">
                                                        <SvgIcon>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
                                                                />
                                                            </svg>
                                                        </SvgIcon>
                                                    </IconButton>
                                                    <IconButton size="sm" variant="plain" color="neutral">
                                                        <SvgIcon>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M12 6.865A5.135 5.135 0 1 0 17.135 12A5.135 5.135 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12A3.333 3.333 0 0 1 12 15.334Z"
                                                                />
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M21.94 7.877a7.333 7.333 0 0 0-.465-2.427a4.918 4.918 0 0 0-1.153-1.772a4.894 4.894 0 0 0-1.77-1.153a7.323 7.323 0 0 0-2.428-.464C15.058 2.012 14.717 2 12.001 2s-3.057.011-4.123.06a7.333 7.333 0 0 0-2.428.465a4.905 4.905 0 0 0-1.77 1.153A4.886 4.886 0 0 0 2.525 5.45a7.333 7.333 0 0 0-.464 2.427c-.05 1.066-.06 1.407-.06 4.123s.01 3.057.06 4.123a7.334 7.334 0 0 0 .464 2.427a4.888 4.888 0 0 0 1.154 1.772a4.917 4.917 0 0 0 1.771 1.153a7.338 7.338 0 0 0 2.428.464C8.944 21.988 9.285 22 12 22s3.057-.011 4.123-.06a7.333 7.333 0 0 0 2.427-.465a5.113 5.113 0 0 0 2.925-2.925a7.316 7.316 0 0 0 .465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.057-.06-4.123Zm-1.8 8.164a5.549 5.549 0 0 1-.343 1.857a3.311 3.311 0 0 1-1.898 1.898a5.522 5.522 0 0 1-1.857.344c-1.055.048-1.371.058-4.042.058s-2.986-.01-4.04-.058a5.526 5.526 0 0 1-1.857-.344a3.108 3.108 0 0 1-1.15-.748a3.085 3.085 0 0 1-.748-1.15a5.521 5.521 0 0 1-.344-1.857c-.048-1.054-.058-1.37-.058-4.04s.01-2.987.058-4.042a5.563 5.563 0 0 1 .344-1.857a3.107 3.107 0 0 1 .748-1.15a3.082 3.082 0 0 1 1.15-.748A5.523 5.523 0 0 1 7.96 3.86C9.014 3.81 9.331 3.8 12 3.8s2.987.011 4.042.059a5.564 5.564 0 0 1 1.857.344a3.31 3.31 0 0 1 1.898 1.898a5.523 5.523 0 0 1 .344 1.857c.048 1.055.058 1.37.058 4.041s-.01 2.986-.058 4.041ZM17.339 5.462Z"
                                                                />
                                                            </svg>
                                                        </SvgIcon>
                                                    </IconButton>
                                                    <IconButton size="sm" variant="plain" color="neutral">
                                                        <SvgIcon>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"
                                                                />
                                                            </svg>
                                                        </SvgIcon>
                                                    </IconButton>
                                                    <IconButton size="sm" variant="plain" color="neutral">
                                                        <SvgIcon>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M19.989 11.572a7.96 7.96 0 0 0-1.573-4.351a9.757 9.757 0 0 1-.92.87a13.156 13.156 0 0 1-3.313 2.01c.167.35.32.689.455 1.009v.003c.027.061.05.118.094.229l.017.04c1.513-.17 3.109-.107 4.656.103c.206.027.4.056.584.087Zm-9.385-7.45a46.15 46.15 0 0 1 2.692 4.27c1.223-.482 2.234-1.09 3.048-1.767c.33-.274.594-.532.796-.755A7.968 7.968 0 0 0 12 4c-.476 0-.942.042-1.396.121ZM4.253 9.997a29.21 29.21 0 0 0 2.04-.123a31.53 31.53 0 0 0 4.862-.822a54.36 54.36 0 0 0-2.7-4.227a8.018 8.018 0 0 0-4.202 5.172Zm1.53 7.038a14.21 14.21 0 0 1 1.575-1.899c1.454-1.49 3.17-2.65 5.156-3.29l.062-.018c-.165-.364-.32-.689-.476-.995c-1.836.535-3.77.869-5.697 1.042c-.94.085-1.783.122-2.403.128a7.966 7.966 0 0 0 1.784 5.032Zm9.221 2.38a35.951 35.951 0 0 0-1.632-5.709c-2 .727-3.596 1.79-4.829 3.058a9.77 9.77 0 0 0-1.317 1.655A7.964 7.964 0 0 0 12 20a7.977 7.977 0 0 0 3.005-.583Zm1.874-1.075a7.998 7.998 0 0 0 2.987-4.87c-.34-.085-.771-.17-1.245-.236a12.025 12.025 0 0 0-3.18-.033a39.39 39.39 0 0 1 1.438 5.14ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Z"
                                                                />
                                                            </svg>
                                                        </SvgIcon>
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                            <CardActions
                                                orientation="vertical"
                                                buttonFlex={1}
                                                sx={{
                                                    '--Button-radius': '40px',
                                                    width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                                                }}
                                            >
                                                <Button variant="solid" color="warning"
                                                        // onClick={() => visitMemberHandler(chosenCompany?._id)}
                                                >
                                                    view profile
                                                </Button>

                                            </CardActions>
                                        </Card>
                                    </CssVarsProvider>
                                </Box>
                            </div>
                        </Stack>

                    </Stack>
                    <Stack className={"description_box"}>
                        <Box></Box>
                        <h4>
                            About property
                        </h4>
                        <text>{chosenProduct?.product_description}</text>
                    </Stack>


                    {/*<Stack className={"property_description"}>*/}
                    {/*    <div data-aos="flip-right">*/}
                    {/*        <Stack*/}
                    {/*            sx={{mt: "60px"}}*/}
                    {/*            style={{display: "flex", flexDirection: "column", alignItems: "center",}}*/}
                    {/*        >*/}
                    {/*            <Box className={"category_title"}>*/}
                    {/*                <h1> Address</h1>*/}
                    {/*            </Box>*/}
                    {/*            <iframe*/}
                    {/*                style={{marginTop: "10px",}}*/}
                    {/*                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.242382150278!2d127.05066999999998!3d37.58379085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2sDongdaemun-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1700545060503!5m2!1sen!2skr"*/}
                    {/*                width="1300"*/}
                    {/*                height="500"*/}
                    {/*            ></iframe>*/}
                    {/*        </Stack>*/}
                    {/*    </div>*/}
                    {/*</Stack>*/}
                    <CommentExampleComment setProductRebuild={setProductRebuild} id={product_id}/>
                </Stack>
            </Container>
        </div>
    );
}
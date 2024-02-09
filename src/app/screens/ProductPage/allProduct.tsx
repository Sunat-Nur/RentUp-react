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
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import {setTargetAllProducts} from "./slice";
import assert from "assert";
import Slider, {sliderClasses} from '@mui/joy/Slider';

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
import {setTargetCompany} from "./slice";
import {retrieveTargetCompanys} from "./selector";

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
import {Company} from "../../../types/user";
import CompanyApiService from "../../apiSservices/companyApiService";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetAllProducts: (data: Product[]) => dispatch(setTargetAllProducts(data)),
    setTargetCompany: (data: Company[]) => dispatch(setTargetCompany(data)),
});

/** REDUX SELECTOR */
const targetAllProductsRetriever = createSelector(
    retrieveTargetAllProducts,
    (targetAllProducts) => ({
        targetAllProducts,
    })
);
const targetCompanyRetriever = createSelector(
    retrieveTargetCompanys,
    (targetCompany) => ({
        targetCompany,
    })
);


export function AllProductPage(props: any) {
    /** INITIALIZATIONS */
    const {setTargetAllProducts} = actionDispatch(useDispatch());
    let {company_id} = useParams<{ company_id: string }>();
    const {targetCompany} = useSelector(targetCompanyRetriever);
    const {targetAllProducts} = useSelector(targetAllProductsRetriever);
    const [targetSearchObject, setTartgetSearchObject] = useState<ProductSearchObj>({
        page: 1,
        limit: 8,
        order: "mb_point",
    });


    const [targetProductsSearchObj, setTargetProductSearchObj] =
        useState<ProductSearchObj>({
            page: 1,
            limit: 4,
            order: "createdAt",
            product_collection: "",
        });

    const refs: any = useRef([]);
    const history = useHistory();

    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    useEffect(() => {
        const productService = new ProductApiService();
        productService
            .getAllProducts(targetProductsSearchObj)
            .then((data) => setTargetAllProducts(data))
            .catch((err) => console.log(err));

        // const companyService = new CompanyApiService();
        // companyService.getCompanys(targetSearchObject)
        //     .then(data => setTargetCompany(data))
        //     .catch((err) => console.log(err));

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
                                            background: "#e3c08D",
                                            marginRight: "30px"
                                        }}
                                        onClick={() => searchCollectionHandler("Apartment")}
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
                                            background: "#e3c08D",
                                            marginRight: "25px"
                                        }}
                                        onClick={() => searchCollectionHandler("House")}
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
                                            background: "#e3c08D",
                                            marginRight: "25px"
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
                            <Stack className="allProduct_middle_left">
                                <FormControl
                                    className={"form_box"}
                                    sx={{
                                        width: "200px",
                                        background: "white",
                                        marginBottom: "30px"
                                    }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >
                                        <MenuItem value="">chose type</MenuItem>
                                        <MenuItem value={"House"}>House</MenuItem>
                                        <MenuItem value={"Office"}>Office</MenuItem>
                                        <MenuItem value={"Villa"}>Villa</MenuItem>
                                        <MenuItem value={"studio"}>Studio</MenuItem>
                                        <MenuItem value={"etc"}>etc</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl
                                    className={"form_box"}
                                    sx={{
                                        width: "200px",
                                        background: "white",
                                        marginBottom: "30px"
                                    }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >
                                        <MenuItem value="">chose address</MenuItem>
                                        <MenuItem value={"tashkent"}>Tashkent</MenuItem>
                                        <MenuItem value={"samarkand"}>Samarkand</MenuItem>
                                        <MenuItem value={"bukhara"}>Bukhara</MenuItem>
                                        <MenuItem value={"xoramz"}>Xoramz</MenuItem>
                                        <MenuItem value={"andijan"}>Andijan</MenuItem>
                                        <MenuItem value={"surkhandaryo"}>Surkhandaryo</MenuItem>
                                        <MenuItem value={"qarshi"}>Qarshi</MenuItem>
                                        <MenuItem value={"navoiy"}>Navoiy</MenuItem>
                                        <MenuItem value={"namamgan"}>Namamgan</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl
                                    className={"form_box"}
                                    sx={{
                                        width: "200px",
                                        background: "white",
                                        marginBottom: "30px"
                                    }}>
                                    <Select
                                        // value={communityArticleData?.bo_id}
                                        displayEmpty
                                        inputProps={{"aria-label": "Without label"}}
                                        // onChange={changeCategoryHandler}
                                    >

                                        <MenuItem value="">chose room</MenuItem>
                                        <MenuItem value={"1"}>1 room</MenuItem>
                                        <MenuItem value={"2"}>2 rooms</MenuItem>
                                        <MenuItem value={"3"}>3 rooms</MenuItem>
                                        <MenuItem value={"4"}>4 rooms</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box>
                                    <CssVarsProvider>
                                        <a> size of property</a>
                                        <Box sx={{width: 180, marginTop: "30px", marginBottom: "30px"}}>
                                            <Slider
                                                track={false}
                                                defaultValue={[0, 200]}
                                                getAriaLabel={() => 'Amount'}
                                                // getAriaValueText={valueText}
                                                marks={[
                                                    {
                                                        value: 0,
                                                        label: '0 sqft',
                                                    },
                                                    {
                                                        value: 100,
                                                        label: '100 sqft',
                                                    },
                                                ]}
                                                valueLabelDisplay="on"
                                                sx={{
                                                    // Need both of the selectors to make it works on the server-side and client-side
                                                    [`& [style*="left:0%"], & [style*="left: 0%"]`]: {
                                                        [`&.${sliderClasses.markLabel}`]: {
                                                            transform: 'none',
                                                        },
                                                        [`& .${sliderClasses.valueLabel}`]: {
                                                            left: 'calc(var(--Slider-thumbSize) / 2)',
                                                            borderBottomLeftRadius: 0,
                                                            '&::before': {
                                                                left: 0,
                                                                transform: 'translateY(100%)',
                                                                borderLeftColor: 'currentColor',
                                                            },
                                                        },
                                                    },
                                                    [`& [style*="left:100%"], & [style*="left: 100%"]`]: {
                                                        [`&.${sliderClasses.markLabel}`]: {
                                                            transform: 'translateX(-100%)',
                                                        },
                                                        [`& .${sliderClasses.valueLabel}`]: {
                                                            right: 'calc(var(--Slider-thumbSize) / 2)',
                                                            borderBottomRightRadius: 0,
                                                            '&::before': {
                                                                left: 'initial',
                                                                right: 0,
                                                                transform: 'translateY(100%)',
                                                                borderRightColor: 'currentColor',
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </CssVarsProvider>
                                </Box>
                                <Button sx={{width: "120px", color: "#fff", background: "green"}}> search</Button>
                            </Stack>
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
                                            <Card
                                                onClick={() => chosenProductHandler(ele._id)}
                                                variant="outlined"
                                                sx={{
                                                    minWidth: 300,
                                                    marginRight: "40px",
                                                    marginBottom: "40px",
                                                    '--Card-radius': (theme) => theme.vars.radius.xs,
                                                }}
                                            >
                                                <CardContent orientation="horizontal"
                                                             sx={{alignItems: 'center', gap: 1}}>
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            '&::before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                bottom: 0,
                                                                right: 0,
                                                                m: '-2px',
                                                                borderRadius: '50%',
                                                                background:
                                                                    'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                                                            },
                                                        }}
                                                    >
                                                        <Avatar
                                                            size="sm"
                                                            src={image_path}
                                                            sx={{
                                                                p: 0.5,
                                                                border: '2px solid',
                                                                borderColor: 'background.body'
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography fontWeight="lg">{ele.product_price}$ /
                                                        month</Typography>
                                                    <IconButton variant="plain" color="neutral" size="sm"
                                                                sx={{ml: 'auto'}}>
                                                        <MoreHoriz/>
                                                    </IconButton>
                                                </CardContent>
                                                <CardOverflow>
                                                    <AspectRatio>
                                                        <img src={image_path} alt="" loading="lazy"/>
                                                    </AspectRatio>
                                                </CardOverflow>
                                                <CardContent orientation="horizontal"
                                                             sx={{alignItems: 'center', mx: -1}}
                                                             onClick={(e) => {
                                                                 e.stopPropagation()
                                                             }}>
                                                    <Box sx={{width: 0, display: 'flex', gap: 0.5}}>
                                                        <IconButton variant="plain" color="neutral" size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                    }}
                                                        >
                                                            <Favorite
                                                                onClick={(e) => {
                                                                    targetLikeHandler(e, ele._id);
                                                                }}
                                                                style={{
                                                                    background: "#808080",
                                                                    fill:
                                                                        ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                                            ? "red"
                                                                            : "white",
                                                                }}

                                                            /> {ele.product_likes}
                                                        </IconButton>

                                                    </Box>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        mx: 'auto'
                                                    }}>
                                                        {[...Array(5)].map((_, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    borderRadius: '50%',
                                                                    width: `max(${6 - index}px, 3px)`,
                                                                    height: `max(${6 - index}px, 3px)`,
                                                                    bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                    <Box sx={{width: 0, display: 'flex', flexDirection: 'row-reverse'}}>
                                                        <IconButton variant="plain" color="neutral" size="sm">
                                                            <BookmarkBorderRoundedIcon/>
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>
                                                <Stack>
                                                    <CardContent
                                                        sx={{flexDirection: "row", justifyContent: "space-between"}}>
                                                        <Link
                                                            component="button"
                                                            underline="none"
                                                            fontSize="sm"
                                                            fontWeight="lg"
                                                            textColor="text.primary"
                                                        >
                                                            <img src={"icons/bed.svg"}/> {ele.product_value}
                                                        </Link>
                                                        <Link
                                                            component="button"
                                                            underline="none"
                                                            fontSize="sm"
                                                            fontWeight="lg"
                                                            textColor="text.primary"
                                                        >
                                                            <img src={"icons/bath.svg"}/> {ele.product_value}
                                                        </Link>
                                                        <Link
                                                            component="button"
                                                            underline="none"
                                                            fontSize="sm"
                                                            fontWeight="lg"
                                                            textColor="text.primary"
                                                        >
                                                            <img src={"icons/kv.svg"}/> Sqft {ele.product_size}
                                                        </Link>
                                                    </CardContent>
                                                    <Stack>
                                                        <Typography fontSize="sm" sx={{marginTop: "10px"}}>
                                                            <Link
                                                                component="button"
                                                                color="neutral"
                                                                fontWeight="lg"
                                                                textColor="text.primary"
                                                            >
                                                                Address: {ele.product_address}
                                                            </Link>{' '}
                                                            {ele.product_collection}...
                                                        </Typography>
                                                    </Stack>

                                                    <Link
                                                        component="button"
                                                        underline="none"
                                                        fontSize="10px"
                                                        sx={{color: 'text.tertiary', my: 0.5}}
                                                    >

                                                    </Link>
                                                </Stack>
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
                    <Stack className="allProduct_bottom_main">
                        <Posts/>
                        <BestCompany/>
                    </Stack>
                </Stack>

            </Container>
        </div>
    );
}
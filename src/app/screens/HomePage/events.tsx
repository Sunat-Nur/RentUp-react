import React from "react";
import {Box, Container, Stack} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);


export function Events() {
    const events_list = [
        {
            title: "Sale rent home",
            desc: "yangicha uslubda yangicha tam va yangicha his",
            author: "sunat_nur",
            date: "2023.11.16",
            location: "tashkent, nurafshon ko'cha",
            img:"/home/home4.png",
        },
        {
            title: "Sale rent home",
            desc: "yangicha uslubda yangicha tam va yangicha his",
            author: "sunat_nur",
            date: "2023.11.16",
            location: "tashkent, nurafshon ko'cha",
            img:"/home/home2.png",
        },
        {
            title: "Sale rent home",
            desc: "yangicha uslubda yangicha tam va yangicha his",
            author: "sunat_nur",
            date: "2023.11.16",
            location: "tashkent, nurafshon ko'cha",
            img:"/home/img.png",
        },
        {
            title: "Sale rent home",
            desc: "yangicha uslubda yangicha tam va yangicha his",
            author: "sunat_nur",
            date: "2023.11.16",
            location: "tashkent, nurafshon ko'cha",
            img:"/home/home5.png",
        },
    ];


    return (
        <div className={"events_frame"}>
            <Container sx={{ overflow: "hidden"}}>
                <Stack className={"events_main"}>
                    <Box className={"events_text"}>
                        <span className={"category_title"}>Sale property</span>
                    </Box>
                    <Box className={"prev_next_frame"} sx={{ color: "black"}}>
                        <img
                            src={"/icons/arrow-left.svg"}
                            className={"swiper-button-prev"}
                        />
                        <div className={"dot_frame_pagination swiper-pagination"}></div>
                        <img
                            src={"/icons/arrow-right.svg"}
                            className={"swiper-button-next"}
                        />
                    </Box>
                    <Swiper
                        className={"events_info swiper-wrapper"}
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        spaceBetween={30}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: true,
                        }}
                    >
                        {events_list.map((value, number) => {
                            return (
                                <SwiperSlide className={"events_info_frame"}>
                                    <div className={"events_img"}>
                                        <img src={value.img} className={"events_img"} />
                                    </div>
                                    <Box className={"events_desc"}>
                                        <Box className={"events_bott"}>
                                            <Box className={"bott_left"}>
                                                <div className={"event_title_speaker"}>
                                                    <strong>{value.title}</strong>
                                                    <div className={"event_organizator"}>
                                                        <img
                                                            src={"/home/profile.4.png"}
                                                            style={{ width: "20px", marginRight: "10px" }}
                                                        />
                                                        <p className={"spec_text_author"}>{value["author"]}</p>
                                                    </div>
                                                </div>
                                                <p className={"text_desc"}
                                                   style={{ marginTop: "10px" }}
                                                >
                                                    {" "}
                                                    {value.desc}{" "}
                                                </p>
                                                <div className={"bott_info"}
                                                     style={{marginTop: "10px", flexDirection: "row"}}
                                                >
                                                    <div className={"bott_info_main"}>
                                                        <img
                                                            src={"/icons/bed.svg"}
                                                            style={{marginRight: "10px"}}
                                                        />
                                                        {/*{value.date}*/} 4
                                                    </div>

                                                    <div className={"bott_info_main"}>
                                                        <img
                                                            src={"/icons/bath.svg"}
                                                            style={{marginRight: "10px"}}
                                                        />
                                                        {/*{value.date}*/} 2
                                                    </div>
                                                    <div className={"bott_info_main"}>
                                                        <img
                                                            src={"/icons/kv.svg"}
                                                            style={{marginRight: "10px"}}
                                                        />
                                                        {/*{value.location}*/} 70 m2
                                                    </div>
                                                    <div className={"bott_info_main"}>
                                                        <img
                                                            src={"/icons/location.svg"}
                                                            style={{marginRight: "10px"}}
                                                        />
                                                        {/*{value.location}*/} tashkent city
                                                    </div>
                                                </div>
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Stack>
            </Container>
        </div>
    );
}
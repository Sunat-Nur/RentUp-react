import React, {useEffect, useState} from "react";
import {Box, Container, Stack} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import Autoplay from "swiper";
import Navigation from "swiper";
import Pagination from "swiper";
import {Dispatch} from "@reduxjs/toolkit";
import {setEvents} from "./slice";
import {createSelector} from "reselect";
import {retrieveEvents} from "./selector";
import {useDispatch, useSelector} from "react-redux";
import MemberApiService from "../../apiSservices/memberApiService";
import {serverApi} from "../../../lib/config";
import dayjs from "dayjs";
import { Event } from "../../../types/event";
SwiperCore.use([Autoplay, Navigation, Pagination]);

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setEvents: (data: Event[]) =>
        dispatch(setEvents(data)),
});

/** REDUX SELECTOR */
const eventsRetriever = createSelector(
    retrieveEvents,
    (events) => ({
        events,
    })
);

export default function Events() {
    /** INITIALIZATION */
    const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
    const {setEvents} = actionDispatch(useDispatch())
    const {events} = useSelector(eventsRetriever);

    useEffect(() => {
        const memberService = new MemberApiService();
        memberService.getEvents({
                order: "event_views",
                limit: 4,
                page: 1,
            })
            .then((data) => {
                console.log("data", data);

                setEvents(data);

            })
            .catch((err) => console.log(err));
    }, [articlesRebuild]);

console.log("events:", events);



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
                        {/*{events.map((event: Event, index: number) => {*/}
                        {/*    const image_path = `${serverApi}/${event?.event_image}`;*/}
                        {/*    const formattedDate = dayjs(event?.event_date).format("YYYY-MM-DD HH:mm");*/}

                            return (
                                <SwiperSlide className={"events_info_frame"}>
                                    <div className={"events_img"}>
                                        {/*<img src={image_path} className={"events_img"} />*/}
                                    </div>
                                    <Box className={"events_desc"}>
                                        <Box className={"events_bott"}>
                                            <Box className={"bott_left"}>
                                                <div className={"event_title_speaker"}>
                                                    {/*<strong>{event?.event_title}</strong>*/}
                                                    <div className={"event_organizator"}>
                                                        <img
                                                            src={"/home/profile.4.png"}
                                                            style={{ width: "20px", marginRight: "10px" }}
                                                        />
                                                        {/*<p className={"spec_text_author"}>{event?.member_data?.mb_nick}</p>*/}
                                                    </div>
                                                </div>
                                                <p className={"text_desc"}
                                                   style={{ marginTop: "10px" }}
                                                >
                                                    {" "}
                                                    {/*{value.desc}{" "}*/}
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
                                                        {/*{event?.event_status} 70 m2*/}
                                                    </div>
                                                    <div className={"bott_info_main"}>
                                                        <img
                                                            src={"/icons/location.svg"}
                                                            style={{marginRight: "10px"}}
                                                        />
                                                        {/*{event?.event_location} tashkent city*/}
                                                    </div>
                                                </div>
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                        {/*    )*/}
                        {/*})}*/}
                    </Swiper>
                </Stack>
            </Container>
        </div>
    );
}
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import {CssVarsProvider} from "@mui/joy/styles";
import {Container} from "@mui/material";
import "./style.css";
import Typography from "@mui/joy/Typography";

const data = [
    {
        src: 'https://www.bhg.com/thmb/EmuKL4yiqCMRZlclvSIJtMln9vU=/1866x0/filters:no_upscale():strip_icc()/renovated-neutral-colored-living-room-2f194807-3856ba1a2ea04e269ea42e93021fda64.jpg',
        title: 'Night view',
        description: '4.21M views',
    },
    {
        src: 'https://hips.hearstapps.com/countryliving/assets/15/15/1428596092-home-sweet-home-living-room-0515.jpg',
        title: 'Lake view',
        description: '4.74M views',
    },
    {
        src: 'https://www.thespruce.com/thmb/7PFr_c3Dgx-HDf1FnX9aqfXGBuY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/living-room-ideas-5194639-hero-a99a77f61b9b4e368c62ca603ab45322.jpg',
        title: 'Mountain view',
        description: '3.98M views',
    },
    {
        src: 'https://media.designcafe.com/wp-content/uploads/2020/09/30173917/seating-living-room-home-decor.jpg',
        title: 'Mountain view',
        description: '3.98M views',
    },
    {
        src: 'https://www.southernliving.com/thmb/YrpTy94cHiaiX1fH6tcP_kHGwxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27225_A.Allen-_0414220074_Final-b8f0b2d5253d4da2a03a2890b52c7f17.jpg',
        title: 'Mountain view',
        description: '3.98M views',
    },
];

export default function Events() {
    return (
        <div className={"event_container"} data-aos="zoom-in-left">
            <Container className={"event_second_cont"}>
                <CssVarsProvider>
                    <h1> Best sales for this month!!</h1>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 5,
                            py: 1,
                            overflow: 'auto',
                            scrollSnapType: 'x mandatory',
                            width: "100%",
                            '& > *': {
                                scrollSnapAlign: 'center',
                            },
                            '::-webkit-scrollbar': {display: 'none'},
                        }}
                    >
                        {data.map((item) => (
                            <Card orientation="horizontal" size="sm" key={item.title} variant="outlined">
                                <AspectRatio ratio="1" sx={{minWidth: 350}}>
                                    <img
                                        srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.src}?h=120&fit=crop&auto=format`}
                                        alt={item.title}
                                    />
                                </AspectRatio>
                                <Box className={"title_box"} sx={{whiteSpace: 'nowrap', mx: 1}}>
                                    <Typography level="title-md">{item.title}</Typography>
                                    <Typography level="body-sm">{item.description}</Typography>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </CssVarsProvider>
            </Container>
        </div>
    );
}


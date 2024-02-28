import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import {CssVarsProvider} from "@mui/joy/styles";
import {Container} from "@mui/material";
import "./style.css";
const data = [
    {
        src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
        title: 'Night view',
        description: '4.21M views',
    },
    {
        src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
        title: 'Lake view',
        description: '4.74M views',
    },
    {
        src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
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
                                <AspectRatio ratio="1" sx={{minWidth: 250}}>
                                    <img
                                        srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.src}?h=120&fit=crop&auto=format`}
                                        alt={item.title}
                                    />
                                </AspectRatio>
                                <Box className={"title_box"} sx={{whiteSpace: 'nowrap', mx: 2}}>
                                    <Typography level="title-md">{item.title}</Typography>
                                    <Typography level="body-sm">{item.description}</Typography>
                                    <Typography level="body-sm">{item.description}</Typography>
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


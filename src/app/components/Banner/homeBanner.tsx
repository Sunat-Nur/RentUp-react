// import React from 'react';
// import "./banner.css";
// import {useHistory} from "react-router-dom";
//
// const HomeBanner: React.FC = () => {
//     const history = useHistory();
//
//     const chosenTopHomesHandler = () => {
//         history.push("/company");
//     }
//
//     return (
//         <div className="home" data-aos="flip-left">
//             <div className="container">
//                 <div className="home_content">
//                     <h1>Discover Most Suitable Property</h1>
//                     <p>
//                         Lorem Ipsum is simply dummy text of the printing and typesetting
//                         industry. Lorem Ipsum has been the industry's standard dummy text
//                         ever since the 1500s, when an unknown printer took a galley
//                     </p>
//                     <div className="form">
//                         <i className="fa-solid fa-location-dot"></i>
//                         <input type="text" placeholder="search for an estate"/>
//                         <button
//                             onClick={() => chosenTopHomesHandler()}
//                         >Search
//                         </button>
//                     </div>
//
//                     <div className="numbers">
//                         <div className="item">
//                             <h1>
//                                 9k <span>+</span>
//                             </h1>
//                             <p>happy</p>
//                             <p>owner</p>
//                         </div>
//                         <div className="item">
//                             <h1>
//                                 5k <span>+</span>
//                             </h1>
//                             <p>happy</p>
//                             <p>company</p>
//                         </div>
//                         <div className="item">
//                             <h1>
//                                 10k <span>+</span>
//                             </h1>
//                             <p>happy</p>
//                             <p>customers</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/*<div className="pic_side">*/}
//                 {/*    <div className="back"></div>*/}
//                 {/*    <img*/}
//                 {/*        src="/home/bukhara.jpeg"*/}
//                 {/*        alt="desert"*/}
//                 {/*    />*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
// };
//
// export default HomeBanner;
//


import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import "./banner.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://thumbs.dreamstime.com/b/house-rent-model-banner-48989831.jpg',
    },
    {
        label: 'Bird',
        imgPath:
        'https://media.licdn.com/dms/image/D4D12AQHV0r6WS8edMQ/article-cover_image-shrink_720_1280/0/1686841725930?e=2147483647&v=beta&t=l0A2cR3o6Qa7iwraPtZJ7TKb8760ZKUY3Bi-I4--9uo',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://i.ytimg.com/vi/tdTj-FQVIFo/maxresdefault.jpg',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://www.citrussuitessukhumvit.com/wp-content/uploads/2017/05/home-banner-01.jpg',

    },
];

function HomeBanner() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <div data-aos="fade-up"
             data-aos-anchor-placement="center-bottom">
            <Box
                className={"banner_box"}
                sx={{flexGrow: 1}}
            >
                {/*<Paper*/}
                {/*    square*/}
                {/*    elevation={0}*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center',*/}
                {/*        height: 50,*/}
                {/*        pl: 2,*/}
                {/*        bgcolor: 'background.default',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Typography>{images[activeStep].label}</Typography>*/}
                {/*</Paper>*/}
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: "780px",
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                        backgroundSize: 'cover',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft/>
                            ) : (
                                <KeyboardArrowRight/>
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight/>
                            ) : (
                                <KeyboardArrowLeft/>
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </div>
    );
}

export default HomeBanner;
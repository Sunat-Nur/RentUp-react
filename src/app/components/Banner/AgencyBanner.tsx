
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
        'https://www.ljhooker.co.nz/hubfs/corporate/ljhooker/ljhooker.co.nz/NZ%20INVEST%20-%20Investing%20in%20Real%20Estate.jpg',
    },
    {
        label: 'Bird',
        imgPath:
            'https://cdn2.hubspot.net/hubfs/5940046/Artical_1.jpeg',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://rus-media.pro/upload/58ce959c4f8b8-business.jpg',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://smartasset.com/wp-content/uploads/sites/2/2023/08/couple-house-property-agent-home-tablet-technology-business-buying-investment-real-estate.jpg_s1024x1024wisk20cLGZZfa6eLN9zvR2LUdrdYn_lwxF3KNFbUxURYg6W8WE.jpg',
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
                <h1>
                    Meet our best Agency
                </h1>
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
                                        height: "580px",
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
                {/*<MobileStepper*/}
                {/*    steps={maxSteps}*/}
                {/*    position="static"*/}
                {/*    activeStep={activeStep}*/}
                {/*    nextButton={*/}
                {/*        <Button*/}
                {/*            size="small"*/}
                {/*            onClick={handleNext}*/}
                {/*            disabled={activeStep === maxSteps - 1}*/}
                {/*        >*/}
                {/*            Next*/}
                {/*            {theme.direction === 'rtl' ? (*/}
                {/*                <KeyboardArrowLeft/>*/}
                {/*            ) : (*/}
                {/*                <KeyboardArrowRight/>*/}
                {/*            )}*/}
                {/*        </Button>*/}
                {/*    }*/}
                {/*    backButton={*/}
                {/*        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>*/}
                {/*            {theme.direction === 'rtl' ? (*/}
                {/*                <KeyboardArrowRight/>*/}
                {/*            ) : (*/}
                {/*                <KeyboardArrowLeft/>*/}
                {/*            )}*/}
                {/*            Back*/}
                {/*        </Button>*/}
                {/*    }*/}
                {/*/>*/}
            </Box>
        </div>
    );
}

export default HomeBanner;
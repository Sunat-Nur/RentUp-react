import React from "react";


export function Advertisements() {
    return (
        <div className="ads_company_frame">
            <video
                className={"ads_video"}
                autoPlay={true}
                loop
                muted
                playsInline
                data-video-media=""
            >
                <source
                    data-src="https://www.pexels.com/video/buildings-in-the-business-district-of-a-city-2818567/"
                    type="video/mp4"
                    src={"https://www.pexels.com/video/buildings-in-the-business-district-of-a-city-2818567/"}
                />
            </video>
        </div>
    );
}
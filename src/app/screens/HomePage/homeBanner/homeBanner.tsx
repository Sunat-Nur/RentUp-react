import React from 'react';
import "./banner.css";
import {useHistory} from "react-router-dom";

const HomeBanner: React.FC = () => {
    const history = useHistory();

    const chosenTopHomesHandler = () => {
        history.push("/company");
    }

    return (
        <div className="home" data-aos="flip-left">
            <div className="container">
                <div className="home_content">
                    <h1>Discover Most Suitable Property</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley
                    </p>
                    <div className="form">
                        <i className="fa-solid fa-location-dot"></i>
                        <input type="text" placeholder="search for an estate"/>
                        <button
                            onClick={() => chosenTopHomesHandler()}
                        >Search
                        </button>
                    </div>

                    <div className="numbers">
                        <div className="item">
                            <h1>
                                9k <span>+</span>
                            </h1>
                            <p>happy</p>
                            <p>owner</p>
                        </div>
                        <div className="item">
                            <h1>
                                5k <span>+</span>
                            </h1>
                            <p>happy</p>
                            <p>company</p>
                        </div>
                        <div className="item">
                            <h1>
                                10k <span>+</span>
                            </h1>
                            <p>happy</p>
                            <p>customers</p>
                        </div>
                    </div>
                </div>

                {/*<div className="pic_side">*/}
                {/*    <div className="back"></div>*/}
                {/*    <img*/}
                {/*        src="/home/bukhara.jpeg"*/}
                {/*        alt="desert"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default HomeBanner;


import React from "react";
import {Statistics} from "./statistics";
import {TopPropertys} from "./topPropertys";
import {Posts} from "./posts";
import {Recommendation} from "./recommendation";
import {BestAgency} from "./bestAgency";
import {Advertisements} from "./advertisements";
import {Login} from "./login";
import {LuxuryHomes} from "./luxury";
import '../../../css/home.css';

export function HomePage() {
    return <div className="homepage">
        <Login/>
        <Statistics/>
        {/*<TopPropertys/>*/}
        <Advertisements/>
        <Recommendation/>
        <Posts/>
        <BestAgency/>
        <LuxuryHomes/>
    </div>;
}
import React from "react";
import {Statistics} from "./statistics";
import {TopPropertys} from "./topPropertys";
import {Posts} from "./posts";
import {LuxuryProperty} from "./luxuryProperty";
import {BestAgency} from "./bestAgency";
import {Advertisements} from "./advertisements";
import '../../../css/home.css';
import {Events} from "./events";
import Recommendations from "./recomendation";

export function HomePage() {
    return <div className="homepage">
        <Statistics/>
        <TopPropertys/>
        <LuxuryProperty/>
        <Advertisements/>
        <BestAgency/>
        <Events />
        <Posts/>
        <Recommendations/>
    </div>;
}
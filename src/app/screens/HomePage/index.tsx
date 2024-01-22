import React from "react";
import {Statistics} from "./statistics";
import {TopHomes} from "./topHomes";
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
        <TopHomes/>
        <LuxuryProperty/>
        <Advertisements/>
        <BestAgency/>
        <Events />
        <Posts/>
        <Recommendations/>
    </div>;
}
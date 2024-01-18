import React from "react";
import {Statistics} from "./statistics";
import {TopHomes} from "./topHomes";
import {Posts} from "./posts";
import {Recommendation} from "./recommendation";
import {BestAgency} from "./bestAgency";
import {Login} from "./login";
import '../../../css/home.css';

export function HomePage() {
    return <div className="homepage">
        <Login/>
        <Statistics/>
        <TopHomes/>
        <Posts/>
        <Recommendation/>
        <BestAgency/>
    </div>;
}
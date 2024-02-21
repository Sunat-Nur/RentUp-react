import React, {useEffect, useState, } from "react";
import {Statistics} from "./statistics";
import HomeBanner from "./homeBanner/homeBanner";
import {LuxuryProperty} from "./luxuryProperty";
import {TopHomes} from "./topHomes"
import {BestCompany} from "./bestCompany";
import {Advertisements} from "./advertisements";
import Events from "./events";
import Recommendations from "./recomendation";
import {Comments} from "./comments";
import {Dispatch} from "@reduxjs/toolkit";
import {Company} from "../../../types/user";
import {setBestCompany} from "./slice";
import {useDispatch} from "react-redux";
import CompanyApiService from "../../apiSservices/companyApiService";
import '../../../css/home.css';


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
    setBestCompany: (data: Company[]) => dispach(setBestCompany(data)),
});


export function HomePage() {
    /** INITIALIZATION */
    const {setBestCompany } = actionDispatch(useDispatch());
    const [productRebuild] = useState<Date>(new Date());


    useEffect(() => {
        const companyService = new CompanyApiService();
        companyService
            .getBestCompany({page: 1, limit: 5, order: "createdAt"})
            .then((data) => {
                setBestCompany(data)
            })
            .catch((err => console.log(err)));

    }, [productRebuild]);


    return <div className="homepage">
        {/*<HomeBanner/>*/}
        <Statistics/>
        <TopHomes/>
        <LuxuryProperty/>
        <Advertisements/>
        <BestCompany/>
        {/*<Events/>*/}
        <Recommendations/>
        <Comments/>
    </div>;
}
import React, {useEffect, useState} from "react";
import {Statistics} from "./statistics";
import {Posts} from "./posts";
import {LuxuryProperty} from "./luxuryProperty";
import {TopHomes} from "./topHomes"
import {BestCompany} from "./bestCompany";
import {Advertisements} from "./advertisements";
import '../../../css/home.css';
import Events from "../HomePage/events";
import Recommendations from "./recomendation";
import {Dispatch} from "@reduxjs/toolkit";
import {Company} from "../../../types/user";
import {setBestCompany} from "./slice";
import {useDispatch} from "react-redux";
import CompanyApiService from "../../apiSservices/companyApiService";
import {Comments} from "./comments";


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
        <Statistics/>
        <TopHomes/>
        <LuxuryProperty/>
        <Advertisements/>
        <BestCompany/>
        <Events/>
        <Posts/>
        <Recommendations/>
        <Comments/>
    </div>;
}
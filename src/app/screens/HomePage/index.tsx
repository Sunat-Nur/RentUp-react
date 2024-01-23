import React, {useEffect} from "react";
import {Statistics} from "./statistics";
import {Posts} from "./posts";
import {LuxuryProperty} from "./luxuryProperty";
import {TopHomes} from "./topHomes"
import {BestCompany} from "./bestCompany";
import {Advertisements} from "./advertisements";
import '../../../css/home.css';
import {Events} from "./events";
import Recommendations from "./recomendation";
import {Dispatch} from "@reduxjs/toolkit";
import {Company} from "../../../types/user";
import {Product} from "../../../types/product";
import {setBestCompany, setTopHomes} from "./slice";
import {useDispatch} from "react-redux";
import CompanyApiService from "../../apiSservices/companyApiService";
import ProductApiService from "../../apiSservices/productApiService";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
    setBestCompany: (data: Company[]) => dispach(setBestCompany(data)),
    setTopHomes: (data: Product[]) => dispach(setTopHomes(data)),
});


export function HomePage() {
    /** INITIALIZATION */
    const {setBestCompany, setTopHomes } = actionDispatch(useDispatch());


    useEffect(() => {

        const companyService = new CompanyApiService();
        companyService
            .getBestCompany({ page: 1, limit: 6, order: "mb_point"})
            .then((data) => {
                setBestCompany(data);
            }).catch((err => console.log(err)));


        const productService = new ProductApiService();
        productService.getAllProducts({order: "product_likes", page: 1, limit: 4})
            .then(data => setTopHomes(data))
            .catch(err => console.log(err));
    }, []);


    return <div className="homepage">
        <Statistics/>
        <TopHomes/>
        <LuxuryProperty/>
        <Advertisements/>
        <BestCompany/>
        <Events />
        <Posts/>
        <Recommendations/>
    </div>;
}
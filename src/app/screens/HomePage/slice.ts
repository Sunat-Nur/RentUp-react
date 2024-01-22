
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
    topProperyts: [],
    bestAgency: [],
    luxuryHomes: [],
    bestBoArticles: [],
    trendBoArticles: [],
    newsBoArticles: [],

};

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {

        setTopPropertys: (state, action) => {
            state.topProperyts = action.payload  //
        },
        setBestAgencys: (state, action) => {
            state.bestAgency = action.payload
        },
        setLuxuryHomes: (state, action) => {
            state.luxuryHomes = action.payload
        },
        setBestBoArticles: (state, action) => {
            state.bestBoArticles = action.payload
        },
        setTrendBoArticles: (state, action) => {
            state.trendBoArticles = action.payload
        },
        setNewsBoArticles: (state, action) => {
            state.newsBoArticles = action.payload
        },
    },
});

export const {
    setTopPropertys,
    setBestAgencys,
    setBestBoArticles,
    setTrendBoArticles,
    setNewsBoArticles
} = HomePageSlice.actions;


const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
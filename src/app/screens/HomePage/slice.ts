
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
    topHomes: [],
    bestCompany: [],
    bestBoArticles: [],
    trendBoArticles: [],
    luxuryProperty: [],
    newsBoArticles: [],

};

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {

        setTopHomes: (state, action) => {
            state.topHomes = action.payload  //
        },
        setBestCompany: (state, action) => {
            state.bestCompany = action.payload
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
    setTopHomes,
    setBestCompany,
    setBestBoArticles,
    setTrendBoArticles,
    setNewsBoArticles
} = HomePageSlice.actions;


const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
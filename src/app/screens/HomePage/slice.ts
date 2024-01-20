
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
    topHomes: [],
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

        setTopRestaurants: (state, action) => {
            state.topHomes = action.payload  //
        },
        setBestRestaurants: (state, action) => {
            state.bestAgency = action.payload
        },
        setTrendProducts: (state, action) => {
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
    setTopRestaurants,
    setBestRestaurants,
    setTrendProducts,
    setBestBoArticles,
    setTrendBoArticles,
    setNewsBoArticles
} = HomePageSlice.actions;


const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
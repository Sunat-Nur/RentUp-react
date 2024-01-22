import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopPropertys = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topProperyts
);

export const retrieveBestAgency = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestAgency
);

export const retrieveLuxuryHomes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.luxuryHomes
);
export const retrieveBestBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestBoArticles
);
export const retrieveTrendBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.trendBoArticles
);
export const retrieveNewsBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.newsBoArticles
);
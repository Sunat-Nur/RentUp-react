import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopHomes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topHomes
);

export const retrieveBestCompany = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestCompany
);

export const retrieveLuxuryProperty = createSelector(
    selectHomePage,
    (HomePage) => HomePage.luxuryProperty
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
export const retrieveComment = createSelector(
    selectHomePage,
    (HomePage) => HomePage.comment
);

export const retrieveEvents = createSelector(
    selectHomePage,
    (HomePage) => HomePage.events
);
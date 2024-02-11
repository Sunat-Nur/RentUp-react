import {createSelector} from "reselect";
import {AppRootState} from "../../../types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;

export const retrieveTargetCompanys = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.tartgetCompanys
);
export const retrieveChosenCompany = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.chosenCompany
);
export const retrieveTargetAllProducts = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.targetAllProducts
);
export const retrieveChosenProduct = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.chosenProduct
);
export const retrieveComments = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.comments
);




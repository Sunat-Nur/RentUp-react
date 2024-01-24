import {createSelector} from "reselect";
import {AppRootState} from "../../../types/screen";

const selectProductPage = (state: AppRootState) => state.ProductPage;
export const retrieveTargetCompanys = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.tartgetCompanys
);
export const retrieveRandomCompanys = createSelector(
    selectProductPage,
    (ProductPage) => ProductPage.randomCompanys
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



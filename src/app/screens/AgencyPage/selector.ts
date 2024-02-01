import {createSelector} from "reselect";
import {AppRootState} from "../../../types/screen";

const selectAgencyPage = (state: AppRootState) => state.agencyPage;

export const retrieveTargetCompanys = createSelector(
    selectAgencyPage,
    (ProductPage) => ProductPage.tartgetCompanys
);

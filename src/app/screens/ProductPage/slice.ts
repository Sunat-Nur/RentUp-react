import {createSlice} from "@reduxjs/toolkit";
import {ProductPageState} from "../../../types/screen";

const initialState: ProductPageState = {
    tartgetCompanys: [],
    randomCompanys: [],
    chosenCompany: null,
    targetAllProducts: [],
    chosenProduct: null,
};

const companyPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setTargetCompany: (state, action) => {
            state.tartgetCompanys=action.payload;
        },
        setRandomCompanys: (state, action) => {
            state.randomCompanys = action.payload;
        },
        setChosenCompany: (state, action) => {
            state.chosenCompany = action.payload;
        },
        setTargetAllProducts: (state, action) => {
            state.targetAllProducts = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
    }
})
export const {
    setTargetCompany,
    setRandomCompanys,
    setChosenCompany,
    setTargetAllProducts,
    setChosenProduct,
} = companyPageSlice.actions;

const CompanyPageReducer = companyPageSlice.reducer;
export default CompanyPageReducer;
import {createSlice} from "@reduxjs/toolkit";
import {ProductPageState} from "../../../types/screen";

const initialState: ProductPageState = {
    tartgetCompanys: [],
    chosenCompany: null,
    targetAllProducts: [],
    chosenProduct: null,
    comments: [],
};

const companyPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setTargetCompany: (state, action) => {
            state.tartgetCompanys=action.payload;
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
        setComments: (state, action) => {
            state.comments = action.payload;
        },
    }
})
export const {
    setTargetCompany,
    setChosenCompany,
    setTargetAllProducts,
    setChosenProduct,
    setComments,
} = companyPageSlice.actions;

const CompanyPageReducer = companyPageSlice.reducer;
export default CompanyPageReducer;
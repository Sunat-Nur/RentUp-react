import {createSlice} from "@reduxjs/toolkit";
import {AgencyPageState} from "../../../types/screen";

const initialState: AgencyPageState = {
    tartgetCompanys: [],
};

const agencyPageSlice = createSlice({
    name: "agencyPage",
    initialState,
    reducers: {
        setTargetCompany: (state, action) => {
            state.tartgetCompanys = action.payload;
        },
    },
});

export const {
    setTargetCompany,
} = agencyPageSlice.actions;

const AgencyPageReducer = agencyPageSlice.reducer;
export default AgencyPageReducer;
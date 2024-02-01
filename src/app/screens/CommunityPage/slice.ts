import {createSlice} from "@reduxjs/toolkit";
import {CommunityPageState} from "../../../types/screen";


const initialState: CommunityPageState = {
    targetBoArticles: [],
};

const CommunityPageSlice = createSlice({
    name: "communityPage",
    initialState,
    reducers: {
        setTargetBoArticles: (state, action) => {
            state.targetBoArticles = action.payload
        },
    },
});


export const { setTargetBoArticles} = CommunityPageSlice.actions;
const CommunityPageReducer = CommunityPageSlice.reducer;
export default CommunityPageReducer;
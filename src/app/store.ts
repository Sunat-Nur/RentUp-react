import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from "./screens/HomePage/slice";
import ProductPageReducer from "./screens/ProductPage/slice";
import {MemberPageReducer} from "./screens/MemberPage/slice";
import CommunityPageReducer from "./screens/CommunityPage/slice";
import AgencyPageReducer from "./screens/AgencyPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductPageReducer,
    agencyPage: AgencyPageReducer,
    communityPage: CommunityPageReducer,
    memberPage: MemberPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from "./screens/HomePage/slice";
import ProductPageReducer from "./screens/ProductPage/slice";
import {MemberPageReducer} from "./screens/MemberPage/slice";
import {MemberPage} from "./screens/MemberPage";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductPageReducer,
    // communityPage: CommunityPageReducer,
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

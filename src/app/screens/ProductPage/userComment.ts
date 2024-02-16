import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setComments } from "./slice";
import { retrieveComments } from "./selector";
import { Comment } from "../../../types/others";

//redux slice
export const actionDispatch = (dispatch: Dispatch) => ({
  setComments: (data: Comment[]) => dispatch(setComments(data)),
});

//redux selector
export const PrDetailRetriever = createSelector(
  retrieveComments,
  (comments) => ({
    comments,
  })
);

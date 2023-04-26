import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthState } from "../slices/auth";

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const userSelector = createSelector(authSelector, (auth) => auth.user);

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  (auth) => auth.authenticated
);

export const loadingSelector = createSelector(
  authSelector,
  (auth) => auth.loading
);

export const errorSelector = createSelector(authSelector, (auth) => auth.error);

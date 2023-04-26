import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AppState } from "../slices/app";

export const appSelector: (state: RootState) => AppState = (state: RootState) =>
  state.app;

export const themeSelector = createSelector(
  appSelector,
  (app: AppState) => app.theme
);

export const languageSelector = createSelector(
  appSelector,
  (app: AppState) => app.language
);

export const languagesSelector = createSelector(
  appSelector,
  (app: AppState) => app.languages
);

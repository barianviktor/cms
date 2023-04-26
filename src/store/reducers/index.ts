import { combineReducers } from "redux";
import { reducer as authReducer } from "../slices/auth";
import { reducer as appState } from "../slices/app";
const rootReducer = combineReducers({
  auth: authReducer,
  app: appState,
});

export default rootReducer;

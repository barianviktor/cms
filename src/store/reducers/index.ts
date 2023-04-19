import { combineReducers } from "redux";
import counterReducer from "../slices/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;

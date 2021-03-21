import { combineReducers } from "redux";
import tagsReducer from "./features/tags/reducer";

const rootReducer = combineReducers({
  tagsReducer,
});

export default rootReducer;

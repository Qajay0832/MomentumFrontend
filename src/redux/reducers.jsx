import { combineReducers } from "redux";
import graphReducer from "./graphReducer.jsx";
import dependenciesReducer from "./dependencyReducer.jsx";

const rootReducer = combineReducers({
  dependency: dependenciesReducer,
  graph: graphReducer,
});
export default rootReducer;

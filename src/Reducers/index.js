//npm i redux-devtools-extension
//npm i react-redux redux

import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducerLog from "./login";


const reducers = combineReducers({ reducerLog });
const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
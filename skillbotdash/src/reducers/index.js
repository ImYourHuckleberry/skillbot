import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import reducer from "./coreData";


const rootReducer = combineReducers({ reducer:reducer, form:form })
export default (rootReducer);

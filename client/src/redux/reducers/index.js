import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import bootcamps from "./bootcamps";

export default combineReducers({ auth, alerts, bootcamps });

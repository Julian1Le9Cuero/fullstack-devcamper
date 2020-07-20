import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import bootcamps from "./bootcamps";
import courses from "./courses";

export default combineReducers({ auth, alerts, bootcamps, courses });

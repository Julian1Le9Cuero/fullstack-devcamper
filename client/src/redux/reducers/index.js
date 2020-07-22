import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import bootcamps from "./bootcamps";
import courses from "./courses";
import reviews from "./reviews";

export default combineReducers({ auth, alerts, bootcamps, courses, reviews });

import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";

export default combineReducers({ auth, alerts });

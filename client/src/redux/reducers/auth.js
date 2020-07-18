import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        error: payload,
        loading: false,
        isAuthenticated: false,
        ...state,
      };
    default:
      return state;
  }
};

export default auth;

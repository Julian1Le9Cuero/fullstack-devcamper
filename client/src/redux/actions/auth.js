import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

import { createAlert } from "./alert";

// Get current logged in user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/auth/me");

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

// Register user
export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/v1/auth/register", formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });

    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }

    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/v1/auth/login", formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });

    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/auth/logout");
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

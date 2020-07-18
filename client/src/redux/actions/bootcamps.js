import axios from "axios";
import {
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  ADD_BOOTCAMP,
  REMOVE_BOOTCAMP,
  BOOTCAMP_ERROR,
} from "./types";

import composeUrl from "../../utils/composeUrl";

// Fetch all bootcamps
export const getBootcamps = (filters) => async (dispatch) => {
  const url = composeUrl("/api/v1/bootcamps", filters);

  try {
    const res = await axios.get(url);

    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

// Get bootcamps by radius
export const getBootcampsByRadius = (zipcode, miles) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/radius/${zipcode}/${miles}`);

    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

//   Get single bootcamp
export const getBootcamp = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}`);

    dispatch({
      type: GET_BOOTCAMP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

//   Add bootcamp
export const addBootcamp = (formData) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/bootcamps", formData, config);

    dispatch({
      type: ADD_BOOTCAMP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

// Update bootcamp
export const updateBootcamp = (bootcampId, formData) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/v1/bootcamps/${bootcampId}`,
      formData,
      config
    );

    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

// Delete bootcamp
export const deleteBootcamp = (bootcampId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/bootcamps/${bootcampId}`);

    dispatch({
      type: REMOVE_BOOTCAMP,
      payload: bootcampId,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

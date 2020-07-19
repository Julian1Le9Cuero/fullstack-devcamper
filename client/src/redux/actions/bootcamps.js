import axios from "axios";
import {
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  ADD_BOOTCAMP,
  REMOVE_BOOTCAMP,
  BOOTCAMP_ERROR,
  IS_LOADING,
} from "./types";

import composeUrl from "../../utils/composeUrl";
import { createAlert } from "./alert";

// Fetch all bootcamps
export const getBootcamps = (filters, location) => async (dispatch) => {
  let url = "/api/v1/bootcamps?limit=4";
  if (filters) {
    // Get bootcamps with filters if provided
    url = composeUrl("/api/v1/bootcamps", filters);
  } else if (location) {
    // Get bootcamps by radius
    const { zipcode, miles } = location;
    // Check if both zipcode and miles are not empty
    if (zipcode && miles) {
      url = `${url}/radius/${zipcode}/${miles}`;
    }
  }
  console.log(location);
  console.log(url);
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
export const addBootcamp = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/bootcamps", formData, config);

    dispatch({
      type: IS_LOADING,
    });

    dispatch({
      type: ADD_BOOTCAMP,
      payload: res.data,
    });

    history.push("/manage-bootcamp");
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
      type: ADD_BOOTCAMP,
      payload: res.data,
    });

    dispatch(createAlert("Bootcamp updated.", "success", 3000));
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: error,
    });
  }
};

// Delete bootcamp
export const deleteBootcamp = (bootcampId) => async (dispatch) => {
  if (window.confirm("Are you sure? This action can NOT be undone.")) {
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
  }
};

// Make the page load after a request is sent
export const isLoading = () => (dispatch) => {
  dispatch({
    type: IS_LOADING,
  });
};
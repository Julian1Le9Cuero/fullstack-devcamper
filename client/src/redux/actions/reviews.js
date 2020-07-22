import axios from "axios";

import {
  GET_REVIEWS,
  GET_REVIEW,
  REMOVE_REVIEW,
  REVIEW_ERROR,
  LOAD_REVIEW,
  UNLOAD_REVIEW,
} from "./types";

import { createAlert } from "./alert";

import composeUrl from "../../utils/composeUrl";

// Get all reviews from database or get reviews by bootcamp
export const getReviews = (bootcampId, filters) => async (dispatch) => {
  let url = "/api/v1/reviews";
  if (bootcampId) {
    url = `/api/v1/bootcamps/${bootcampId}/reviews`;
  } else if (filters) {
    url = composeUrl(url, filters);
  }

  try {
    const res = await axios.get(url);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: error.response,
    });
  }
};

// Get review from database by id
export const getReview = (reviewId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/reviews/${reviewId}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: error.response,
    });
  }
};

// Get reviews by user
export const getUserReviews = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/reviews/users/${userId}`);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: error.response,
    });
  }
};

// Add review for a bootcamp
export const addReview = (bootcampId, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/v1/bootcamps/${bootcampId}/reviews`,
      formData,
      config
    );

    // Check: 'Double request to get reviews'
    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });

    dispatch(createAlert("Review added.", "success", 3500));

    history.push("/manage-reviews");
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: error.response,
    });
  }
};

// Load review for the ReviewForm if it's going to be updated
// Only used for the EditReviews Component
export const loadReview = (reviewId) => (dispatch) => {
  dispatch({
    type: LOAD_REVIEW,
    payload: reviewId,
  });
};

// Unload review for the ReviewForm when user is going to add a new one
export const unLoadReview = () => (dispatch) => {
  dispatch({
    type: UNLOAD_REVIEW,
  });
};

// Load Bootcamp Review when user wants to modify the review after watching the bootcamp
// This makes the review load faster for the ReviewForm
export const loadBootcampReview = (review) => (dispatch) => {
  dispatch({
    type: GET_REVIEW,
    payload: { data: review },
  });
};

// Update review from database by id
export const updateReview = (reviewId, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/v1/reviews/${reviewId}`,
      formData,
      config
    );

    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });

    dispatch(createAlert("Review updated.", "success", 2500));

    history.push("/manage-reviews");
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: error.response,
    });
  }
};

// Delete review from database by id
export const removeReview = (reviewId) => async (dispatch) => {
  if (window.confirm("Are you sure? This action can NOT be undone.")) {
    try {
      await axios.delete(`/api/v1/reviews/${reviewId}`);

      dispatch({
        type: REMOVE_REVIEW,
        payload: reviewId,
      });

      dispatch(createAlert("Review removed.", "danger", 2500));
    } catch (error) {
      dispatch({
        type: REVIEW_ERROR,
        payload: error.response,
      });
    }
  }
};

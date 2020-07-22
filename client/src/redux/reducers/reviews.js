import {
  GET_REVIEWS,
  GET_REVIEW,
  REMOVE_REVIEW,
  LOAD_REVIEW,
  UNLOAD_REVIEW,
  REVIEW_ERROR,
} from "../actions/types";

const initialState = {
  reviews: [],
  review: null,
  error: null,
  loading: true,
};

const reviews = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload.data,
        loading: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload.data,
        loading: false,
      };
    case REMOVE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id.toString() !== payload
        ),
        loading: false,
      };
    case LOAD_REVIEW:
      return {
        ...state,
        review: state.reviews.find(
          (review) => review._id.toString() === payload
        ),
        loading: false,
      };
    case UNLOAD_REVIEW:
      return {
        ...state,
        review: null,
        loading: false,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reviews;

import {
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  ADD_BOOTCAMP,
  REMOVE_BOOTCAMP,
  BOOTCAMP_ERROR,
  IS_LOADING,
  ADD_PHOTO,
} from "../actions/types";

const initialState = {
  bootcamps: [],
  bootcamp: null,
  results: 0,
  total: 0,
  pagination: {},
  loading: true,
  error: null,
  uploadedPhoto: null,
};

const bootcamps = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: payload.data,
        results: payload.count,
        total: payload.total,
        pagination: payload.pagination,
        loading: false,
      };
    case ADD_BOOTCAMP:
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: payload.data,
        loading: false,
      };
    case REMOVE_BOOTCAMP:
      return {
        ...state,
        bootcamp: null,
        loading: false,
      };
    case BOOTCAMP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_PHOTO:
      return {
        ...state,
        uploadedPhoto: payload.data,
        loading: false,
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default bootcamps;

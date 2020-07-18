import {
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  ADD_BOOTCAMP,
  REMOVE_BOOTCAMP,
  BOOTCAMP_ERROR,
} from "../actions/types";

const initialState = {
  bootcamps: [],
  bootcamp: null,
  results: 0,
  pagination: {},
  loading: true,
  error: null,
};

const bootcamps = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOTCAMPS:
    case ADD_BOOTCAMP:
      return {
        ...state,
        bootcamps: payload.data,
        results: payload.count,
        pagination: payload.pagination,
        loading: false,
      };
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: payload,
        loading: false,
      };
    case REMOVE_BOOTCAMP:
      return {
        ...state,
        bootcamps: state.bootcamps.filter(
          (bootcamp) => bootcamp._id !== payload
        ),
        loading: false,
      };
    case BOOTCAMP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bootcamps;

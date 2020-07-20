import {
  GET_COURSES,
  GET_COURSE,
  REMOVE_COURSE,
  COURSE_ERROR,
} from "../actions/types";

const initialState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

const courses = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case REMOVE_COURSE:
      return {
        ...state,
        course: null,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default courses;

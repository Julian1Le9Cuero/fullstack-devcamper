import {
  GET_COURSES,
  GET_COURSE,
  REMOVE_COURSE,
  COURSE_ERROR,
  LOAD_COURSE,
  UNLOAD_COURSE,
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
        courses: payload.data,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload.data,
        loading: false,
      };
    case REMOVE_COURSE:
      return {
        ...state,
        course: null,
        loading: false,
        courses: state.courses.filter(
          (course) => course._id.toString() !== payload
        ),
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOAD_COURSE:
      return {
        ...state,
        course: state.courses.find(
          (course) => course._id.toString() === payload
        ),
        loading: false,
      };
    case UNLOAD_COURSE:
      return {
        ...state,
        course: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default courses;

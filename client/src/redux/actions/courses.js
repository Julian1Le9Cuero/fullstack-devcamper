import axios from "axios";
import {
  GET_COURSES,
  GET_COURSE,
  REMOVE_COURSE,
  COURSE_ERROR,
  LOAD_COURSE,
  UNLOAD_COURSE,
} from "./types";

import { createAlert } from "./alert";

import composeUrl from "../../utils/composeUrl";

// Get all courses from database or get courses by bootcamp
export const getCourses = (bootcampId, filters) => async (dispatch) => {
  let url = "/api/v1/courses";
  if (bootcampId) {
    url = `/api/v1/bootcamps/${bootcampId}/courses`;
  } else if (filters) {
    url = composeUrl(url, filters);
  }

  try {
    const res = await axios.get(url);

    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: error.response,
    });
  }
};

// Get course from database by id
export const getCourse = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/courses/${courseId}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: error.response,
    });
  }
};

// Add course for a bootcamp
export const addCourse = (bootcampId, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/api/v1/bootcamps/${bootcampId}/courses`,
      formData,
      config
    );

    dispatch(getCourses(bootcampId));

    dispatch(createAlert("Course created.", "success", 3500));

    history.push("/manage-courses");
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: error.response,
    });
  }
};

// Load course for the CourseForm
export const loadCourse = (courseId) => (dispatch) => {
  dispatch({
    type: LOAD_COURSE,
    payload: courseId,
  });
};

// Unload course for the CourseForm when user is going to add a new course
export const unLoadCourse = () => (dispatch) => {
  dispatch({
    type: UNLOAD_COURSE,
  });
};

// Update course from database by id
export const updateCourse = (courseId, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/v1/courses/${courseId}`,
      formData,
      config
    );

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });

    dispatch(createAlert("Course updated.", "success", 2500));

    history.push("/manage-courses");
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: error.response,
    });
  }
};

// Delete course from database by id
export const deleteCourse = (courseId) => async (dispatch) => {
  if (window.confirm("Are you sure? This action can NOT be undone.")) {
    try {
      await axios.delete(`/api/v1/courses/${courseId}`);

      dispatch({
        type: REMOVE_COURSE,
        payload: courseId,
      });

      dispatch(createAlert("Course deleted.", "danger", 2500));
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  }
};

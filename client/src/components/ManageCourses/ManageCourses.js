import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import AddCourse from "./AddCourse";
import EditCourses from "./EditCourses";

import { getCourses } from "../../redux/actions/courses";

const ManageCourses = ({ user, loading, getCourses, courses }) => {
  useEffect(() => {
    if (user.bootcamps[0]) {
      getCourses(user.bootcamps[0]._id);
    }
  }, [getCourses, user.bootcamps]);

  if (user && user.role === "user") {
    return <Redirect to="/bootcamps" />;
  }

  return loading ? (
    <Spinner />
  ) : user.courses.length > 0 || courses.length > 0 ? (
    <EditCourses />
  ) : (
    <AddCourse />
  );
};

ManageCourses.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  courses: state.courses.courses,
});

export default connect(mapStateToProps, { getCourses })(ManageCourses);

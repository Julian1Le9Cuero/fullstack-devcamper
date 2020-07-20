import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import AddCourse from "./AddCourse";
import EditCourses from "./EditCourses";

const ManageCourses = ({ user, loading }) => {
  if (user && user.role === "user") {
    return <Redirect to="/bootcamps" />;
  }
  return loading ? (
    <Spinner />
  ) : user.courses.length > 0 ? (
    <EditCourses />
  ) : (
    <AddCourse />
  );
};

ManageCourses.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(ManageCourses);

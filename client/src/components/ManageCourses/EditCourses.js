import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Alert from "../Alert/Alert";
import BootcampItem from "../Bootcamps/BootcampItem";
import EditCoursesItems from "./EditCoursesItems";

import { unLoadCourse } from "../../redux/actions/courses";

const EditCourses = ({ courses, user, unLoadCourse }) => {
  // Get user bootcamp from db or get the recently added bootcamp
  const userBootcamp = user.bootcamps[0];

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <Alert />
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              <BootcampItem bootcamp={userBootcamp} />

              <Link
                to="/add-course"
                className="btn btn-primary btn-block mb-4"
                onClick={() => unLoadCourse()}
              >
                Add Bootcamp Course
              </Link>
              {courses && courses.length > 0 && (
                <EditCoursesItems courses={courses} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EditCourses.propTypes = {
  courses: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  unLoadCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  user: state.auth.user,
});

export default connect(mapStateToProps, { unLoadCourse })(EditCourses);

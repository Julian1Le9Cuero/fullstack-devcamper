import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loadCourse, deleteCourse } from "../../redux/actions/courses";

const EditCoursesItems = ({ courses, loadCourse, deleteCourse }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {courses.map(({ _id, title }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>
              <Link
                to="/add-course"
                className="btn btn-secondary"
                onClick={() => loadCourse(_id)}
              >
                <i className="fas fa-pencil-alt"></i>
              </Link>{" "}
              <button
                className="btn btn-danger"
                onClick={() => deleteCourse(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EditCoursesItems.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadCourse: PropTypes.func.isRequired,
};

export default connect(null, { loadCourse, deleteCourse })(EditCoursesItems);

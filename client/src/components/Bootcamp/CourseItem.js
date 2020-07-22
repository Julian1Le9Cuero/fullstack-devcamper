import React from "react";
import PropTypes from "prop-types";

const CourseItem = ({ course }) => {
  const {
    title,
    description,
    tuition,
    minimumSkill,
    weeks,
    scholarshipsAvailable,
  } = course;

  return (
    <div className="card mb-3">
      <h5 className="card-header bg-primary text-white">{title}</h5>
      <div className="card-body">
        <h5 className="card-title">Duration: {weeks} Weeks</h5>
        <p className="card-text">{description}</p>
        <ul className="list-group mb-3">
          <li className="list-group-item">Cost: ${tuition} USD</li>
          <li className="list-group-item">
            Skill Required: {minimumSkill.toString()}
          </li>
          <li className="list-group-item">
            Scholarship Available:{" "}
            <i
              className={`fas fa-${
                scholarshipsAvailable ? "check" : "times"
              } text-${scholarshipsAvailable ? "success" : "danger"}`}
            ></i>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;

import React from "react";
// import PropTypes from "prop-types";

const CourseItem = () => {
  return (
    <div className="card mb-3">
      <h5 className="card-header bg-primary text-white">
        Front End Web Development
      </h5>
      <div className="card-body">
        <h5 className="card-title">Duration: 8 Weeks</h5>
        <p className="card-text">
          This course will provide you with all of the essentials to become a
          successful frontend web developer. You will learn to master HTML, CSS
          and front end JavaScript, along with tools like Git, VSCode and front
          end frameworks like Vue
        </p>
        <ul className="list-group mb-3">
          <li className="list-group-item">Cost: $8,000 USD</li>
          <li className="list-group-item">Skill Required: Beginner</li>
          <li className="list-group-item">
            Scholarship Available: <i className="fas fa-check text-success"></i>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

// CourseItem.propTypes = {};

export default CourseItem;

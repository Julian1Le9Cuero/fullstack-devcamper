import React from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const BootcampReviews = () => {
  return (
    <section className="bootcamp mt-5">
      <div className="container">
        <div className="row">
          {/* Main col  */}
          <div className="col-md-8">
            <Link
              to="/bootcamp"
              target="_blank"
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Bootcamp Info
            </Link>
            <h1 className="mb-4">DevWorks Bootcamp Reviews</h1>
            {/* Reviews  */}
            <div className="card mb-3">
              <h5 className="card-header bg-dark text-white">
                Fantastic Bootcamp
              </h5>
              <div className="card-body">
                <h5 className="card-title">
                  Rating: <span className="text-success">10</span>
                </h5>
                <p className="card-text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi similique mollitia, praesentium, animi harum officia
                  dolores corporis ex tempore consequuntur dolorem ullam dolorum
                  magnam corrupti quaerat tempora repudiandae! Similique,
                  molestiae. Iste, blanditiis recusandae unde tenetur eius
                  exercitationem rerum a fuga.
                </p>
                <p className="text-muted">Writtern By Kevin Smith</p>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-md-4">
            {/* Rating  */}
            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                8.8
              </span>
              Rating
            </h1>
            {/*  Buttons */}
            <Link to="/add-review" className="btn btn-primary btn-block my-3">
              <i className="fas fa-pencil-alt"></i> Review This Bootcamp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* BootcampReviews.propTypes = {} */

export default BootcampReviews;

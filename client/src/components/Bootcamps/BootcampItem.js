import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BootcampItem = ({ bootcamp, uploadedPhoto }) => {
  const { _id, name, careers, location, averageRating, photo } = bootcamp;
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={
              uploadedPhoto ? `uploads/${uploadedPhoto}` : `uploads/${photo}`
            }
            className="card-img"
            alt="bootcamp"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/bootcamp/${_id}`}>
                {name}
                <span className="float-right badge badge-success">
                  {averageRating ? averageRating : "New"}
                </span>
              </Link>
            </h5>
            <span className="badge badge-dark mb-2">
              {location.formattedAddress.split(",").slice(1, 3).join(", ")}
            </span>
            <p className="card-text">{careers.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BootcampItem.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

export default BootcampItem;

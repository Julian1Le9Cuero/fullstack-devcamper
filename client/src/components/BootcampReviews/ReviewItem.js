import React from "react";
import PropTypes from "prop-types";

const ReviewItem = ({ review }) => {
  const {
    title,
    rating,
    text,
    user: { name: username },
  } = review;

  return (
    <div className="card mb-3">
      <h5 className="card-header bg-dark text-white">{title}</h5>
      <div className="card-body">
        <h5 className="card-title">
          Rating: <span className="text-success">{rating}</span>
        </h5>
        <p className="card-text">{text}</p>
        <p className="text-muted">Written By {username}</p>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;

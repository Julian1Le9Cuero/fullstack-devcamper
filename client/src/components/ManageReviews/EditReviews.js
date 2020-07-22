import React from "react";
import PropTypes from "prop-types";
import EditReviewsItems from "./EditReviewsItems";

const EditReviews = ({ reviews }) => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Reviews</h1>
              {reviews && reviews.length > 0 && (
                <EditReviewsItems reviews={reviews} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EditReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default EditReviews;

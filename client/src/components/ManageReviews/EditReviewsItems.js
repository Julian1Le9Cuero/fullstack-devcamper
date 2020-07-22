import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadReview, removeReview } from "../../redux/actions/reviews";

const EditReviewsItems = ({ reviews, loadReview, removeReview }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Bootcamp</th>
          <th scope="col">Rating</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(({ _id, rating, bootcamp }) => (
          <tr key={_id}>
            <td>{bootcamp.name}</td>
            <td>{rating}</td>
            <td>
              <Link
                to="/add-review"
                className="btn btn-secondary"
                onClick={() => loadReview(_id)}
              >
                <i className="fas fa-pencil-alt"></i>
              </Link>{" "}
              <button
                className="btn btn-danger"
                onClick={() => removeReview(_id)}
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

EditReviewsItems.propTypes = {
  reviews: PropTypes.array.isRequired,
  loadReview: PropTypes.func.isRequired,
  removeReview: PropTypes.func.isRequired,
};

export default connect(null, { loadReview, removeReview })(EditReviewsItems);

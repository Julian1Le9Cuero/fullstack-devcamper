import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../Spinner/Spinner";
import ReviewItem from "./ReviewItem";

import { getBootcamp, isLoading } from "../../redux/actions/bootcamps";
import {
  loadBootcampReview,
  unLoadReview,
  getReviews,
} from "../../redux/actions/reviews";

class BootcampReviews extends React.Component {
  componentDidMount() {
    const bootcampId = this.props.match.params.bootcampId;
    this.props.isLoading();
    this.props.getBootcamp(bootcampId);
    this.props.getReviews(bootcampId);
  }

  render() {
    const {
      bootcamp,
      bootcampLoading,
      reviewsLoading,
      reviews,
      user,
    } = this.props;
    let currentUserHasReview;

    if (bootcamp && bootcamp.reviews.length && user) {
      currentUserHasReview = bootcamp.reviews.find(
        (review) => review.user.toString() === user._id
      );
    }

    const { _id, name, averageRating } = bootcamp;

    return bootcampLoading || !bootcamp ? (
      <Spinner />
    ) : (
      <section className="bootcamp mt-5">
        <div className="container">
          <div className="row">
            {/* Main col  */}
            <div className="col-md-8">
              <Link to={`/bootcamp/${_id}`} className="btn btn-secondary my-3">
                <i className="fas fa-chevron-left"></i> Bootcamp Info
              </Link>
              <h1 className="mb-4">{name} Reviews</h1>
              {/* Reviews  */}
              {reviewsLoading ? (
                <Spinner />
              ) : reviews.length === 0 ? (
                <h4>This bootcamp has no reviews yet.</h4>
              ) : (
                reviews.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))
              )}
            </div>
            {/* Sidebar */}
            <div className="col-md-4">
              {/* Rating  */}
              <h1 className="text-center my-4">
                Rating{" "}
                <span className="badge badge-secondary badge-success rounded-circle p-3">
                  {averageRating ? averageRating : "New"}
                </span>
              </h1>
              {/*  Buttons */}
              {!user || user.role !== "user" ? null : currentUserHasReview ? (
                <Link
                  to="/add-review"
                  className="btn btn-primary btn-block my-3"
                  onClick={() =>
                    this.props.loadBootcampReview(currentUserHasReview)
                  }
                >
                  <i className="fas fa-pencil-alt"></i> Modify Review
                </Link>
              ) : (
                <Link
                  to="/add-review"
                  className="btn btn-primary btn-block my-3"
                  onClick={() => this.props.unLoadReview()}
                >
                  <i className="fas fa-pencil-alt"></i> Write a Review
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

BootcampReviews.propTypes = {
  loadBootcampReview: PropTypes.func.isRequired,
  unLoadReview: PropTypes.func.isRequired,
  getBootcamp: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  bootcamp: state.bootcamps.bootcamp,
  bootcampLoading: state.bootcamps.loading,
  reviewsLoading: state.reviews.loading,
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps, {
  loadBootcampReview,
  unLoadReview,
  getBootcamp,
  isLoading,
  getReviews,
})(BootcampReviews);

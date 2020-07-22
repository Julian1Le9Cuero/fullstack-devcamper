import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EditReviews from "./EditReviews";
import AddReview from "./AddReview";
import Spinner from "../Spinner/Spinner";

import { getUserReviews } from "../../redux/actions/reviews";

const ManageReviews = ({ user, loading, getUserReviews, reviews }) => {
  useEffect(() => {
    getUserReviews(user._id);
  }, [getUserReviews, user]);

  if (user && user.role === "publisher") {
    return <Redirect to="/bootcamps" />;
  }

  return loading && !reviews ? (
    <Spinner />
  ) : reviews.length > 0 ? (
    <EditReviews reviews={reviews} />
  ) : (
    <AddReview />
  );
};

ManageReviews.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getUserReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.reviews.loading,
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps, { getUserReviews })(ManageReviews);

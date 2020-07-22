import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EditReviews from "./EditReviews";
import AddReview from "./AddReview";
import Spinner from "../Spinner/Spinner";

const ManageReviews = ({ user, loading, getUserReviews }) => {
  useEffect(() => {
    getUserReviews();
  }, [getUserReviews]);

  if (user && user.role === "publisher") {
    return <Redirect to="/bootcamps" />;
  }

  return loading ? (
    <Spinner />
  ) : user && user.reviews.length > 0 ? (
    <EditReviews reviews={user.reviews} />
  ) : (
    <AddReview />
  );
};

ManageReviews.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser, isLoading })(ManageReviews);

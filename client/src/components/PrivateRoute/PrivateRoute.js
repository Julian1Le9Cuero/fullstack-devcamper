import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({
  component: Component,
  loading,
  isAuthenticated,
  ...otherProps
}) => {
  return loading ? (
    <Spinner />
  ) : (
    <Route
      {...otherProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);

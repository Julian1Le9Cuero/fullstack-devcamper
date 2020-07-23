import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AddBootcamp from "./AddBootcamp";
import EditBootcamp from "./EditBootcamp";
import Spinner from "../Spinner/Spinner";

const ManageBootcamp = ({ user, loading }) => {
  if (user && user.role === "user") {
    return <Redirect to="/bootcamps" />;
  }

  return loading ? (
    <Spinner />
  ) : user.bootcamps.length > 0 ? (
    <EditBootcamp />
  ) : (
    <AddBootcamp />
  );
};

ManageBootcamp.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(ManageBootcamp);

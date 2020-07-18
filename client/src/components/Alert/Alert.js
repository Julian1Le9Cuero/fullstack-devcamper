import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.type}`} role="alert">
      {alert.message}
    </div>
  ));
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);

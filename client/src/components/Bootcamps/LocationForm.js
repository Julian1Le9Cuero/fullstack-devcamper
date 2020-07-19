import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getBootcamps } from "../../redux/actions/bootcamps";

const LocationForm = ({ getBootcamps }) => {
  const [locationData, setLocation] = useState({
    zipcode: "",
    miles: "",
  });

  const { zipcode, miles } = locationData;

  const handleChange = (e) => {
    setLocation({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getBootcamps(null, { zipcode, miles });
    setLocation({ zipcode: "", miles: "" });
  };

  return (
    <Fragment>
      <h4 className="mb-3">By Location</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="miles"
                placeholder="Miles From"
                value={miles}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="zipcode"
                value={zipcode}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Zipcode"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Find Bootcamps"
          className="btn btn-primary btn-block"
        />
      </form>
    </Fragment>
  );
};

LocationForm.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
};

export default connect(null, { getBootcamps })(LocationForm);

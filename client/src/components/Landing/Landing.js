import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamps } from "../../redux/actions/bootcamps";

const Landing = ({ getBootcamps, history }) => {
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
    history.push("/bootcamps");
  };

  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">Find a Code Bootcamp</h1>
          <p className="lead">
            Find, rate and read reviews on coding bootcamps
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Miles From"
                    onChange={(e) => handleChange(e)}
                    value={miles}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder="Enter Zipcode"
                    onChange={(e) => handleChange(e)}
                    value={zipcode}
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
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
};

export default connect(null, { getBootcamps })(Landing);

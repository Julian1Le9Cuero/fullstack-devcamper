// Route: /reset-password/:resetttoken
import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>
              <form>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="title"
                    className="form-control"
                    placeholder="Password"
                    value=""
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    value=""
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Update Password"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    {/* <div className="col-md-6">
                      <Link
                        to="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ResetPassword.propTypes = {};

export default ResetPassword;

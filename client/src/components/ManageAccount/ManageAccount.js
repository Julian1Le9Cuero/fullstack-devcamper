// Route: /manage-account
import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ManageAccount = () => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Name"
                    value="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value="jdoe@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </div>
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

// ManageAccount.propTypes = {};

export default ManageAccount;

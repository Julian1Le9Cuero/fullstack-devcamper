import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import { createAlert } from "../../redux/actions/alert";

import Alert from "../Alert/Alert";

const Register = ({ register, isAuthenticated, createAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });

  const { name, email, password, password2, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      // Create alert
      return createAlert("Passwords must match", "danger");
    }

    register({ name, email, password, role });
  };

  if (isAuthenticated) {
    return <Redirect to="/bootcamps" />;
  }

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <Alert />
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-user-plus"></i> Register
                </h1>
                <p>
                  Register to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      onChange={(e) => handleChange(e)}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => handleChange(e)}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) => handleChange(e)}
                      value={password}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      className="form-control"
                      placeholder="Confirm password"
                      onChange={(e) => handleChange(e)}
                      value={password2}
                    />
                  </div>

                  <div className="card card-body mb-3">
                    <h5>User Role</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="user"
                        onChange={(e) =>
                          setFormData({ ...formData, role: "user" })
                        }
                        checked
                      />
                      <label className="form-check-label">
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="publisher"
                        onChange={(e) =>
                          setFormData({ ...formData, role: "publisher" })
                        }
                      />
                      <label className="form-check-label">
                        Bootcamp Publisher
                      </label>
                    </div>
                  </div>
                  <p className="text-danger">
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
                <p>
                  {" "}
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createAlert })(Register);

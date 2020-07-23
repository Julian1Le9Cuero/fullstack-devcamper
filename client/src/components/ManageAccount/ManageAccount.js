import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Alert/Alert";
import { updateUserDetails } from "../../redux/actions/users";

const ManageAccount = ({ updateUserDetails, user }) => {
  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setUserCredentials({ name, email });
    }
  }, [user]);

  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
  });

  const { name, email } = userCredentials;

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(userCredentials);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Alert />
              <h1 className="mb-2">Manage Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
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

ManageAccount.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserDetails })(ManageAccount);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

const Navbar = ({ isAuthenticated, user, logout }) => {
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li className="nav-item d-none d-sm-block">
        <Link className="nav-link" to="/">
          |
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
        >
          <i className="fas fa-user"></i> Account
        </Link>
        <div className="dropdown-menu">
          {user && user.role === "publisher" && (
            <Link className="dropdown-item" to="/manage-bootcamp">
              Manage Bootcamp
            </Link>
          )}
          {user && user.role === "user" && (
            <Link className="dropdown-item" to="/manage-reviews">
              Manage Reviews
            </Link>
          )}
          <Link className="dropdown-item" to="/manage-account">
            Manage Account
          </Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/logout" onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-laptop-code"></i> DevCamper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
            <li className="nav-item">
              <Link className="nav-link" to="/bootcamps">
                Browse Bootcamps
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BootcampItem from "../Bootcamps/BootcampItem";
import { deleteBootcamp } from "../../redux/actions/bootcamps";

const EditBootcamp = ({ user, deleteBootcamp, bootcamp }) => {
  const userBootcamp = user.bootcamps[0] || bootcamp;

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Bootcamp</h1>
              <BootcampItem bootcamp={userBootcamp} />
              <form className="mb-4">
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="photo"
                      className="custom-file-input"
                      id="photo"
                    />
                    <label className="custom-file-label" htmlFor="photo">
                      Add Bootcamp Image
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-light btn-block"
                  value="Upload Image"
                />
              </form>
              <Link to="/add-bootcamp" className="btn btn-primary btn-block">
                Edit Bootcamp Details
              </Link>

              <Link
                to="/manage-courses"
                className="btn btn-secondary btn-block"
              >
                Manage Courses
              </Link>
              <Link
                to="#"
                className="btn btn-danger btn-block"
                onClick={() => deleteBootcamp(userBootcamp._id)}
              >
                Remove Bootcamp
              </Link>
              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EditBootcamp.propTypes = {
  user: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
  deleteBootcamp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  bootcamp: state.bootcamps.bootcamp,
});

export default connect(mapStateToProps, { deleteBootcamp })(EditBootcamp);

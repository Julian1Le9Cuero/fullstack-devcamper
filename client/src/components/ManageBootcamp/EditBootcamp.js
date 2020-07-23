import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import BootcampItem from "../Bootcamps/BootcampItem";
import Alert from "../Alert/Alert";

import {
  deleteBootcamp,
  uploadBootcampPhoto,
} from "../../redux/actions/bootcamps";

const EditBootcamp = ({
  user,
  deleteBootcamp,
  uploadBootcampPhoto,
  uploadedPhoto,
}) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Add Bootcamp Image");

  const userBootcamp = user.bootcamps[0];

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    uploadBootcampPhoto(userBootcamp._id, formData);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Bootcamp</h1>
              <Alert />
              <BootcampItem
                bootcamp={userBootcamp}
                uploadedPhoto={uploadedPhoto}
              />
              <form className="mb-4" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="photo"
                      className="custom-file-input"
                      id="photo"
                      onChange={(e) => handleChange(e)}
                    />
                    <label className="custom-file-label" htmlFor="photo">
                      {fileName}
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
  deleteBootcamp: PropTypes.func.isRequired,
  uploadBootcampPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  uploadedPhoto: state.bootcamps.uploadedPhoto,
});

export default connect(mapStateToProps, {
  deleteBootcamp,
  uploadBootcampPhoto,
})(EditBootcamp);

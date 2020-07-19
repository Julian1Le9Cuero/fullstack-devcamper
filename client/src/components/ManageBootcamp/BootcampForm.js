import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBootcamp, updateBootcamp } from "../../redux/actions/bootcamps";

const BootcampForm = ({ addBootcamp, user, history, updateBootcamp }) => {
  const [bootcampInfo, setBootcampInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
  });

  const bootcamp = user.bootcamps[0];

  useEffect(() => {
    const bootcampDetails = {};
    if (bootcamp) {
      for (const key in bootcamp) {
        if (key in bootcampInfo) {
          bootcampDetails[key] = bootcamp[key];
        }
      }
    }

    setBootcampInfo({
      ...bootcampDetails,
      careers: bootcampDetails.careers.join(", "),
    });
  }, [bootcampInfo, bootcamp]);

  const {
    name,
    address,
    phone,
    email,
    website,
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
  } = bootcampInfo;

  const handleChange = (e) => {
    setBootcampInfo({ ...bootcampInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bootcamp) {
      addBootcamp(bootcampInfo, history);
    } else {
      updateBootcamp(bootcampInfo);
    }
  };

  return (
    <section className="container mt-5">
      <h1 className="mb-2">{bootcamp ? "Update" : "Add"} Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Location & Contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Bootcamp Name"
                    required
                    onChange={(e) => handleChange(e)}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Full Address"
                    required
                    onChange={(e) => handleChange(e)}
                    value={address}
                  />
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    onChange={(e) => handleChange(e)}
                    value={phone}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Contact Email"
                    onChange={(e) => handleChange(e)}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="Website URL"
                    onChange={(e) => handleChange(e)}
                    value={website}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    maxLength="500"
                    onChange={(e) => handleChange(e)}
                    value={description}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-group">
                  <label>Careers</label>
                  <select
                    name="careers"
                    className="custom-select"
                    multiple="multiple"
                    onChange={(e) =>
                      setBootcampInfo({
                        ...bootcampInfo,
                        careers: [...careers, e.target.value],
                      })
                    }
                  >
                    <option defaultValue>Select all that apply</option>
                    <option value="Web Development">Web Development</option>
                    <option defaultValue value="Mobile Development">
                      Mobile Development
                    </option>
                    <option defaultValue value="UI/UX">
                      UI/UX
                    </option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="housing"
                    id="housing"
                    onChange={(e) =>
                      setBootcampInfo({ ...bootcampInfo, housing: !housing })
                    }
                  />
                  <label className="form-check-label" htmlFor="housing">
                    Housing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobAssistance"
                    id="jobAssistance"
                    onChange={(e) =>
                      setBootcampInfo({
                        ...bootcampInfo,
                        jobAssistance: !jobAssistance,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="jobAssistance">
                    Job Assistance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobGuarantee"
                    id="jobGuarantee"
                    onChange={(e) =>
                      setBootcampInfo({
                        ...bootcampInfo,
                        jobGuarantee: !jobGuarantee,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="jobGuarantee">
                    Job Guarantee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="acceptGi"
                    id="acceptGi"
                    onChange={(e) =>
                      setBootcampInfo({ ...bootcampInfo, acceptGi: !acceptGi })
                    }
                  />
                  <label className="form-check-label" htmlFor="acceptGi">
                    Accepts GI Bill
                  </label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Bootcamp"
            className="btn btn-success btn-block my-4"
          />
          <Link to="/manage-bootcamp" className="btn btn-danger btn-block mb-4">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

BootcampForm.propTypes = {
  addBootcamp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateBootcamp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addBootcamp, updateBootcamp })(
  BootcampForm
);

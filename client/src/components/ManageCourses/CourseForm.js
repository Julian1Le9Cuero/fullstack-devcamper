import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCourse, updateCourse } from "../../redux/actions/courses";

class CourseForm extends React.Component {
  state = {
    title: "",
    weeks: "",
    tuition: "",
    minimumSkill: [],
    description: "",
    scholarshipAvailable: false,
  };

  componentDidMount() {
    if (this.props.course) {
      let courseDetails = {};
      for (const key in this.props.course) {
        if (key in this.state) {
          courseDetails[key] = this.props.course[key];
        }
      }
      this.setState(courseDetails);
    }
  }

  render() {
    const { addCourse, updateCourse, user, history, course } = this.props;
    const bootcamp = user.bootcamps[0];

    const handleChange = (e) => {
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (course) {
        updateCourse(course._id, this.state);
      } else {
        addCourse(bootcamp._id, this.state, history);
      }
    };

    const {
      title,
      weeks,
      tuition,
      description,
      scholarshipAvailable,
    } = this.state;

    return (
      <section className="container mt-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <Link
                  to="/manage-courses"
                  className="btn btn-link text-secondary my-3"
                >
                  <i className="fas fa-chevron-left"></i> Manage Courses
                </Link>
                <h1 className="mb-2">DevWorks Bootcamp</h1>
                <h3 className="text-primary mb-4">Add Course</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Course Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Title"
                      onChange={handleChange}
                      value={title}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="number"
                      name="weeks"
                      placeholder="Duration"
                      className="form-control"
                      onChange={handleChange}
                      value={weeks}
                    />
                    <small className="form-text text-muted">
                      Enter the number of weeks that the course lasts
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Course Tuition</label>
                    <input
                      type="number"
                      name="tuition"
                      placeholder="Tuition"
                      className="form-control"
                      onChange={handleChange}
                      value={tuition}
                    />
                    <small className="form-text text-muted">USD Currency</small>
                  </div>
                  <div className="form-group">
                    <label>Minimum Skill Required</label>
                    <select
                      name="minimumSkill"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          minimumSkill: [e.target.value],
                        })
                      }
                    >
                      <option value="beginner" defaultValue>
                        Beginner (Any)
                      </option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="description"
                      rows="5"
                      className="form-control"
                      placeholder="Course description summary"
                      maxLength="500"
                      onChange={handleChange}
                      value={description}
                    ></textarea>
                    <small className="form-text text-muted">
                      No more than 500 characters
                    </small>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="scholarshipAvailable"
                      id="scholarshipAvailable"
                      checked={scholarshipAvailable}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          scholarshipAvailable: !scholarshipAvailable,
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="scholarshipAvailable"
                    >
                      Scholarship Available
                    </label>
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="submit"
                      value="Add Course"
                      className="btn btn-dark btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CourseForm.propTypes = {
  addCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  course: state.courses.course,
});

export default connect(mapStateToProps, { addCourse, updateCourse })(
  CourseForm
);

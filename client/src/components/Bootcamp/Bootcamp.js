import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getBootcamp, isLoading } from "../../redux/actions/bootcamps";
import CourseItem from "./CourseItem";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";

class Bootcamp extends React.Component {
  componentDidMount() {
    this.props.isLoading();
    this.props.getBootcamp(this.props.match.params.id);
  }

  render() {
    let bootcampProps = {};
    if (this.props.bootcamp) {
      bootcampProps = this.props.bootcamp;
    }

    const {
      name,
      description,
      averageCost,
      averageRating,
      website,
      jobGuarantee,
      jobAssistance,
      housing,
      acceptGi,
      photo,
    } = bootcampProps;

    return this.props.loading ? (
      <Spinner />
    ) : (
      <section className="bootcamp mt-5">
        <div className="container">
          <div className="row">
            {/* <!-- Main col --> */}
            <div className="col-md-8">
              <h1>{name}</h1>
              {/* <!-- Description --> */}
              <p>{description}</p>
              {/* <!-- Avg cost --> */}
              <p className="lead mb-4">
                Average Course Cost:{" "}
                <span className="text-primary">
                  {averageCost ? `$${averageCost}` : "No courses added yet."}
                </span>
              </p>
              {/* <!-- Courses --> */}
              <CourseItem />
            </div>
            {/* <!-- Sidebar --> */}
            <div className="col-md-4">
              {/* <!-- Image --> */}
              <img src={`uploads/${photo}`} className="img-thumbnail" alt="" />
              {/* <!-- Rating --> */}
              <h1 className="text-center my-4">
                Rating{" "}
                <span className="badge badge-secondary badge-success rounded-circle p-3">
                  {averageRating ? averageRating : "New"}
                </span>
              </h1>
              {/* <!-- Buttons --> */}
              <Link to="/reviews" className="btn btn-dark btn-block my-3">
                <i className="fas fa-comments"></i> Read Reviews
              </Link>
              <Link to="/add-review" className="btn btn-light btn-block my-3">
                <i className="fas fa-pencil-alt"></i> Write a Review
              </Link>
              {website && (
                <Link
                  to={website}
                  target="_blank"
                  className="btn btn-secondary btn-block my-3"
                >
                  <i className="fas fa-globe"></i> Visit Website
                </Link>
              )}
              {/* <!-- Map --> */}
              <div id="map" style={{ width: "100%", height: "300px" }}></div>
              {/* <!-- Perks --> */}
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">
                  <i
                    className={`fas fa-${housing ? "check" : "times"} text-${
                      housing ? "success" : "danger"
                    }`}
                  ></i>{" "}
                  Housing
                </li>
                <li className="list-group-item">
                  <i
                    className={`fas fa-${
                      jobAssistance ? "check" : "times"
                    } text-${jobAssistance ? "success" : "danger"}`}
                  ></i>{" "}
                  Job Assistance
                </li>
                <li className="list-group-item">
                  <i
                    className={`fas fa-${
                      jobGuarantee ? "check" : "times"
                    } text-${jobGuarantee ? "success" : "danger"}`}
                  ></i>{" "}
                  Job Guarantee
                </li>
                <li className="list-group-item">
                  <i
                    className={`fas fa-${acceptGi ? "check" : "times"} text-${
                      acceptGi ? "success" : "danger"
                    }`}
                  ></i>{" "}
                  Accepts GI Bill
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Bootcamp.propTypes = {
  getBootcamp: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamps.bootcamp,
  loading: state.bootcamps.loading,
});

export default connect(mapStateToProps, { getBootcamp, isLoading })(Bootcamp);

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getBootcamps, isLoading } from "../../redux/actions/bootcamps";

import LocationForm from "./LocationForm";
import FilterBootcampForm from "./FilterBootcampForm";
import BootcampItem from "./BootcampItem";
import Pagination from "./Pagination";
import Spinner from "../Spinner/Spinner";

class Bootcamps extends React.Component {
  componentDidMount() {
    // Check if there are bootcamps in the state,
    // Otherwise retrieve them from db
    if (this.props.bootcamps.length === 0) {
      this.props.getBootcamps();
    }
  }

  render() {
    const { bootcamps } = this.props;

    return (
      <section className="browse my-5">
        <div className="container">
          <div className="row">
            {/* Sidebar  */}
            <div className="col-md-4">
              <div className="card card-body mb-4">
                <LocationForm />
              </div>
              <FilterBootcampForm />
            </div>

            {/* Main col  */}
            <div className="col-md-8">
              {/* Bootcamps  */}
              <h2>Bootcamps</h2>
              {this.props.loading ? (
                <Spinner />
              ) : (
                <Fragment>
                  {bootcamps.map((bootcamp) => (
                    <BootcampItem key={bootcamp._id} bootcamp={bootcamp} />
                  ))}
                  {/* Pagination */}
                  <Pagination />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Bootcamps.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamps: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamps: state.bootcamps.bootcamps,
  loading: state.bootcamps.loading,
});

export default connect(mapStateToProps, { getBootcamps, isLoading })(Bootcamps);

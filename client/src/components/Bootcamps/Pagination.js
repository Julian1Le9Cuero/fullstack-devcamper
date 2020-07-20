import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Pagination = ({ pagination, results }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pagination && pagination.prev && (
          <li className="page-item">
            <Link className="page-link" to="#">
              Previous
            </Link>
          </li>
        )}
        <li className="page-item">
          <Link className="page-link" to="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            3
          </Link>
        </li>
        {pagination && pagination.next && (
          <li className="page-item">
            <Link className="page-link" to="#">
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  results: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  pagination: state.bootcamps.pagination,
  results: state.bootcamps.results,
});

export default connect(mapStateToProps)(Pagination);

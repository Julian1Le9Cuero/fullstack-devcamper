import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getBootcamps } from "../../redux/actions/bootcamps";

const Pagination = ({ pagination, getBootcamps }) => {
  const [currentPage, setCurrentPage] = useState(1);

  let pagesArr = [];
  if (pagination) {
    const { total, limit } = pagination;
    const pages = Math.ceil(total / limit);

    for (let page = 1; page <= pages; page++) {
      pagesArr = [...pagesArr, { id: uuidv4(), page }];
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pagination && pagination.prev && (
          <li className="page-item">
            <Link
              className="page-link"
              to="#"
              onClick={() => {
                getBootcamps({ page: currentPage - 1 });
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </Link>
          </li>
        )}

        {pagesArr.map(({ id, page }) => (
          <li key={id} className="page-item">
            <Link
              className={`page-link ${
                page === currentPage && "page-link-hovered"
              }`}
              to="#"
              onClick={() => {
                getBootcamps({ page });
                setCurrentPage(page);
              }}
            >
              {page}
            </Link>
          </li>
        ))}

        {pagination && pagination.next && (
          <li className="page-item">
            <Link
              className="page-link"
              to="#"
              onClick={() => {
                getBootcamps({ page: currentPage + 1 });
                setCurrentPage(currentPage + 1);
              }}
            >
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
  getBootcamps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pagination: state.bootcamps.pagination,
  results: state.bootcamps.results,
});

export default connect(mapStateToProps, { getBootcamps })(Pagination);

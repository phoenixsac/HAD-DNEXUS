import React from 'react';

const Pagination = ({ doctorsPerPage, totalDoctors, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDoctors / doctorsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber}>
          <button onClick={() => paginate(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;


import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
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


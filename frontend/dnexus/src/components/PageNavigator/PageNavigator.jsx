import React from "react";

import "./PageNavigator.css";

function PageNavigator({ currentPage, totalPages, users, onPageChange }) {
  const pages = [];
  const usersPerPage = 6;

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="page-navigator">
      <p>
        Showing {currentPage * (currentPage > 1 ? usersPerPage - 1 : 0) + 1} -{" "}
        {Math.min(currentPage * usersPerPage, users.length)} entries out of{" "}
        {users.length}
      </p>
      <div className="pagination">{pages}</div>
    </div>
  );
}

export default PageNavigator;

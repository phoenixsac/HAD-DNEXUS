import React from "react";
import { Link } from "react-router-dom";

import "./Unauthorized.css"

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to access this page.</p>
      <p>Please log in with the appropriate credentials or contact the administrator.</p>
      <Link to="/Login">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Unauthorized;
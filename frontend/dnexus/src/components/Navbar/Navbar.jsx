import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

import logoImage from "../assets/logo/nexus blue-crop.png";

const Navbar = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the new page
    navigate("/LoginAs");
    console.log("handleclick called");
  };

  return (
    <div className="header">
      <nav className="navbar-nav">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            <img className="logo" src={logoImage} alt="Logo" />
          </NavLink>
        </div>
        <div className="list">
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/about-us" className="nav-links">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/privacy-policy" className="nav-links">
                Privacy Policy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-links">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="login-btn" 
                  buttonText="LOGIN"
                  onClick={handleClick}>
                  LOGIN
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

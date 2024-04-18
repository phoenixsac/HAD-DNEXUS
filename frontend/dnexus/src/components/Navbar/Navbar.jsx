import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

import logoImage from "../assets/logo/nexus white-crop.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          {/* LOGO */}
          <img className="logo" src={logoImage} alt="Logo" />
        </NavLink>
      </div>
      <div className="list">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-links">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

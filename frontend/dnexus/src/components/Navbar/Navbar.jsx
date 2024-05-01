import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logoImage from "../assets/logo/nexus blue-crop.png";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const handleClick = () => {
      // Navigate to the new page
      navigate("/LoginAs");
      console.log("handleclick called");
    };

    return(
        <div className="navbar-container">
            <div className="nav">

                <div className="logo">
                <NavLink to="/" className="navbar-logo">
                    <img className="logo" src={logoImage} alt="Logo" />
                </NavLink>
                </div>

                <div className="nav-menu">
                    <ul>
                        <li>
                            <NavLink to="/about-us" className="nav-links">
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-us" className="nav-links">
                                Privacy Policy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-us" className="nav-links">
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <button className="login-btn" 
                                buttonText="LOGIN"
                                onClick={handleClick}>
                                LOGIN
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
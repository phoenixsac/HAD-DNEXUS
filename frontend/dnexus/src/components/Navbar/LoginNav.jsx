import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../Authentication/AuthContext";

import logoImage from "../assets/logo/nexus blue-crop.png";

import "./Navbar.css";

const LoginNav = () => {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleClick = () => {
      // Navigate to the new page
      navigate("/");
      console.log("handleclick called");
    };

    const handleLogout = () => {
      console.log("Logging out...");
      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
  
      // Update isLoggedIn state in AuthContext
      setIsLoggedIn(false);
      console.log("handleLogout-isLoggedIn:", isLoggedIn);
  
      // Log navigation
      console.log("Navigating to /");
      navigate("/");
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
                                buttonText="LOGOUT"
                                onClick={handleLogout}>
                                LOGOUT
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default LoginNav;
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./LoginNav.css";

import { AuthContext } from "../Authentication/AuthContext";
import logoImage from "../assets/logo/nexus white-crop.png";

const LoginNav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/AdminDashboard" className="navbar-logo">
          {/* LOGO */}
          <img className="logo" src={logoImage} alt="Logo" />
        </NavLink>
      </div>
      <div className="list">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/AdminDashboard" className="nav-links">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-links">About Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-links">Contact Us</NavLink>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoginNav;




// import React, {useContext} from "react";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Authentication/AuthContext";

// import "./LoginNav.css";
// import logoImage from "../assets/logo/nexus white-crop.png";

// const LoginNav = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

//   const handleLogout = () => {

//     // Clear local storage and session storage
//     localStorage.clear();
//     sessionStorage.clear();

//     // Update isLoggedIn state in AuthContext
//     setIsLoggedIn(false)
//     console.log("handleLogout-isLoggedIn:",isLoggedIn);

//     navigate("/");
//   };


//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <NavLink to="/AdminDashboard" className="navbar-logo">
//           {/* LOGO */}
//           <img className="logo" src={logoImage} alt="Logo" />
//         </NavLink>
//       </div>
//       <div className="list">
//         <ul className="nav-menu">
//           <li className="nav-item">
//             <NavLink to="/AdminDashboard" className="nav-links">
//               Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-links">
//               About Us
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-links">
//               Contact Us
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <button onClick={handleLogout} className="nav-button">
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default LoginNav;

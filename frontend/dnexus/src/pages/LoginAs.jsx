// LoginAs.js
import React from "react";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";
import "./Style/LoginAs.css";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";



function LoginAs() {
  const navigate = useNavigate();

  const handleClick = (persona) => {
    // Handle login persona selection here
    console.log("Logging in as:", persona);
    sessionStorage.setItem("userType", persona); // Store user type in session storage

    switch (persona) {
      case "admin":
        navigate("/Login", { state: { userType: persona } }); 
        break;
      case "doctor":
        navigate("/Login",  { state: { userType: persona } });
        break;
        case "radiologist":
          navigate("/Login",  { state: { userType: persona } });
          break;
      case "lab":
        navigate("/Login",  { state: { userType: persona } });
        break;
      case "patient":
        navigate("/PLogin", { state: { userType: persona } });
        break;
      default:
        // Handle other personas (e.g., display error message or redirect to unauthorized page)
        console.error("Unsupported login persona:", persona);
        break;
    }
  };

  return (
       
    <div>
      <ConditionalNavbar />

      <Breadcrumbs pageTitle="Login As" />

      <div className="login-as">
            <div className="login-container">

              <div className="section">

                  <div className="login-card" onClick={() => handleClick("admin")}>
                    <div className="rectangle" />
                    <div className="placeholder">Admin</div>
                  </div>

                  <div
                    className="login-card" onClick={() => handleClick("doctor")}>
                    <div className="rectangle" />
                    <div className="placeholder">Doctor</div>
                  </div>

                  <div
                    className="login-card" onClick={() => handleClick("radiologist")}>
                    <div className="rectangle" />
                    <div className="placeholder">Radiologist</div>
                  </div>
              
                  <div className="login-card" onClick={() => handleClick("lab")}>
                    <div className="rectangle" />
                    <div className="placeholder">Facility</div>
                  </div>

                  <div className="login-card" onClick={() => handleClick("patient")}>
                    <div className="rectangle" />
                    <div className="placeholder">Patient</div>
                  </div>

              </div>

            </div>

          </div>

          <Footer/>
        </div>
  );
}

export default LoginAs;

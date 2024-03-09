import "./Style/PLogin.css";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add logic to handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);

    navigate("/PatientDash");
  };

  return (
    <div className="main">
      <div className="form-box">
        <div className="welcome">
          <h2>Welcome Back</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2>Sign In</h2>

            {/* {<p className="create-account-text">
          Not Registered? <a href="#">Create an Account</a>
        </p> } */}
           <p className="create-account-text">
              Not Registered? <Link to="/PRegistration">Create an Account</Link>
            </p>

            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            <a href="#" className="forgot-password-link">
              Forgot your password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

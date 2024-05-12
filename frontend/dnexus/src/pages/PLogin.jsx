import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Style/PLogin.css";

import { AuthContext } from "../components/Authentication/AuthContext"; 

function PLogin() {

  const navigate = useNavigate();
  const { setIsLoggedIn, setActorId } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userType = sessionStorage.getItem("userType"); // Access userType from state

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("usertype:",userType);
    
    if (!userType) {
      // Handle error or redirect to selection page if userType is missing
      console.error("User type not found in session storage.");
      return;
    }

    // Add logic to handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("UserType:", userType);

    const data = {
      email,
      password,
      userType
    };

    console.log("data:", data);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/issue-jwt",
        {
          email: email,
          password: password,
          userType: userType
        }
        );

      // const response = await axios.post("http://localhost:8081/auth/issue-jwt", data);


      if (response.status !== 200) {
        alert('INVALID LOGIN CREDENTIALS');
        // Do something here on invalid login
      } else {
        console.log("Login successful",response.data);

        setIsLoggedIn(true);

        const token = response.data.jwtToken;
        localStorage.setItem('jwtToken', token);

        // Store actorId in context state
        setActorId(response.data.actorId);
        const actorId = response.data.actorId;
        localStorage.setItem('actorId', actorId);

        navigate("/patient/dashboard");

      }
    } 
    catch (error) {
      console.error("Error:", error);
      alert("Connection error!"); // Replace with informative message
    }

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
              Not Registered? <Link className="create-account-link" to="/patient/registration">Create an Account</Link>
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

            <Link href="#" className="forgot-password-link">
              Forgot your password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PLogin;

import React, { useState, useContext } from "react";
import axios from "axios"

import "./Style/Login.css";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authentication/AuthContext"; // Import AuthContext

function Login() {

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); // Use context for authentication state

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
  
          // Conditionally navigate based on userType
          switch (userType) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "doctor":
              navigate("/doctor/dashboard");
              break;
            case "radiologist":
              navigate("/rad/dashboard");
              break;
            case "facility":
              navigate("/facility/dashboard");
              break;
            case "patient":
              navigate("/patient/dashboard");
              break;
            default:
              navigate("/Login");
          }
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
          <h2>Welcome</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2>Sign In</h2>

            {/* <p className="create-account-text">
          Not Registered? <a href="#">Create an Account</a>
        </p> */}

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
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

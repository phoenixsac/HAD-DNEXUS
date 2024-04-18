import React from "react";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";
import { useNavigate } from "react-router-dom";


import "./Style/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the new page
    navigate("/LoginAs");
    console.log("handleclick called");
  };

  return (
    <div>
      <ConditionalNavbar />
      <section className="hero">
        <h2>Bridging Expertise, Empowering Healthcare</h2>
      </section>
      <button className="journey-button" 
          buttonText="LOGIN"
          onClick={handleClick}>
          LogIn
      </button>
    </div>
  );
}

export default LandingPage;

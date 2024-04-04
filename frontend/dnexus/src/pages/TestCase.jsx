


import React, { useState } from 'react';
import "./Style/TestCase.css";
import Navbar from "../components/Navbar/LoginNav";
import PatientDetails from '../components/TestCase/PatientDetails';
import DoctorDetails from '../components/TestCase/DoctorDetails';
import LabDetails from '../components/TestCase/LabDetails';
import Button from '../components/TestCase/Button';
import ChatList from '../components/TestCase/ChatList';
import LabUpload from '../components/TestCase/LabUpload';

function TestCase() {

const handleClick = () => {
    alert("Button clicked!");
      };
const handleChange = (event) => {
    console.log("Text entered:", event.target.value);
      };

const [isPopupOpen, setIsPopupOpen] = useState(false);

const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
      };
  return (
    <>
    <Navbar />
    <PatientDetails />
    <DoctorDetails/>

    <div className="custom-button-container">
      <Button className="custom-button-container" onClick={togglePopup}>Open Popup</Button>
      {isPopupOpen && <LabUpload onClose={togglePopup} />}
    </div>


    
    <div className="custom-button-container">
      <Button onClick={handleClick}>ADD LAB</Button>
    </div>
    <LabDetails/>

    <div className="custom-button-container">
      <Button onClick={handleClick}>CREATE ROOM</Button>
    </div>

    <div className='rad-recommend'>
        Patient has recommended a radiologist!
    </div>

    <ChatList/>

    <div className='rad-recommend'>
        Write Final Report
    </div>

    <div className="report-container">
      
      <input type="text" className="report" placeholder="Enter text" onChange={handleChange} /> {/* Text box */}
    </div>

    <div className="submit-button-container">
      <Button onClick={handleClick}>SUBMIT</Button>
    </div>
    
    </>
  );
}

export default TestCase;

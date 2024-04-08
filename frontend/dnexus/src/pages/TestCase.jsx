


import React, { useState } from 'react';
import "./Style/TestCase.css";
import Navbar from "../components/Navbar/LoginNav";
import PatientDetails from '../components/TestCase/PatientDetails';
import DoctorDetails from '../components/TestCase/DoctorDetails';
import LabDetails from '../components/TestCase/LabDetails';
import Button from '../components/TestCase/Button';
import ChatList from '../components/TestCase/ChatList';
import LabUpload from '../components/TestCase/LabUpload';
import MessageInput from "../components/TestCase/MessageInput";
import MessagingPage from '../components/TestCase/MessagingPage';
import RadDetails from '../components/TestCase/RadDetails';

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

      // const handleMessageSubmit = (newMessage) => {
      //   // Handle message submission logic here
      // };
  return (
    <>
    <Navbar />
    <PatientDetails />
    <DoctorDetails/>

    <div className="custom-button-container">
      <Button className="custom-button-container" onClick={togglePopup}>Upload Lab Images</Button>
      {isPopupOpen && <LabUpload onClose={togglePopup} />}
    </div>


    
    <div className="custom-button-container">
      <Button onClick={handleClick}>ADD LAB</Button>
    </div>
    <LabDetails/>

    <div className="custom-button-container">
      <Button onClick={handleClick}>ADD RADIOLOGIST</Button>
    </div>

    <RadDetails/>

    {/* <div className="custom-button-container">
      <Button onClick={handleClick}>CREATE ROOM</Button>
    </div> */}

    {/* <div className='rad-recommend'>
        Patient has recommended a radiologist!
    </div> */}

    {/* <ChatList/> */}

    <MessagingPage/>
    
    



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

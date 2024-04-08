


// import React, { useState } from 'react';
// import "./Style/TestCase.css";
// import Navbar from "../components/Navbar/LoginNav";
// import PatientDetails from '../components/TestCase/PatientDetails';
// import DoctorDetails from '../components/TestCase/DoctorDetails';
// import LabDetails from '../components/TestCase/LabDetails';
// import Button from '../components/TestCase/Button';
// import ChatList from '../components/TestCase/ChatList';
// import LabUpload from '../components/TestCase/LabUpload';
// import MessageInput from "../components/TestCase/MessageInput";
// import MessagingPage from '../components/TestCase/MessagingPage';
// import RadDetails from '../components/TestCase/RadDetails';

// function TestCase() {

// const handleClick = () => {
//     alert("Button clicked!");
//       };
// const handleChange = (event) => {
//     console.log("Text entered:", event.target.value);
//       };

// const [isPopupOpen, setIsPopupOpen] = useState(false);

// const togglePopup = () => {
//         setIsPopupOpen(!isPopupOpen);
//       };

//       // const handleMessageSubmit = (newMessage) => {
//       //   // Handle message submission logic here
//       // };
//   return (
//     <>
//     <Navbar />
//     <PatientDetails />
//     <DoctorDetails/>

//     <div className="custom-button-container">
//       <Button className="custom-button-container" onClick={togglePopup}>Upload Lab Images</Button>
//       {isPopupOpen && <LabUpload onClose={togglePopup} />}
//     </div>


    
//     <div className="custom-button-container">
//       <Button onClick={handleClick}>ADD LAB</Button>
//     </div>
//     <LabDetails/>

//     <div className="custom-button-container">
//       <Button onClick={handleClick}>ADD RADIOLOGIST</Button>
//     </div>

//     <RadDetails/>

//     {/* <div className="custom-button-container">
//       <Button onClick={handleClick}>CREATE ROOM</Button>
//     </div> */}

//     {/* <div className='rad-recommend'>
//         Patient has recommended a radiologist!
//     </div> */}

//     {/* <ChatList/> */}

//     <MessagingPage/>
    
    



//     <div className='rad-recommend'>
//         Write Final Report
//     </div>

//     <div className="report-container">
      
//       <input type="text" className="report" placeholder="Enter text" onChange={handleChange} /> {/* Text box */}
//     </div>

//     <div className="submit-button-container">
//       <Button onClick={handleClick}>SUBMIT</Button>
//     </div>
    
//     </>
//   );
// }

// export default TestCase;

// import React, { useState, useEffect } from 'react';
// import "./Style/TestCase.css";
// import Navbar from "../components/Navbar/LoginNav";
// import PatientDetails from '../components/TestCase/PatientDetails';
// import DoctorDetails from '../components/TestCase/DoctorDetails';
// import LabDetails from '../components/TestCase/LabDetails';
// import Button from '../components/TestCase/Button';
// import LabUpload from '../components/TestCase/LabUpload';
// import RadDetails from '../components/TestCase/RadDetails';

// function TestCase() {
//   const [labs, setLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   useEffect(() => {
//     fetchLabs();
//   }, []);

//   const fetchLabs = async () => {
//     try {
//       const response = await fetch('http://localhost:8085/core/facility/get-labs');
//       const data = await response.json();
//       setLabs(data);
//     } catch (error) {
//       console.error('Error fetching labs:', error);
//     }
//   };

//   const handleAddLab = () => {
//     // Handle adding the selected lab logic here
//     console.log("Selected lab:", selectedLab);
//   };

//   return (
//     <>
//       <Navbar />
//       <PatientDetails />
//       <DoctorDetails />

//       <div className="custom-button-container">
//         <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>Upload Lab Images</Button>
//         {isPopupOpen && <LabUpload onClose={() => setIsPopupOpen(false)} />}
//       </div>

//       <div className="custom-button-container">
//         <Button onClick={handleAddLab}>ADD LAB</Button>
//         <select onChange={(e) => setSelectedLab(e.target.value)}>
//           <option value="">Select Lab</option>
//           {labs.map((lab) => (
//             <option key={lab.id} value={lab.name}>{lab.name}</option>
//           ))}
//         </select>
//       </div>

//       <LabDetails />

//       <div className="custom-button-container">
//         <Button onClick={() => console.log("ADD RADIOLOGIST clicked!")}>ADD RADIOLOGIST</Button>
//       </div>

//       <RadDetails />

//       <div className='rad-recommend'>
//         Write Final Report
//       </div>

//       <div className="report-container">
//         <input type="text" className="report" placeholder="Enter text" /> {/* Text box */}
//       </div>

//       <div className="submit-button-container">
//         <Button onClick={() => console.log("SUBMIT clicked!")}>SUBMIT</Button>
//       </div>
//     </>
//   );
// }

// export default TestCase;


import React, { useState, useEffect } from 'react';
import "./Style/TestCase.css";
import Navbar from "../components/Navbar/LoginNav";
import PatientDetails from '../components/TestCase/PatientDetails';
import DoctorDetails from '../components/TestCase/DoctorDetails';
import LabDetails from '../components/TestCase/LabDetails';
import Button from '../components/TestCase/Button';
import LabUpload from '../components/TestCase/LabUpload';
import RadDetails from '../components/TestCase/RadDetails';

function TestCase() {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const response = await fetch('http://localhost:8085/core/facility/get-labs');
      const data = await response.json();
      setLabs(data);
    } catch (error) {
      console.error('Error fetching labs:', error);
    }
  };

  const handleAddLab = async () => {
    try {
      const labId = selectedLab; // Assuming labId is selectedLab
      const consultationId = 2; // Assuming constant consultationId
  
      if (!labId) {
        setMessage("Please select a lab.");
        return;
      }
  
      const url = new URL('http://localhost:8085/core/facility/add-lab');
      url.searchParams.append('consultationId', consultationId);
      url.searchParams.append('labFacId', labId);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.text();
      console.log("Response data:", data); // Log received data
      setMessage(data); // Update message state
  
    } catch (error) {
      console.error('Error adding lab:', error);
      setMessage("Error adding lab. Please try again.");
    }
  };
  
  

  return (
    <>
      <Navbar />
      <PatientDetails />
      <DoctorDetails />

      <div className="custom-button-container">
        <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>Upload Lab Images</Button>
        {isPopupOpen && <LabUpload onClose={() => setIsPopupOpen(false)} />}
      </div>

      <div className="custom-button-container">
        <Button onClick={handleAddLab}>ADD LAB</Button>
        <select onChange={(e) => setSelectedLab(e.target.value)}>
          <option value="">Select Lab</option>
          {labs.map((lab) => (
            <option key={lab.id} value={lab.id}>{lab.name}</option>
          ))}
        </select>
      </div>
      <div className='rad-recommend'>
       {message && <p>{message}</p>}
      </div>
      <LabDetails />

      <div className="custom-button-container">
        <Button onClick={() => console.log("ADD RADIOLOGIST clicked!")}>ADD RADIOLOGIST</Button>
      </div>

      <RadDetails />

      

      <div className='rad-recommend'>
        Write Final Report
      </div>

      <div className="report-container">
        <input type="text" className="report" placeholder="Enter text" /> {/* Text box */}
      </div>

      <div className="submit-button-container">
        <Button onClick={() => console.log("SUBMIT clicked!")}>SUBMIT</Button>
      </div>
    </>
  );
}

export default TestCase;



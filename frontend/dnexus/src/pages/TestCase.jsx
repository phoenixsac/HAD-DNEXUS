


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


// import React, { useState, useEffect } from 'react';
// import "./Style/TestCase.css";
// import Navbar from "../components/Navbar/LoginNav";
// import PatientDetails from '../components/TestCase/PatientDetails';
// import DoctorDetails from '../components/TestCase/DoctorDetails';
// import LabDetails from '../components/TestCase/LabDetails';
// import Button from '../components/TestCase/Button';
// import LabUpload from '../components/TestCase/LabUpload';
// import RadDetails from '../components/TestCase/RadDetails';
// import MessagingPage from "../components/TestCase/MessagingPage";

// function TestCase() {
//   const [labs, setLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [message, setMessage] = useState("");

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

//   const handleAddLab = async () => {
//     try {
//       const labId = selectedLab; // Assuming labId is selectedLab
//       const consultationId = 2; // Assuming constant consultationId
  
//       if (!labId) {
//         setMessage("Please select a lab.");
//         return;
//       }
  
//       const url = new URL('http://localhost:8085/core/facility/add-lab');
//       url.searchParams.append('consultationId', consultationId);
//       url.searchParams.append('labFacId', labId);
  
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       const data = await response.text();
//       console.log("Response data:", data); // Log received data
//       setMessage(data); // Update message state
  
//     } catch (error) {
//       console.error('Error adding lab:', error);
//       setMessage("Error adding lab. Please try again.");
//     }
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
//             <option key={lab.id} value={lab.id}>{lab.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className='rad-recommend'>
//        {message && <p>{message}</p>}
//       </div>
//       <LabDetails />

//       <div className="custom-button-container">
//         <Button onClick={() => console.log("ADD RADIOLOGIST clicked!")}>ADD RADIOLOGIST</Button>
//       </div>

//       <RadDetails />

//       <MessagingPage />

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
import { useNavigate } from 'react-router-dom';
import "./Style/TestCase.css";
import Navbar from "../components/Navbar/LoginNav";
import PatientDetails from '../components/TestCase/PatientDetails';
import DoctorDetails from '../components/TestCase/DoctorDetails';
import LabDetails from '../components/TestCase/LabDetails';
import Button from '../components/TestCase/Button';
import LabUpload from '../components/TestCase/LabUpload';
import RadDetails from '../components/TestCase/RadDetails';
import MessagingPage from "../components/TestCase/MessagingPage";
import { useParams } from 'react-router-dom';

import Footer from "../components/Footer/Footer";
import ChatComponent from '../components/TestCase/ChatComponent';



function TestCase() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [radiologists, setRadiologists] = useState([]);
  const [selectedRadiologist, setSelectedRadiologist] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [radmessage, setradMessage] = useState("");
  const [submitmessage, setsubmitMessage] = useState("");
  const [radiologistAdded, setRadiologistAdded] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [labAdded, setLabAdded] = useState(false);
  const [radAdded, setradAdded] = useState(false);
  const [closeMessage, setCloseMessage] = useState("");
  const [testClosed, settestClosed] = useState(false);
  const { testId, consultationId } = useParams();
  const [radDetailsVisible, setRadDetailsVisible] = useState(false);
  const [labDetailsVisible, setlabDetailsVisible] = useState(false);
  const [consultationStatus, setConsultationStatus] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [userType, setUserType] = useState("");
  const [labConsentStatusAccept, setlabConsentStatusAccept] = useState(false);
  const [labConsentStatusPending, setlabConsentStatusPending] = useState(false);
  const [labConsentStatusReject, setlabConsentStatusReject] = useState(false);
  const [labConsentMessage, setlabConsentMessage] = useState("");
  const [labShow, setlabShow] = useState(false);
  




  useEffect(() => {
    async function fetchLabConsentDetails() {
      try {
        // Fetch consent data
        const idParam = testId ? testId : consultationId;
        const response = await fetch(`http://localhost:8085/core/consent/all/${idParam}`);
        if (response.ok) {
          const data = await response.json();
          let firstOrSecondConditionMet = false;
          data.forEach(entity => {
            if (entity.entityType === "LAB" && entity.consentStatus === "ACCEPT") {
              setlabConsentStatusAccept(true); 
              firstOrSecondConditionMet = true;
              console.log("consent accept",labConsentStatusAccept);
              setlabConsentMessage("Lab Consent is Accepted");
              setlabShow(true);

            }
            
            else if (entity.entityType === "LAB" && entity.consentStatus === "NONE") {
              setlabConsentStatusPending(true);
              firstOrSecondConditionMet = true;
              console.log("consent pending",labConsentStatusPending);
              setlabConsentMessage("Lab Consent is Pending");
            }

            else if (!firstOrSecondConditionMet && entity.entityType === "LAB" && entity.consentStatus === "REJECT") {
              setlabConsentStatusReject(true);
              console.log("consent reject",labConsentStatusReject);
              setlabConsentMessage("Lab Consent is Rejected. Please select another Lab");
              setLabAdded(false);
              setlabShow(false);
            }
          });
        } else {
          console.error('Failed to fetch consent data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching consent data:', error);
      }
    }

     fetchLabConsentDetails();
  }, [consultationId]);

  useEffect(() => {
    async function fetchRadiologistDetails() {
      try {
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/radiologist-detail-for-consultation?${idParam}`);
        if (response.ok) {
          setRadDetailsVisible(true);
        } else {
          console.error('Failed to fetch radiologist details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching radiologist details:', error);
      }
    }

    fetchRadiologistDetails();
  }, [consultationId,testId]);
  

  useEffect(() => {
    const userTypeFromStorage = sessionStorage.getItem('userType');
    setUserType(userTypeFromStorage);
  }, []);

  const fetchConsultationStatus = async () => {
    try {
      const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      const response = await fetch(`http://localhost:8085/core/consultation/status?${idParam}`);
      const data = await response.text();
      setConsultationStatus(data.trim());
    } catch (error) {
      console.error('Error fetching consultation status:', error);
    }
  };

  fetchConsultationStatus();

  const fetchSubmitStatus = async () => {
    try {
      const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      const response = await fetch(`http://localhost:8085/core/consultation/get-final-report?${idParam}`);
      const data = await response.text();
      const trimmedData = data.trim();
      const submitStatus = trimmedData === '' ? null : trimmedData;
      setSubmitStatus(submitStatus);
      // console.log("report:" ,data.trim())
    } catch (error) {
      console.error('Error fetching consultation status:', error);
    }
  };

  fetchSubmitStatus();

  useEffect(() => {
    async function fetchLabDetails() {
      try {
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/facility/lab-details?${idParam}`);
        if (response.ok) {
          setlabDetailsVisible(true);
          setlabShow(true);
        } else {
          console.error('Failed to fetch radiologist details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching radiologist details:', error);
      }
    }

    fetchLabDetails();
  }, [consultationId]);

  useEffect(() => {
    fetchLabs();
    fetchRadiologists();
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

  const fetchRadiologists = async () => {
    try {
      const response = await fetch('http://localhost:8085/core/professional/get-radiologists');
      const data = await response.json();
      setRadiologists(data);
    } catch (error) {
      console.error('Error fetching radiologists:', error);
    }
  };

    const handleAddLab = async () => {
    try {
      const labId = selectedLab; // Assuming labId is selectedLab
      // const consultationId = 2; // Assuming constant consultationId
  
      if (!labId) {
        setMessage("Please select a lab.");
        return;
      }
  
      const url = new URL('http://localhost:8085/core/facility/add-lab');
      url.searchParams.append('consultationId', consultationId || testId);
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
      setLabAdded(true);
      setlabConsentMessage("Consent Is Pending")
      console.log("lab added", labAdded);
      
  
    } catch (error) {
      console.error('Error adding lab:', error);
      setMessage("Error adding lab. Please try again.");
    }
  };
  

  const handleAddRadiologist = async () => {
    try {
      const radiologistId = selectedRadiologist;
      // const consultationId = 3;
  
      if (!radiologistId) {
        setradMessage("Please select a radiologist.");
        return;
      }
  
      const url = new URL('http://localhost:8085/core/professional/add-radiologist');
      url.searchParams.append('consultationId', consultationId || testId);
      // url.searchParams.append('consultationId', consultationId );
      url.searchParams.append('proRadiologistId', radiologistId);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.text();
      setradMessage(data);
      setRadiologistAdded(true);
      setradAdded(true); // Set flag to indicate radiologist added successfully
    } catch (error) {
      console.error('Error adding radiologist:', error);
      setradMessage("Error adding radiologist. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      // const consultationId = 2; // Set consultationId param for now
      const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      const finalReport = document.querySelector('.report').value;
      const response = await fetch(`http://localhost:8085/core/consultation/post-final-report?${idParam}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: finalReport
      });
      fetchSubmitStatus();
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      const responseData = await response.text();
      // Assuming the response data contains the text of the submitted report
      setsubmitMessage(responseData);
      setReportSubmitted(true);
    } catch (error) {
      console.error('Error submitting report:', error);
      // Handle error as needed
    }
  };


  const handleCloseThread = async () => {
    try {
      // const consultationId = 2;
      const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      const response = await fetch(`http://localhost:8085/core/consultation/close-consultation?${idParam}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to close thread');
      }
      const responseData = await response.text();
      setCloseMessage(responseData);
      settestClosed(true);
    } catch (error) {
      console.error('Error closing thread:', error);
    }
  };

  const handleGoBack = () => {
  //  navigate("/doctor/patient-test-details/:patientId")
  // // Get the current URL
  if (userType === "doctor"){
  const currentUrl = window.location.href;

  // Parse the URL to extract its pathname
  const url = new URL(currentUrl);

  // Get the pathname and split it into segments
  let pathname = url.pathname;
  let segments = pathname.split('/');

  // Remove the last segment (parameter)
  segments.pop();

  // Reconstruct the URL without the last parameter
  const newUrl = url.origin + segments.join('/');

  // Navigate to the new URL
  window.location.href = newUrl;
  }
  else if (userType === "radiologist"){
    navigate("/rad/dashboard")
  }

  else if (userType === "lab"){
    navigate("/facility/dashboard")
  }

  else if (userType === "patient"){
    navigate("/patient/dashboard")
  }
  };
  

  return (
    <>
      <Navbar />
      

      <div className={isPopupOpen ? "popup-background" : ""}>
      { <PatientDetails />}

      </div>
      
      <DoctorDetails />

      {userType=== "lab"  &&<div className="custom-button-container">
        <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>Upload Lab Images</Button>
        {isPopupOpen && (
      <div>
    <LabUpload onClose={() => setIsPopupOpen(false)} />
     </div>
     )}
        {/* {isPopupOpen && <LabUpload onClose={() => setIsPopupOpen(false)} />} */}
      </div>}

      < div className='rad-recommend'>
       { labConsentMessage && <p>{labConsentMessage}</p>}
      </div>

      {userType==="doctor" && !labAdded && !labConsentStatusPending  && !labShow && (<div className="add-button-container">
        <div className='add-lab'><Button onClick={handleAddLab}>ADD LAB</Button></div>
       <div> <select onChange={(e) => setSelectedLab(e.target.value)}>
          <option value="">Select Lab</option>
          {labs.map((lab) => (
            <option key={lab.id} value={lab.id}>{lab.name}</option>
          ))}
        </select>
        </div>
      </div>)
}
      {/* < div className='rad-recommend'>
       {message && <p>{message}</p>}
      </div> */}
      
      

      {/* <LabDetails /> */}
      {userType!=="lab" && labConsentStatusAccept  && <LabDetails />}

      {/* <div className="custom-button-container">
        <Button onClick={handleAddRadiologist}>ADD RADIOLOGIST</Button>
        <select onChange={(e) => setSelectedRadiologist(e.target.value)}>
          <option value="">Select Radiologist</option>
          {radiologists.map((radiologist) => (
            <option key={radiologist.id} value={radiologist.id}>{radiologist.fullName}</option>
          ))}
        </select>
      </div> */}

        {/* {userType==="doctor"&&  labConsentStatusAccept &&(!radDetailsVisible || radiologistAdded ) && (
        <div className="add-button-container">
         <div className='add-lab'> <Button onClick={handleAddRadiologist}>ADD RADIOLOGIST</Button></div>
         <div>  <select onChange={(e) => setSelectedRadiologist(e.target.value)}>
            <option value="">Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>{radiologist.fullName}</option>
            ))}
          </select>
          </div>
        </div>
      )} */}


        <div className="add-button-container">
         <div className='add-lab'> <Button onClick={handleAddRadiologist}>ADD RADIOLOGIST</Button></div>
         <div>  <select onChange={(e) => setSelectedRadiologist(e.target.value)}>
            <option value="">Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>{radiologist.fullName}</option>
            ))}
          </select>
          </div>
        </div>
      

      
          <div className='rad-recommend'>
    {radmessage && <p>{radmessage}</p>}
      </div>

      
      {userType!=="lab" && (radAdded || radDetailsVisible) && <RadDetails />}

      {/* {(userType==="doctor" || userType==="radiologist")&& consultationStatus!== "COMPLETED" && (radAdded || radDetailsVisible) && <MessagingPage />} */}
      
      <div className='chatting'>
      <h2>Discussion Forum</h2>
      </div>
      <ChatComponent/>
      

{userType==="doctor" && submitStatus === null && !reportSubmitted && (radAdded  || radDetailsVisible) && (
  <>
    <div className='rad-recommend'>
      Write Final Report
    </div>

    <div className="report-container">
      <input type="text" className="report" placeholder="Enter text" /> {/* Text box */}
    </div>

    <div className="submit-button-container">
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </div>


  </>
)}
    
    
    

      <div className='rad-recommend'>
    {submitmessage && <p>{submitmessage}</p>}
      </div>

      {(userType==="doctor" || userType==="patient") && submitStatus !== null &&<div className="submit-button-container">
      <Button onClick={handleSubmit}>VIEW REPORT</Button>
    </div>}

     
     
     {userType==="doctor" && consultationStatus!== "COMPLETED" &&!testClosed  &&(<div className="submit-button-container">
      <Button onClick={handleCloseThread}>CLOSE THREAD</Button>
      </div>)}

      <div className='rad-recommend'>
    {closeMessage && <p>{closeMessage}</p>}
      </div>
      {/* <div className="submit-button-container">
        <Button onClick={() => console.log("SUBMIT clicked!")}>CLOSE THREAD</Button>
      </div> */}
     { (<div className="submit-button-container">
        <Button onClick={handleGoBack}>GO BACK</Button>
      </div>
     )
}

{/* <Footer/> */}

<div className={isPopupOpen ? "popup-background" : ""}>
(<Footer/>)
</div>

    </>
  );
}

export default TestCase;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style/TestCase.css";
import Navbar from "../components/Navbar/LoginNav";
import PatientDetails from '../components/TestCase/PatientDetails';
import DoctorDetails from '../components/TestCase/DoctorDetails';
import LabDetails from '../components/TestCase/LabDetails';
import Button from '../components/TestCase/Button';
import LabUpload from '../components/TestCase/LabUpload';
import Rad1Details from '../components/TestCase/Rad1Details';
import Rad2Details from '../components/TestCase/Rad2Details';
import MessagingPage from "../components/TestCase/MessagingPage";
import { useParams } from 'react-router-dom';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import Footer from "../components/Footer/Footer";
import ChatComponent from '../components/TestCase/ChatComponent';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
    <div className="modal-content">
        <div className="pdf-modal-header">
            <h2>DNexus</h2>
            <button className="pdf-close-button" onClick={onClose}>✕</button>   
        </div>
        <div className="modal-body">{children}</div>
    </div>
</div>
  );
};


function TestCase() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [radiologists, setRadiologists] = useState([]);
  const [selectedRadiologist, setSelectedRadiologist] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rad1message, setrad1Message] = useState("");
  const [rad2message, setrad2Message] = useState("");
  const [submitmessage, setsubmitMessage] = useState("");
  const [radiologistAdded, setRadiologistAdded] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [labAdded, setLabAdded] = useState(false);
  const [rad1Added, setrad1Added] = useState(false);
  const [rad2Added, setrad2Added] = useState(false);
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
  const [rad1ConsentStatusAccept, setrad1ConsentStatusAccept] = useState(false);
  const [rad1ConsentStatusPending, setrad1ConsentStatusPending] = useState(false);
  const [rad1ConsentStatusReject, setrad1ConsentStatusReject] = useState(false);
  const [rad1ConsentMessage, setrad1ConsentMessage] = useState("");
  const [rad1Show, setrad1Show] = useState(false);
  const [acceptedrad1, setacceptedrad1] = useState(null);
  const [rad2ConsentStatusAccept, setrad2ConsentStatusAccept] = useState(false);
  const [rad2ConsentStatusPending, setrad2ConsentStatusPending] = useState(false);
  const [rad2ConsentStatusReject, setrad2ConsentStatusReject] = useState(false);
  const [rad2ConsentMessage, setrad2ConsentMessage] = useState("");
  const [rad2Show, setrad2Show] = useState(false);
  const [acceptedrad2, setacceptedrad2] = useState(null);
  const [rad1finalShow, setrad1finalShow] = useState(false);
  const [rad2finalShow, setrad2finalShow] = useState(false);
  const [rad1addshow, setrad1addshow] = useState(true);
  const [rad2addshow, setrad2addshow] = useState(true);
  const [rad2fromrad1, setrad2fromrad1] = useState(false);
  const [pdfContent, setPdfContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');

  const [patient, setPatient] = useState(null);
  const patientId = useParams().patientId;
  console.log("patientId:",patientId);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {

        // Make additional API call to fetch patient details from another URL
        const patientResponse = await fetch(`http://localhost:8085/core/consultation/patient-details-by-patient-id?patientId=${patientId}`);
        if (!patientResponse.ok) {
          throw new Error('Failed to fetch patient details from another URL.');
        }
        console.log("patientResponse:", patientResponse);

        const patientData = await patientResponse.json();
        setPatient(patientData);

        console.log("patientData:", patientData);

      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);


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
    async function fetchRad1ConsentDetails() {
      try {
        // Fetch consent data
        const idParam = testId ? testId : consultationId;
        const response = await fetch(`http://localhost:8085/core/consent/all/${idParam}`);
        if (response.ok) {
          const data = await response.json();
          let firstOrSecondConditionMet = false;
          for (let i = 0; i < data.length; i++) {
            const entity = data[i];
            if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "ACCEPT") {
              setrad1ConsentStatusAccept(true); 
              firstOrSecondConditionMet = true;
              console.log("consent accept",rad1ConsentStatusAccept);
              setrad1ConsentMessage("Radiologist 1 Consent is Accepted");
              setrad1Show(true);
              setrad1finalShow(true);
              console.log("entitiy.id rad1", entity.entityId);
              setacceptedrad1(entity.entityId);
              console.log("accepedted rad1", acceptedrad1);
              setrad1addshow(false);
              setrad2fromrad1(true);
              break;
              
            }
            
            else if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "NONE") {
              setrad1ConsentStatusPending(true);
              firstOrSecondConditionMet = true;
              console.log("consent pending for 1",rad1ConsentStatusPending);
              setrad1ConsentMessage("Consent is Pending for radiologist 1");
              setrad1addshow(false);
             
            }

            else if (!firstOrSecondConditionMet && entity.entityType === "RADIOLOGIST" && entity.consentStatus === "REJECT") {
              setrad1ConsentStatusReject(true);
              console.log("consent reject",rad1ConsentStatusReject);
              setrad1ConsentMessage("Radiologist 1 Consent is Rejected. Please select another radiologist");
              setrad1Added(false);
              setrad1Show(false);
              setrad1addshow(true);
            }
          };
        } else {
          console.error('Failed to fetch consent data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching consent data:', error);
      }
    }

     fetchRad1ConsentDetails();
  }, [consultationId,acceptedrad1]);

  useEffect(() => {
    async function fetchRad2ConsentDetails() {
        try {
            // Fetch consent data
            let firstOrSecondConditionMet = false;
            const idParam = testId ? testId : consultationId;
            const response = await fetch(`http://localhost:8085/core/consent/all/${idParam}`);
            if (response.ok) {
                const data = await response.json();
                let acceptIndex = -1;

                // Find the index of the entity with "ACCEPT" status
                // data.forEach((entity, index) => {
                //     if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "ACCEPT") {
                //         acceptIndex = index;
                //         console.log("yahan aya kya");
                //         setrad2addshow(true);
                //     }
                // });
                    

                for (let index = 0; index < data.length; index++) {
                  const entity = data[index];
                  if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "ACCEPT") {
                    acceptIndex = index;
                    console.log("yahan aya kya");
                    setrad2addshow(true);
                    break; // If you want to exit the loop after finding the first matching entity
                  }
                }
                // Start the loop from the entity after the one with "ACCEPT" status
                for (let i = acceptIndex +1; i < data.length; i++) {
                    const entity = data[i];
                    if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "ACCEPT") {
                      setrad2ConsentStatusAccept(true); 
                      firstOrSecondConditionMet = true;
                      console.log("consent accept",rad2ConsentStatusAccept);
                      setrad2ConsentMessage("Radiologist 2 Consent is Accepted");
                      setrad2Show(true);
                      setrad2finalShow(true);
                      console.log("entitiy.id rad2", entity.entityId);
                      setacceptedrad2(entity.entityId);
                       console.log("accepedted rad2", acceptedrad2);
                       setrad2addshow(false);
                     
                      
                    }
                    
                    else if (entity.entityType === "RADIOLOGIST" && entity.consentStatus === "NONE") {
                      setrad2ConsentStatusPending(true);
                      firstOrSecondConditionMet = true;
                      console.log("consent pending for 2",rad2ConsentStatusPending);
                      setrad2ConsentMessage("Consent is Pending for Radiologist 2");
                      console.log("yahan aya kya 1?");
                      console.log("consent pending",rad2ConsentStatusPending);
                      console.log("rad 2 message",rad2ConsentMessage);
                      setrad2addshow(false);
                    }
        
                    else if (!firstOrSecondConditionMet && entity.entityType === "RADIOLOGIST" && entity.consentStatus === "REJECT") {
                      setrad2ConsentStatusReject(true);
                      console.log("consent reject",rad2ConsentStatusReject);
                      setrad2ConsentMessage("Consent is Rejected for radiologist 2. Please select another radiologist");
                      setrad2Added(false);
                      setrad2Show(false);
                      setrad2addshow(true);
                    }
                }
            } else {
                console.error('Failed to fetch consent data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching consent data:', error);
        }
    }

    fetchRad2ConsentDetails();
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

  // const fetchRadiologists = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8085/core/professional/get-radiologists');
  //     const data = await response.json();
  //     setRadiologists(data);
  //   } catch (error) {
  //     console.error('Error fetching radiologists:', error);
  //   }
  // };

  const fetchRadiologists = async () => {
    try {
        // Fetch data from the first API
        
        const response1 = await fetch('http://localhost:8085/core/professional/get-radiologists');
        const data1 = await response1.json();
        const idParam = testId ? testId : consultationId;
        // Fetch data from the second API
        const response2 = await fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`);
        const data2 = await response2.json();
        
        // Filter out items that are common between both arrays
        const filteredData = data1.filter(item1 => {
            return !data2.some(item2 => item1.id === item2.id);
        });

        // Set the filtered data
        setRadiologists(filteredData);
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
        setrad1Message("Please select a radiologist.");
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
      setrad1Message(data);
      setRadiologistAdded(true);
      setrad1Added(true); // Set flag to indicate radiologist added successfully
      setrad1ConsentMessage("Consent Is Pending");
      setrad1finalShow(false);
      setrad1addshow(false);
    } catch (error) {
      console.error('Error adding radiologist:', error);
      setrad1Message("Error adding radiologist. Please try again.");
    }
  };


  const handleAddRadiologist2 = async () => {
    try {
      const radiologistId = selectedRadiologist;
      // const consultationId = 3;
  
      if (!radiologistId) {
        setrad2Message("Please select a radiologist.");
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
      setrad2Message(data);
      setRadiologistAdded(true);
      setrad2Added(true); // Set flag to indicate radiologist added successfully
      setrad2ConsentMessage("Consent Is Pending");
      setrad2finalShow(false);
      setrad2addshow(false);
    } catch (error) {
      console.error('Error adding radiologist:', error);
      setrad2Message("Error adding radiologist. Please try again.");
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
 

  const handleViewReport = async () => {
    // Make API call
    const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
    const response = await fetch(`http://localhost:8085/core/consultation/get-final-report?${idParam}`);
    const data = await response.text();
    // Set the PDF content
    setPdfContent(data);
    setIsModalOpen(true);
};

const closeModal = () => {
  // Close the modal
  setIsModalOpen(false);
};


const handleInputChange = (event) => {
  setText(event.target.value);
  event.target.style.height = 'auto'; // Reset the height
  event.target.style.height = (event.target.scrollHeight) + 'px'; // Set the new height
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

   // Calculate the number of rows based on the number of newlines in the text
   const calculateRows = () => {
    return text.split('\n').length;
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

      {userType==="doctor" && !labAdded && !labConsentStatusPending  && !labShow && (
      <div className="add-button-container">
          {/* <div className='add-lab'><Button onClick={handleAddLab}>ADD LAB</Button></div> */}
        <div className='select-lab-dropdown'> <select onChange={(e) => setSelectedLab(e.target.value)}>
            <option value="">Select Lab</option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>{lab.name}</option>
            ))}
          </select>
        </div>
        <div className='add-lab'><Button onClick={handleAddLab}>ADD LAB</Button></div>
      </div>)
}
      {/* < div className='rad-recommend'>
       {message && <p>{message}</p>}
      </div> */}
      
      

      {/* <LabDetails /> */}
      {userType!=="lab" && labConsentStatusAccept  && <LabDetails />}

     

< div className='rad-recommend'>
       { rad1ConsentMessage && <p>{rad1ConsentMessage}</p>}
      </div>
      {userType==="doctor"&&  labConsentStatusAccept && rad1addshow  && (
        <div className="add-button-container">
         {/* <div className='add-lab'> <Button onClick={handleAddRadiologist}>ADD RADIOLOGIST</Button></div> */}
         <div>  <select onChange={(e) => setSelectedRadiologist(e.target.value)}>
            <option value="">Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>{radiologist.fullName}</option>
            ))}
          </select>
          </div>
          <div className='add-lab'> <Button onClick={handleAddRadiologist}>ADD RADIOLOGIST</Button></div>
        </div>
      )}
      

      
          {/* <div className='rad-recommend'>
    {rad1message && <p>{rad1message}</p>}
      </div> */}

      
      {userType!=="lab" && rad1finalShow   && <Rad1Details radId={acceptedrad1}/>}


      {rad1finalShow&&(<div className='rad-recommend'>
    {rad2ConsentMessage && <p>{rad2ConsentMessage}</p>}
      </div>)}

      {/* {(userType==="doctor" || userType==="radiologist")&& consultationStatus!== "COMPLETED" && (radAdded || radDetailsVisible) && <MessagingPage />} */}
      {userType==="doctor"&&  labConsentStatusAccept && rad2fromrad1 && rad2addshow && (
        <div className="add-button-container">
         {/* <div className='add-lab'> <Button onClick={handleAddRadiologist2}>ADD RADIOLOGIST 2</Button></div> */}
         <div>  <select onChange={(e) => setSelectedRadiologist(e.target.value)}>
            <option value="">Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>{radiologist.fullName}</option>
            ))}
          </select>
          </div>
          <div className='add-lab'> <Button onClick={handleAddRadiologist2}>ADD RADIOLOGIST 2</Button></div>
        </div>
      )}

        {userType!=="lab" && rad2finalShow  && <Rad2Details radId={acceptedrad2}/>}

        <div className='rad-recommend'>

          {rad2message && <p>{rad1message}</p>}

   // {rad2message && <p>{rad2message}</p>}

      </div>

      {rad1finalShow&&(userType==="doctor"||userType==="radiologist")&&   (<div className='chatting'>
      <h2>Discussion Forum</h2>
      </div>)}
      
     {(userType==="doctor"||userType==="radiologist")&&   rad1finalShow&&<ChatComponent/>}
      

{userType==="doctor" && submitStatus === null && rad1finalShow&&!reportSubmitted && (rad1Added  || radDetailsVisible) && (
  <>
    <div className='rad-recommend'>
      Final Report
    </div>

    {/* <div className="final-report-container">
    <textarea 
        className="expanding-textarea"
        placeholder="Enter Final Report" 
        value={text} 
        rows={calculateRows()} 
        onChange={handleInputChange} 
      /> 
    </div>

    <div className="submit-button-container">
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </div> */}

    <div className="final-report-container">
      <div style={{ position: 'relative' }}>
        <textarea 
          className="expanding-textarea report"
          placeholder="Enter Final Report" 
          value={text} 
          rows={calculateRows()} 
          onChange={handleInputChange} 
        />
        <button 
          className="report-send-button" 
          onClick={handleSubmit} 
          style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
          SEND
        </button>
      </div>
    </div>



  </>
)}



    
  <div className='rad-recommend'>
    {submitmessage && <p>{submitmessage}</p>}
      </div>

    <div className='closing-buttons'>
      {(userType==="doctor" || userType==="patient") && submitStatus !== null &&
      <div className="submit-button-container">
        <Button onClick={handleViewReport}>VIEW REPORT</Button>
      </div>}

      {userType==="doctor" && consultationStatus!== "COMPLETED" &&!testClosed  &&(
     <div className="submit-button-container">
        <Button onClick={handleCloseThread}>CLOSE THREAD</Button>
      </div>)}
    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
                <PDFViewer width="100%" height="100%">
                    <Document>
                        <Page size="A4">
                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'center', fontSize: 22, color: '#1A76D1', fontWeight: '800' }}>DNexus</Text>
                            <Text style={{ marginTop: 15, marginLeft: 20, textAlign: 'center', fontSize: 18, color: '#1A76D1', fontWeight: 'normal' }}>Final Report</Text>
                            <Text style={{ marginTop: 15, marginLeft: 20, paddingLeft:10, textAlign: 'left', fontSize: 16, color: '#1A76D1', fontWeight: 'normal' }}>
                             {/* {patient.name} */}
                            </Text>
                            <Text style={{ marginTop: 5, marginLeft: 20, paddingLeft:10,  textAlign: 'left', fontSize: 16, color: '#1A76D1', fontWeight: 'normal' }}>
                             {/* {patient.age}/{patient.gender} */}
                            </Text>
                            <Text style={{margin:30, fontSize: 14}}>{pdfContent}</Text>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>

     
     
     {/* {userType==="doctor" && consultationStatus!== "COMPLETED" &&!testClosed  &&(
     <div className="submit-button-container">
        <Button onClick={handleCloseThread}>CLOSE THREAD</Button>
      </div>)} */}

      <div className='rad-recommend'>
        {closeMessage && <p>{closeMessage}</p>}
      </div>
      {/* <div className="submit-button-container">
        <Button onClick={() => console.log("SUBMIT clicked!")}>CLOSE THREAD</Button>
      </div> */}
     {/* { (<div className="submit-button-container">
        <Button onClick={handleGoBack}>GO BACK</Button>
      </div>
     )
} */}

{/* <Footer/> */}

<div className={isPopupOpen ? "popup-background" : ""}>
(<Footer/>)
</div>

    </>
  );
}

export default TestCase;



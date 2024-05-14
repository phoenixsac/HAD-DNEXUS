import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Rad1Details.css";

function Rad1Details(radId) {
  const [radDetails, setRadDetails] = useState(null);
  const [showFullPrescription, setShowFullPrescription] = useState(false);
  const { testId, consultationId } = useParams();
  const [userType, setUserType] = useState("");
  const [radiologistId, setRadiologistId] = useState(null); 
  

  useEffect(() => {
    // Consultation ID
    // const consultationId = 2; // Replace with the dynamic value if available
    setRadiologistId(radId.radId); 
   
    console.log("radid in raddetails",radId);
    console.log("radioloid in raddetails",radiologistId);
    ;
    // Make the GET request with consultationId as a request param
    const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
    fetch(`http://localhost:8085/core/professional/radiologist-details?radiologistId=${radiologistId}`)
      .then(response => response.json())
      .then(data => {
        // Update state with received data
        setRadDetails(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [testId,consultationId,radId]); // Empty dependency array to run effect only once on mount

  useEffect(() => {
    const userTypeFromStorage = sessionStorage.getItem('userType');
    setUserType(userTypeFromStorage);
  }, []);

  const togglePrescription = () => {
    setShowFullPrescription(!showFullPrescription);
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="rad-info-container">
      <div className="rad-details-header">
      <h4 className="rad-name">{radDetails ? radDetails.name.toUpperCase() : ''}</h4>

       
        <h5 className="specialization">{radDetails ? radDetails.systemOfMedicine : ''}</h5>
        
        {userType!=="patient" && <span >
          <button className='lab-annotated-button' onClick={handleClick}>View Annotated Images</button>
        </span>}
      </div>

      {/* <div className="prescription">
        {radDetails && radDetails.impression && radDetails.impression.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!showFullPrescription && (
          <p onClick={togglePrescription}>Read More</p>
        )}
        {showFullPrescription && radDetails && radDetails.impression && radDetails.impression.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div> */}
    </div>
  );
}

export default Rad1Details;


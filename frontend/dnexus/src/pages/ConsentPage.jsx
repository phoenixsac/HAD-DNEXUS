import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "./Style/ConsentPage.css";

const ConsentPage = () => {
  const [consent, setConsent] = useState(null);
  const [response, setResponse] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [responded, setResponded] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const consentId = useParams().consentId;

  console.log("consentId:",consentId);

  useEffect(() => {
    const location = window.location;
    const token = new URLSearchParams(location.search).get('token');
    console.log("token:",token);

    const validateToken = async (token, consentId) => {
      try {
        const response = await fetch(`http://localhost:8085/core/consent/validate-token/${consentId}?token=${token}`);
        console.log("response:", response);

        const data = await response.text(); // Assuming the response body contains "Token is valid"
        console.log("data:", data);
    
        if (!response.ok) {
          throw new Error('Failed to validate token');
        }
    
        // const data = await response.text(); // Assuming the response body contains "Token is valid"
        // console.log("data:", data);
    
        // Check if the response body contains "Token is valid"
        const isValidToken = data === "Token is valid";

         // Set tokenValid to true if the token is valid
        setTokenValid(isValidToken);
    
        return isValidToken;
    
      } catch (error) {
        throw new Error('Error validating token:', error);
      }
    };
    

    const fetchConsentDetails = async (consentId) => {
      try {
        const response = await fetch(`http://localhost:8085/core/consent/details/${consentId}`);
        console.log("consent response:",response);

        if (!response.ok) {
          throw new Error('Failed to fetch consent');
        }
        const data = await response.json();
        console.log("consent data:",data);
        return data;

      } catch (error) {
        throw new Error('Error fetching consent:', error);
      }
    };

    // Validate the token received from the URL
    validateToken(token, consentId)
      .then(valid => {
        if (valid) {
          // If token is valid, fetch consent details
          fetchConsentDetails(consentId)
            .then(data => setConsent(data))
            .catch(error => console.error('Error fetching consent:', error));
        } else {
          // If token is invalid, set tokenValid to false
          setTokenValid(false);
        }
      })
      .catch(error => console.error('Error validating token:', error));
  }, [consentId]); // Run this effect whenever the consentId changes
  

  const handleResponse = async (accepted) => {
    try {
      const newStatus = accepted ? 'ACCEPT' : 'REJECT'; // Convert to string based on frontend logic
      const response = await fetch(`http://localhost:8085/core/consent/${consentId}/status?newStatus=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newStatus: newStatus
        })
      });
      console.log("handleResponse response:", response);

      if (!response.ok) {
        throw new Error('Failed to update consent status');
      }

      const data = await response.json();
      console.log("handleResponse data:", data);

      const message = data.consentStatus === 'ACCEPT' ? 'You have accepted the Consent' : 'You have rejected the Consent';
      setStatusMessage(message);
      setResponse(true);
      setResponded(true); // Set responded to true when the user responds

    } catch (error) {
      console.error('Error handling response:', error);
    }
  };
  
  if (!tokenValid) {
    // If token is not valid, display an error message or redirect to an error page
    return <div>Error: Invalid token</div>;
  }

  if (!consent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="consent-page">

      <div className="breadcrumbs overlay">
        <div>    
          <h2>Consent Request</h2>
        </div>
      </div>

      <div className='consent-container'>
          {/* <h2>Consent Details</h2> */}
          
          {/* {!responded && ( // Display accept and reject buttons if user has not responded
              <div className="consent-buttons">
                  <button onClick={() => handleResponse(true)}>Accept</button>
                  <button onClick={() => handleResponse(false)}>Reject</button>
              </div>
              )}
              {response && (
              <>
                  <p>{statusMessage}</p>
                  <button onClick={() => window.close()}>Close</button>
              </>
              )} */}

            {consent.consentStatus === "NONE" && !responded && (
              
                      <div className="consent-buttons">
                        <p>{consent.consentMessage}</p>
                        <button onClick={() => handleResponse(true)}>Accept</button>
                        <button onClick={() => handleResponse(false)}>Reject</button>
                      </div>
                    )}

                    {consent.consentStatus !== "NONE" && (
                          <p>You have already responded</p>
                    )}

                    {response && (
                      <>
                        <p>{statusMessage}</p>
                        <button onClick={() => window.close()}>Close</button>
                      </>
                    )}
      </div>
  </div>
  );
};

export default ConsentPage;



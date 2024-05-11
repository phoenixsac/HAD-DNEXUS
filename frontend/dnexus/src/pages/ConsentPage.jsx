import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "./Style/ConsentPage.css";

const ConsentPage = () => {
  const [consent, setConsent] = useState(null);
  const [response, setResponse] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [responded, setResponded] = useState(false);

  const consentId = useParams().consentId;
  console.log("consentId:", consentId);


  useEffect(() => {
    fetchConsentDetails()
      .then(data => setConsent(data))
      .catch(error => console.error('Error fetching consent:', error));
  }, []);

  const fetchConsentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8085/core/consent/details/${consentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch consent');
      }
      const data = await response.json();
      console.log("response:", data);
      return data;
    } catch (error) {
      throw new Error('Error fetching consent:', error);
    }
  };

const handleResponse = async (accepted) => {
    const newStatus = accepted ? 'ACCEPT' : 'REJECT'; // Determine newStatus based on user's response
    try {
      const response = await fetch(`http://localhost:8085/core/consent/${consentId}/status?newStatus=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newStatus }) // Send newStatus in request body if required by backend
      });
      if (!response.ok) {
        throw new Error('Failed to update consent status');
      }
      const data = await response.json();
      setResponse(data);
      setStatusMessage(accepted ? 'Consent accepted by the patient.' : 'Consent rejected by the patient.');
      setResponded(true);

      console.log("after updation data:", data);

    } catch (error) {
      console.error('Error updating consent status:', error);
    }
  };

  if (!consent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="consent-page">
        <div className='consent-container'>
            <h2>Consent Details</h2>
            <p>{consent.consentMessage}</p>
            {!responded && ( // Display accept and reject buttons if user has not responded
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
                )}
        </div>
    </div>
  );
};

export default ConsentPage;


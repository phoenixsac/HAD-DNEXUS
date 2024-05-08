// import React from 'react';
// import './LabDetails.css';

// const LabDetails = () => {
//     const labName = "LAB NAME";
//   const description = "Description";
//     const handleClick = () => {
//         alert("Button clicked!");
//           };
  

//           return (
//             <div className="info-container">
//                 <div className="header">
//                     <span className="lab-name">{labName}</span>
//                     <br />
//                     <span >
//                     <button className='lab-button' onClick={handleClick}>View/Annotate Images</button>
//                     </span>
//                 </div>
//                 <div className="description">
//                     <p>{description}</p>
//                 </div>
//             </div>
//         );
// };

// export default LabDetails;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LabDetails.css';
import OHIFModal from '../../modals/OHIFModal';

const LabDetails = () => {
    const [labData, setLabData] = useState(null);
    const [modalUrl, setModalUrl] = useState(null);
    const description = "Description";
    const { testId, consultationId } = useParams();
    const [userType, setUserType] = useState("");

    useEffect(() => {
        fetchLabDetails();
    }, []);

    useEffect(() => {
        const userTypeFromStorage = sessionStorage.getItem('userType');
        setUserType(userTypeFromStorage);
      }, []);

    const fetchLabDetails = async () => {
        try {
            // const consultationId = 3; // Assuming constant consultationId
            const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
            const response = await fetch(`http://localhost:8085/core/facility/lab-details?${idParam}`);
            const data = await response.json();
            setLabData(data);
        } catch (error) {
            console.error('Error fetching lab details:', error);
        }
    };

    const handleClick = () => {
        // Generate the URL for the modal here (assuming it depends on labData)
        const modalUrl = `http://localhost:3000/viewer/dicomjson?url=http://localhost:9191/dicom-json/5aea04b3.json`; // Modify this URL as needed
        setModalUrl(modalUrl);
    };

    const handleViewClick = () => {
        alert("Button clicked!");
    };

    return (
        <div className="info-container">
            <div className="header">
                <span className="lab-name">{labData?.firstName}</span>
                <br />
                {userType!=="patient" && <span>
                    <button className='lab-button' onClick={handleClick}>View/Annotate Images</button>
                </span>}
                {userType==="patient" && <span>
                    <button className='lab-button' onClick={handleViewClick}>View Images</button>
                </span>}
            </div>
            <div className="description">
                <p>{description}</p> {/* Leave description as dummy data */}
            </div>
            {/* Render the OHIFModal component conditionally */}
            {modalUrl && <OHIFModal url={modalUrl} onClose={() => setModalUrl(null)} />}
        </div>
    );
};

export default LabDetails;

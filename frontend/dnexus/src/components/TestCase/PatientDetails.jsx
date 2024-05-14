
// import React from 'react';
// import "./PatientDetails.css";

// function PatientDetails() {
//   return (
    
    
//     <div className="patient-banner">
//       <div className="patient-info">
//         <span className="patient-id">Patient ID: 123456</span>
//         <span className="patient-name">Patient Name: John Doe</span>
//         <span className="age-gender">Age/Gender: 30/Male</span>
        
//       </div>
//       <div className="patient-details">
//       <span className="patient-phone">Phone: 123-456-7890</span> {/* Moved below */}
        
//         <span className="email">Email: johndoe@example.com</span>
//         <span className="patient-address">Address: 123 Main St, City, Country</span> {/* Moved up */}
//       </div>
//     </div>
    
//   );
// }

// export default PatientDetails;



// function PatientDetails() {
//   // Dummy patient data
//   const dummyPatientData = {
//     id: 123456,
//     name: 'John Doe',
//     phone: '123-456-7890',
//     age: 30,
//     gender: 'Male',
//     email: 'johndoe@example.com',
//     address: '123 Main St, City, Country'
//   };

//   return (
//     <div className="patient-banner">
//       <div className="patient-info">
//         <span className="patient-id">Patient ID: {dummyPatientData.id}</span>
//         <span className="patient-name">Patient Name: {dummyPatientData.name}</span>
//         <span className="age-gender">Age/Gender: {dummyPatientData.age}/{dummyPatientData.gender}</span>
//       </div>
//       <div className="patient-details">
//         <span className="patient-phone">Phone: {dummyPatientData.phone}</span>
//         <span className="email">Email: {dummyPatientData.email}</span>
//         <span className="patient-address">Address: {dummyPatientData.address}</span>
//       </div>
//     </div>
//   );
// }

// export default PatientDetails;


import "./PatientDetails.css";

// import React, { useState, useEffect } from 'react';
// import "./PatientDetails.css";

// function PatientDetails() {
//   const [patientData, setPatientData] = useState(null);

//   // Fetch patient details from backend API
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const consultationId = 2; // Set consultationId param for now
//         const response = await fetch(`http://localhost:8085/core/consultation/patient-details?consultationId=${consultationId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient details');
//         }
//         const data = await response.json();
//         setPatientData(data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         // Handle error as needed
//       }
//     };

//     fetchPatientDetails();
//   }, []); // Empty dependency array ensures the effect runs only once

//   // Render patient details
//   return (
//     <div className="patient-banner">
//       {patientData ? (
//         <>
//           <div className="patient-info">
//             <span className="patient-id">Patient ID: {patientData.id}</span>
//             <span className="patient-name">Patient Name: {patientData.name}</span>
//             <span className="age-gender">Age/Gender: {patientData.age}/{patientData.gender}</span>
//           </div>
//           <div className="patient-details">
//             <span className="patient-address">Blood Group: {patientData.bloodGroup}</span>
//             <span className="patient-phone">Phone: {patientData.contact}</span>
//             <span className="email">Email: {patientData.email}</span>
            
//             {/* Include other patient details here */}
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default PatientDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import "./PatientDetails.css";

// function PatientDetails() {
//   const [patientData, setPatientData] = useState(null);
//   // const { testId } = useParams(); // Get consultationId from URL parameter
//   const { testId, consultationId } = useParams();

//   // Fetch patient details from backend API
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         // const response = await fetch(`http://localhost:8085/core/consultation/patient-details?consultationId=${testId}`);
//         const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
//         const response = await fetch(`http://localhost:8085/core/consultation/patient-details?${idParam}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient details');
//         }
//         const data = await response.json();
//         setPatientData(data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         // Handle error as needed
//       }
//     };

//     fetchPatientDetails();
//   }, [testId,consultationId]); // Include consultationId in the dependency array

//   // Render patient details
//   return (
//     <div className="patient-banner">
//       {patientData ? (
//         <>
//           <div className="patient-info">
//             <span className="patient-id">Patient ID: {patientData.id}</span>
//             <span className="patient-name">Patient Name: {patientData.name}</span>
//             <span className="age-gender">Age/Gender: {patientData.age}/{patientData.gender}</span>
//           </div>
//           <div className="patient-details">
//             <span className="patient-address">Blood Group: {patientData.bloodGroup}</span>
//             <span className="patient-phone">Phone: {patientData.contact}</span>
//             <span className="email">Email: {patientData.email}</span>
            
//             {/* Include other patient details here */}
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default PatientDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import CaseBreadcrumbs from '../Breadcrumbs/CaseBreadcrumbs';
// import "./PatientDetails.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PatientDetails() {
//   const [patientData, setPatientData] = useState(null);
//   const { testId, consultationId } = useParams();

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
//         const response = await fetch(`http://localhost:8085/core/consultation/patient-details?${idParam}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient details');
//         }
//         const data = await response.json();
//         setPatientData(data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//       }
//     };

//     fetchPatientDetails();
//   }, [testId, consultationId]);

//   // Dynamically generate breadcrumbs based on patient details
//   const breadcrumbs = patientData
//     ? [
//         { title: `Patient: ${patientData.name}` },
//         { title: `ID: ${patientData.id}` },
//         { title: `Age: ${patientData.age}` },
//         { title: `Gender: ${patientData.gender}` },
//         { title: `Blood Group: ${patientData.bloodGroup}` },
//         { title: `Phone: ${patientData.contact}` },
//         { title: `Email: ${patientData.email}` },
//         // Include other patient details here
//       ]
//     : [];

//   return (
//     <div>
//       <CaseBreadcrumbs pageTitle="Patient Details" breadcrumbs={breadcrumbs} />
//       {/* Render patient details below */}
//       {/* {patientData && (
//         <div className="patient-info">
//           <span className="patient-id">Patient ID: {patientData.id}</span>
//           <span className="patient-name">Patient Name: {patientData.name}</span>
//           <span className="age-gender">Age/Gender: {patientData.age}/{patientData.gender}</span>
//           <span className="patient-address">Blood Group: {patientData.bloodGroup}</span>
//           <span className="patient-phone">Phone: {patientData.contact}</span>
//           <span className="email">Email: {patientData.email}</span>
         
//         </div>)} */}
//     </div>
//   );
// }

// export default PatientDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import './PatientDetails.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


// const PatientDetails = () => {
//   const [patientData, setPatientData] = useState(null);

//   // const { testId } = useParams(); // Get consultationId from URL parameter

//   const { testId, consultationId } = useParams();

//   //Fetch patient details from backend API
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         // const response = await fetch(`http://localhost:8085/core/consultation/patient-details?consultationId=${testId}`);
//         const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
//         const response = await fetch(`http://localhost:8085/core/consultation/patient-details?${idParam}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient details');
//         }
//         const data = await response.json();
//         setPatientData(data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         // Handle error as needed
//       }
//     };

//     fetchPatientDetails();

//   }, [testId,consultationId]); // Include consultationId in the dependency array


//   return (
    
//     <div className='patient-breadcrumbs'>
//       {patientData ? (
//         <div className='breadcrumbs overlay'>
//         <div className='title'> 
//         <h2>{patientData.name} {patientData.age}/{patientData.gender} </h2>
//         </div>
//           {/* <h3>Age: {patientData.age}</h3>
//               <h3>Gender: {patientData.gender}</h3> */}
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               {patientData && (
//                 <>
//                   <li className="breadcrumb-item active" aria-current="page">{patientData.bloodGroup}</li>
//                   <li className="breadcrumb-item active" aria-current="page">{patientData.contact} </li>
//                   <li className="breadcrumb-item active" aria-current="page">{patientData.email}</li>
//                 </>
//               )}
//             </ol>
//           </nav>

//           {/* <li className="breadcrumb-item">{patientData.bloodGroup}</li>
//           <nav className="breadcrumb-item">{patientData.contact}</nav>
//           <ol className="breadcrumb-item">{patientData.email}</ol>
//           <div className="breadcrumb-item">{patientData.email}</div> */}
//         </div> ) : (
//          <p>Loading...</p>
// )}
//     </div>
//   );
// }

// export default PatientDetails;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './PatientDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const PatientDetails = () => {
  const [patientData, setPatientData] = useState(null);

  // const { testId } = useParams(); // Get consultationId from URL parameter

  const { testId, consultationId } = useParams();

  //Fetch patient details from backend API
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // const response = await fetch(`http://localhost:8085/core/consultation/patient-details?consultationId=${testId}`);
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/patient-details?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        // Handle error as needed
      }
    };

    fetchPatientDetails();

  }, [testId,consultationId]); // Include consultationId in the dependency array


  return (
    
    <div className="breadcrumbs-patient overlay">
      {patientData ? (
        
        <div className='patient-div'>    
         <div className="patient-name">
          <h2>{patientData.name} </h2>
          <h3>{patientData.age}/{patientData.gender} </h3>
         </div>
         <div className='patient-bread-details'>
            <p>{patientData.bloodGroup}</p>
            <p>{patientData.contact} </p>
            <p>{patientData.email} </p>
          </div>
        </div>
      ) : (
         <p>Loading...</p>
)}
    </div>
  );
}

export default PatientDetails;


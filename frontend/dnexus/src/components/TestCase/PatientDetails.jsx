import React from 'react';
import "./PatientDetails.css";

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



function PatientDetails() {
  // Dummy patient data
  const dummyPatientData = {
    id: 123456,
    name: 'John Doe',
    phone: '123-456-7890',
    age: 30,
    gender: 'Male',
    email: 'johndoe@example.com',
    address: '123 Main St, City, Country'
  };

  return (
    <div className="patient-banner">
      <div className="patient-info">
        <span className="patient-id">Patient ID: {dummyPatientData.id}</span>
        <span className="patient-name">Patient Name: {dummyPatientData.name}</span>
        <span className="age-gender">Age/Gender: {dummyPatientData.age}/{dummyPatientData.gender}</span>
      </div>
      <div className="patient-details">
        <span className="patient-phone">Phone: {dummyPatientData.phone}</span>
        <span className="email">Email: {dummyPatientData.email}</span>
        <span className="patient-address">Address: {dummyPatientData.address}</span>
      </div>
    </div>
  );
}

export default PatientDetails;




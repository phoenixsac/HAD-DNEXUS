import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For retrieving patient ID from URL

import PatientTestItem from '../components/PatientTestItem/PatientTestItem';

import "./Style/RadDashboard.css";
import Navbar from '../components/Navbar/ConditionalNavbar';

const RadDashboard = () => {

  const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [tests, setTests] = useState([]);
//   const { patientId } = useParams(); // Get patient ID from URL parameter

//   // Fetch patient details and tests from backend (replace with your logic)
//   useEffect(() => {
//     const fetchPatientData = async () => {
//       const response = await fetch(`/api/patients/${patientId}`); // Replace with your endpoint
//       const data = await response.json();
//       setPatient(data.patient);
//       setTests(data.tests);
//     };

//     if (patientId) { // Fetch data only if patientId exists
//       fetchPatientData();
//     }
//   }, [patientId]);

//DUMMY
const [patient, setPatient] = useState({
    id: 123,
    name: 'John Doe',
    age: 35,
    gender: 'Male',
  });

  const [tests, setTests] = useState([
    {
      id: 123,
      date: "12/03/2024",
      name: 'Blood Test',
      status: 'Completed',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 234,
      date: "12/03/2024",
      name: 'X-ray',
      status: 'In Progress',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 345,
      date: "12/03/2024",
      name: 'MRI Scan',
      status: 'upcoming',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  const handleTestClick = (testId) => {
    // Handle navigation to test details page with test ID (implementation depends on your routing)
    console.log(`Navigate to test details page for test ID: ${testId}`);
  };

  // const handleBack = () => {
  //   navigate('/rad/dashboard/');
  // }

  // Access patient details from state
  const { id, name, age, gender } = patient || {}; // Destructuring with default values

  return (
    <div>

      <Navbar/>

      <div className="patient-test-details">

        <div className='header'>
          <div className='patient-data'>
            <p>{id}</p>
            <p>{name}</p>
            <p>{age} / {gender}</p>
          </div>

          {/* <div className='create-button'>
            <button onClick={handleBack}>Go Back</button>
          </div> */}
        </div>

        <div className="test-list">
          {tests.map((test) => (
            <PatientTestItem key={test.id} test={test} onTestClick={handleTestClick} />
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default RadDashboard;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PatientList from '../components/PatientList/PatientList';
// import Pagination from '../components/Pagination/Pagination'; 
// import Navbar from "../components/Navbar/ConditionalNavbar"

// import "./Style/RadDashboard.css"

// const RadDashboard = () => {
//   const navigate = useNavigate();

//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1); // For pagination
//   const [patientsPerPage] = useState(3);


//   // Fetch patient data from backend (replace with your actual API call)
// //   useEffect(() => {
// //     const fetchPatients = async () => {
// //       const response = await fetch('/api/patients'); // Replace with your API endpoint
// //       const data = await response.json();
// //       setPatients(data);
// //     };

// //     fetchPatients();
// //   }, []);


// //dummy
// useEffect(() => {
//     const patientData = [
//       // Sample patient data objects
//       { id: 123, name: 'John Doe', gender: 'Male', age: 30 },
//       { id: 234, name: 'Mary Poppins', gender: 'Female', age: 10 },
//       { id: 345, name: 'Dory Nemo', gender: 'Female', age: 25 },
//       { id: 456, name: 'Alexander', gender: 'Male', age: 32 },
//       // ... more patients
//     ];
//     setPatients(patientData);
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search
//   };

//   const handleBack = () => {
//     navigate("/rad/dashboard");
//   }

//   const filteredPatients = patients.filter((patient) => {
//     if (!searchTerm) return true; // Show all patients if no search term

//     // search logic to filter by ID, name, gender, or age (case-insensitive)
//     return (
//       patient.id.toString().includes(searchTerm) ||
//       patient.name.toLowerCase().includes(searchTerm) ||
//       patient.gender.toLowerCase().includes(searchTerm) ||
//       patient.age.toString().includes(searchTerm)
//     );
//   });

//   // Change page handler for Pagination component
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const indexOfLastPatient = currentPage * patientsPerPage;
//   const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
//   const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

//   return (
//     <div>
//       <Navbar/>

//         <div className='rad-container'>

//           <div className='search-back'>

//             <div className='search-field'>
//               <input
//                 type="text"
//                 placeholder="Search by ID, Name, Gender, or Age"
//                 value={searchTerm}
//                     onChange={handleSearchChange}
//               />
//             </div>

//             <div>
//               <button onClick={handleBack}>Back</button>
//             </div> 

//           </div>

//           <div className="rad-dashboard">
//             <PatientList patients={filteredPatients} />
//           </div>

//           <div>
//             <Pagination
//               patientsPerPage={patientsPerPage}
//               totalPatients={filteredPatients.length} 
//               paginate={paginate}
//             />
//           </div>

//         </div>

//     </div>
//   );
// };

// export default RadDashboard;

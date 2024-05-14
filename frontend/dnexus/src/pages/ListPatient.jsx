import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/ListPatient.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";
import AdminPatientList from '../components/AdminPatientList/AdminPatientList';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';


const ListPatient = () => {
  const navigate = useNavigate();

  const [patients, setpatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredpatients, setFilteredpatients] = useState([]);
  const [allpatients, setAllpatients] = useState([]);
  const baseUrl = "http://localhost:8080/";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
        const response = await axios.get('${baseUrl}/admin/all-patients', {
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token in the request headers
          }
        });
        setpatients(response.data);
        setAllpatients(response.data);

        console.log("response:",response.data);

      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Handle error here, such as displaying an error message or redirecting the user
      }
    };
  
    fetchDoctors();
  }, []);
  

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All patients:", allpatients);

    if (!searchTerm) {
      setFilteredpatients(allpatients);
    } else {
      const filtered = allpatients.filter((patient) =>
        (patient.facilityUFID && patient.facilityUFID.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.facilityName && patient.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) )||
        (patient.facilitySubDistrict && patient.facilitySubDistrict.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.facility_ownership && patient.facility_ownership.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.facilityDistrict && patient.facilityDistrict.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      console.log("Filtered patients:", filtered);

      setpatients(filtered);
    }
  }, [searchTerm, allpatients]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  }


  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastpatient = currentPage * patientsPerPage;
  const indexOfFirstpatient = indexOfLastpatient - patientsPerPage;
  const currentpatients = patients.slice(indexOfFirstpatient, indexOfLastpatient);

  return (
    <div>
        <Navbar/>

        <Breadcrumbs pageTitle="Patient List"/>

        <div className="patients-list">
          
          <div className='search-back'>
            <div className='search-field'>
              <input
                type="text"
                placeholder="Search patients..."
                onChange={handleSearch}
                value={searchTerm} // Set input value to search term
              />
            </div>

            {/* <div>
              <button onClick={handleBack}>Back</button>
            </div> */}
            
          </div>

          {/* <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>patient ID</th>
                  <th>facility_name</th>
                  <th>Location</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentpatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.facility_name}</td>
                    <td>{patient.location}</td>
                    <td>
                      <Link className='view-link' to={`/admin/facility/${patient.id}`}>View</Link> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="patient-list">
            <AdminPatientList patients={currentpatients} />
          </div>

          <div className='pagination-container'>
            <Pagination
              doctorsPerPage={patientsPerPage}
              totalDoctors={filteredpatients.length} 
              paginate={paginate}
              className='pagination'
            />
          </div>

        </div>
        
        <Footer/>
    </div>
  );
};

export default ListPatient;
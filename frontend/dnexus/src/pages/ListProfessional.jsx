import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/ListProfessional.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";
import ProfessionalList from '../components/ProfessionalLIst/ProfessionalList';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';


const ListProfessional = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const baseUrl = "http://localhost:8080/";

  useEffect(() => {
  
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage

        const response = await axios.get('${baseUrl}admin/all-professionals', {
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token in headers
          }
        });

        setDoctors(response.data);
        setAllDoctors(response.data);

        console.log("data:",response.data);

      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Implement proper error handling here
      }
    };

    fetchDoctors();

  }, []);


  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All doctors:", allDoctors);

    if (!searchTerm) {
      setFilteredDoctors(allDoctors);
    } else {
      const filtered = allDoctors.filter((doctor) =>
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.placeOfWork.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log("Filtered doctors:", filtered);

      setDoctors(filtered);
    }
  }, [searchTerm, allDoctors]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  // const handleBack = () => {
  //   navigate("/admin/dashboard");
  // }


  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <div>
        <Navbar/>

        <Breadcrumbs pageTitle="Professional List"/>

        <div className="doctors-list">
          
          <div className='search-back'>
            <div className='search-field'>
              <input
                type="text"
                placeholder="Search Doctors..."
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
                  <th>Doctor ID</th>
                  <th>Full Name</th>
                  <th>Specialization</th>
                  <th>Place of Work</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => (
                  <tr key={doctor.professionalId}>
                    <td>{doctor.professionalId}</td>
                    <td>{doctor.firstName} {doctor.lastName}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.placeOfWork}</td>
                    <td>
                      <Link className='view-link' to={`/admin/professional/${doctor.professionalId}`}>View</Link> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="doctor-list">
            <ProfessionalList professionals={currentDoctors} />
          </div>

          <div className='pagination'>
            <Pagination
              doctorsPerPage={doctorsPerPage}
              totalDoctors={filteredDoctors.length} 
              paginate={paginate}
            />
          </div>

        </div>

        <Footer/>
    </div>
  );
};

export default ListProfessional;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DoctorList.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";


const DoctorsList = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {

    // const fetchDoctors = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/admin/view-doctor-list');
    //     setDoctors(response.data);
    //     setAllDoctors(response.data);
    //   } catch (error) {
    //     console.error("Error fetching doctors:", error);
    //   }
    // };

    // fetchDoctors();


    //dummy
    const dummyDoctors = [
      { id: 1, name: 'John Doe', hospital: 'General Hospital', specialization: 'Cardiology' },
      { id: 2, name: 'Jane Smith', hospital: 'City Medical Center', specialization: 'Dermatology' },
      { id: 3, name: 'Michael Brown', hospital: "St. Judes Children's Hospital", specialization: 'Pediatrics' },

    ];
    setDoctors(dummyDoctors); 
    setAllDoctors(dummyDoctors);
    console.log("doctors:",doctors);
    console.log("alldoctors:", allDoctors);

  }, []);

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All doctors:", allDoctors);

    if (!searchTerm) {
      setFilteredDoctors(allDoctors);
    } else {
      const filtered = allDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log("Filtered doctors:", filtered);

      setDoctors(filtered);
    }
  }, [searchTerm, allDoctors]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const handleBack = () => {
    navigate("/AdminDashboard");
  }


  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <div>
        <Navbar/>
        <div className="doctors-list">
          
          <div className='search'>
            <div className='search-field'>
              <input
                type="text"
                placeholder="Search Doctors..."
                onChange={handleSearch}
                value={searchTerm} // Set input value to search term
              />
            </div>

            <div>
              <button onClick={handleBack}>Back</button>
            </div>
            
          </div>

          <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Name</th>
                  <th>Hospital</th>
                  <th>Specialization</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.hospital}</td>
                    <td>{doctor.specialization}</td>
                    <td>
                      <Link className='view-link' to={`/doctors/${doctor.id}`}>View</Link> {/* Route to doctor details page */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='pagination'>
            <Pagination
              doctorsPerPage={doctorsPerPage}
              totalDoctors={filteredDoctors.length} // Use total doctors even after filtering
              paginate={paginate}
            />
          </div>

        </div>
    </div>
  );
};

export default DoctorsList;

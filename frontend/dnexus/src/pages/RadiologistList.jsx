import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/RadiologistList.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";


const RadiologistList = () => {
  const navigate = useNavigate();

  const [rads, setRads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [radsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredRads, setFilteredRads] = useState([]);
  const [allRads, setAllRads] = useState([]);

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
    const dummyRads = [
      { id: 1, name: 'John Doe', hospital: 'General Hospital', specialization: 'Cardiology' },
      { id: 2, name: 'Jane Smith', hospital: 'City Medical Center', specialization: 'Dermatology' },
      { id: 3, name: 'Michael Brown', hospital: "St. Judes Children's Hospital", specialization: 'Pediatrics' },

    ];
    setRads(dummyRads); 
    setAllRads(dummyRads);
    console.log("rads:",rads);
    console.log("allrads:", allRads);

  }, []);

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All rads:", allRads);

    if (!searchTerm) {
      setFilteredRads(allRads);
    } else {
      const filtered = allRads.filter((rad) =>
        rad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rad.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rad.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log("Filtered rads:", filtered);

      setRads(filtered);
    }
  }, [searchTerm, allRads]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  }


  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastRad = currentPage * radsPerPage;
  const indexOfFirstRad = indexOfLastRad - radsPerPage;
  const currentRads = rads.slice(indexOfFirstRad, indexOfLastRad);

  return (
    <div>
        <Navbar/>
        <div className="rads-list">
          
          <div className='search-back'>
            <div className='search-field'>
              <input
                type="text"
                placeholder="Search Radiologists..."
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
                  <th>Radiologist ID</th>
                  <th>Name</th>
                  <th>Hospital</th>
                  <th>Specialization</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentRads.map((rad) => (
                  <tr key={rad.id}>
                    <td>{rad.id}</td>
                    <td>{rad.name}</td>
                    <td>{rad.hospital}</td>
                    <td>{rad.specialization}</td>
                    <td>
                      <Link className='view-link' to={`/admin/radiologist/${rad.id}`}>View</Link> {/* Route to doctor details page */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='pagination'>
            <Pagination
              doctorsPerPage={radsPerPage}
              totalDoctors={filteredRads.length} 
              paginate={paginate}
            />
          </div>

        </div>
    </div>
  );
};

export default RadiologistList;
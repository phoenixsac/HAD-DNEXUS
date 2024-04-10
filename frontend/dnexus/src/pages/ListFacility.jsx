import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/ListFacility.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";
import FacilityList from '../components/FacilityList/FacilityList';


const ListFacility = () => {
  const navigate = useNavigate();

  const [labs, setLabs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [labsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredLabs, setFilteredLabs] = useState([]);
  const [allLabs, setAllLabs] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
        const response = await axios.get('http://localhost:8080/admin/all-facilities', {
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token in the request headers
          }
        });
        setLabs(response.data);
        setAllLabs(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Handle error here, such as displaying an error message or redirecting the user
      }
    };
  
    fetchDoctors();
  }, []);
  

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All labs:", allLabs);

    if (!searchTerm) {
      setFilteredLabs(allLabs);
    } else {
      const filtered = allLabs.filter((lab) =>
        (lab.facilityUFID && lab.facilityUFID.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lab.facilityName && lab.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) )||
        (lab.facilitySubDistrict && lab.facilitySubDistrict.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lab.facility_ownership && lab.facility_ownership.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lab.facilityDistrict && lab.facilityDistrict.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      console.log("Filtered labs:", filtered);

      setLabs(filtered);
    }
  }, [searchTerm, allLabs]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  }


  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastLab = currentPage * labsPerPage;
  const indexOfFirstLab = indexOfLastLab - labsPerPage;
  const currentLabs = labs.slice(indexOfFirstLab, indexOfLastLab);

  return (
    <div>
        <Navbar/>
        <div className="labs-list">
          
          <div className='search-back'>
            <div className='search-field'>
              <input
                type="text"
                placeholder="Search Labs..."
                onChange={handleSearch}
                value={searchTerm} // Set input value to search term
              />
            </div>

            <div>
              <button onClick={handleBack}>Back</button>
            </div>
            
          </div>

          {/* <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Lab ID</th>
                  <th>facility_name</th>
                  <th>Location</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentLabs.map((lab) => (
                  <tr key={lab.id}>
                    <td>{lab.id}</td>
                    <td>{lab.facility_name}</td>
                    <td>{lab.location}</td>
                    <td>
                      <Link className='view-link' to={`/admin/facility/${lab.id}`}>View</Link> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="facility-list">
            <FacilityList facilities={currentLabs} />
          </div>

          <div className='pagination-container'>
            <Pagination
              doctorsPerPage={labsPerPage}
              totalDoctors={filteredLabs.length} 
              paginate={paginate}
              className='pagination'
            />
          </div>

        </div>
    </div>
  );
};

export default ListFacility;
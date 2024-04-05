import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/LabList.css"
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar";


const LabList = () => {
  const navigate = useNavigate();

  const [labs, setLabs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [labsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [filteredLabs, setFilteredLabs] = useState([]);
  const [allLabs, setAllLabs] = useState([]);

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
    const dummyLabs = [
      { id: 1, name: 'John Doe', location: 'General Hospital' },
      { id: 2, name: 'Jane Smith', location: 'City Medical Center'},
      { id: 3, name: 'Michael Brown', location: "St. Judes Children's Hospital"},

    ];
    setLabs(dummyLabs); 
    setAllLabs(dummyLabs);
    console.log("labs:",labs);
    console.log("alllabs:", allLabs);

  }, []);

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All labs:", allLabs);

    if (!searchTerm) {
      setFilteredLabs(allLabs);
    } else {
      const filtered = allLabs.filter((lab) =>
        lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.specialization.toLowerCase().includes(searchTerm.toLowerCase())
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

          <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Lab ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentLabs.map((lab) => (
                  <tr key={lab.id}>
                    <td>{lab.id}</td>
                    <td>{lab.name}</td>
                    <td>{lab.location}</td>
                    <td>
                      <Link className='view-link' to={`/admin/lab/${lab.id}`}>View</Link> {/* Route to lab details page */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='pagination'>
            <Pagination
              doctorsPerPage={labsPerPage}
              totalDoctors={filteredLabs.length} 
              paginate={paginate}
            />
          </div>

        </div>
    </div>
  );
};

export default LabList;
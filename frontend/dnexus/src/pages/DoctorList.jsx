import React, { useState } from "react";

import DoctorDashCard from "../components/DoctorDashCard/DoctorDashCard";
import PageNavigator from "../components/PageNavigator/PageNavigator";

import "./Style/DoctorList.css";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";

function DoctorList() {
  const [users, setUsers] = useState([
    // Replace with your actual user data
    {
      id: 1,
      name: "Doctor 1",
      text: "MBBS, MD",
      image: "https://picsum.photos/id/237/50/50",
    },
    {
      id: 2,
      name: "Doctor 2",
      text: "BDS",
      image: "https://picsum.photos/id/238/50/50",
    },
    // ... more users
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="app">
      <ConditionalNavbar />

      <div className="app-header">
        {/* <nav className="breadcrumbs">
          <a href="#">Home</a>
          <span>Doctors</span>
        </nav> */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search doctors"
        />
      </div>

      <main className="app-main">
        <DoctorDashCard users={filteredUsers} />
      </main>
      
      <footer className="app-footer">
        <PageNavigator
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / usersPerPage)}
          users={users} // Pass the users array
          onPageChange={handlePageChange} // Pass the onPageChange function as a prop
        />
      </footer>
    </div>
  );
}

export default DoctorList;

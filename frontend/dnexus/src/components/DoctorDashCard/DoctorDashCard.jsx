import React from "react";
import { useNavigate } from "react-router-dom";

import "./DoctorDashCard.css";

function DoctorDashCard({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserItem({ user }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("`/doctors/${user.id}`");

    console.log('Button clicked!');
  };
  

  return (
    <div className="user-item">
      <img src={user.image} alt={user.name} />
      <div className="user-details">
        <h2>{user.name}</h2>
      </div>
      <div className="user-details">
        <h2>{user.text}</h2>
      </div>
      <div className="user-button">
        <button onClick={handleClick}>
          View
        </button>
      </div>
    </div>
  );
}

export default DoctorDashCard;

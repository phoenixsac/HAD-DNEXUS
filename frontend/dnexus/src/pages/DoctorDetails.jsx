import React, { useState, useEffect } from "react";

// function DoctorDetails({ match }) {
//   const [doctorDetails, setDoctorDetails] = useState(null);
//   const doctorId = match.params.id; // Access doctor ID from URL parameter

//   useEffect(() => {
//     // Fetch doctor details from database using doctorId
//     fetch(`/api/doctors/${doctorId}`)
//       .then((response) => response.json())
//       .then((data) => setDoctorDetails(data));
//   }, [doctorId]); // Re-run effect when doctorId changes

//   if (!doctorDetails) {
//     return <p>Loading doctor details...</p>;
//   }

//   return (
//     <div className="doctor-details">
//       <h2>{doctorDetails.name}</h2>
//       <img src={doctorDetails.image} alt={doctorDetails.name} />
//       <p>{doctorDetails.specialization}</p>
//       <p>{doctorDetails.experience} years of experience</p>
//       <p>{doctorDetails.bio}</p>
//       {/* Add other doctor details as needed */}
//     </div>
//   );
// }

// export default DoctorDetails;

//testing

function DoctorDetails() {
  const mockDoctorDetails = {
    id: 1,
    name: "Dr. John Smith",
    image: "https://picsum.photos/id/237/50/50",
    specialization: "Cardiology",
    experience: 10,
    bio: "Dr. Smith is a highly experienced cardiologist...",
    // Add other details as needed
  };

  return (
    <div className="doctor-details">
      <h2>{mockDoctorDetails.name}</h2>
      <img src={mockDoctorDetails.image} alt={mockDoctorDetails.name} />
      <p>{mockDoctorDetails.specialization}</p>
      <p>{mockDoctorDetails.experience} years of experience</p>
      <p>{mockDoctorDetails.bio}</p>
      {/* Add other doctor details as needed */}
    </div>
  );
}

export default DoctorDetails;

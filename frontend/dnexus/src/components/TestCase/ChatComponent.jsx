// ChatComponent.jsx

import React, { useState, useEffect } from 'react';
import './ChatComponent.css';
import { useParams } from 'react-router-dom';
import MessagingPage from './MessagingPage';

const ChatComponent = () => {
  const [radiologists, setRadiologists] = useState([]);
  const [selectedRadiologistId, setSelectedRadiologistId] = useState(null); // State to store selected radiologist ID
  const { testId, consultationId } = useParams();
  const userType = sessionStorage.getItem('userType');
  const actorId = localStorage.getItem('actorId');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch radiologists from API based on user type
    if (userType === 'doctor') {
      const idParam = testId ? testId : consultationId;
      fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`)
        .then(response => response.json())
        .then(data => setRadiologists(data))
        .catch(error => console.error('Error fetching radiologists:', error));
    } else if (userType === 'radiologist') {
      fetch(`http://localhost:8085/core/professional/radiologist-details?radiologistId=${actorId}`)
        .then(response => response.json())
        .then(data => setRadiologists([data])) // Fetch only the radiologist with the actorId
        .catch(error => console.error('Error fetching radiologist:', error));
        console.log("raddddd",radiologists);
    }
  }, [userType, testId, consultationId, actorId]);
  
  // useEffect(() => {
  //   // Fetch radiologists from API
  //   const idParam = testId ? testId : consultationId;
  //   fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`)
  //     .then(response => response.json())
  //     .then(data => setRadiologists(data))
  //     .catch(error => console.error('Error fetching radiologists:', error));
  // }, []);

  const handleRadiologistClick = (radiologist) => {
    setSelectedRadiologistId(radiologist.id); // Set selected radiologist's ID
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set selected image URL
  };

  // Sample image paths
  const imagePaths = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
    // Add more image paths as needed
  ];

  return (
    <div className="chat-container">
      <div className="radiologist-list">
        <h2>Radiologists</h2>
        <ul>
          {radiologists.map(radiologist => (
            <li key={radiologist.id} onClick={() => handleRadiologistClick(radiologist)}>
              {radiologist.fullName||radiologist.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        <h2>Chat</h2>
        <MessagingPage selectedRadiologistId={selectedRadiologistId} /> {/* Pass selected radiologist's ID as prop */}
      </div>
    </div>
  );
};

export default ChatComponent;



// import React, { useState, useEffect } from 'react';
// import './ChatComponent.css';
// import { useParams } from 'react-router-dom';
// import MessagingPage from './MessagingPage';

// const ChatComponent = () => {
//   const [radiologists, setRadiologists] = useState([]);
//   const [selectedRadiologistId, setSelectedRadiologistId] = useState(null); // State to store selected radiologist ID
//   const { testId, consultationId } = useParams();
//   const userType = sessionStorage.getItem('userType');
//   const actorId = localStorage.getItem('actorId');
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     // Fetch radiologists from API based on user type
//     if (userType === 'doctor') {
//       const idParam = testId ? testId : consultationId;
//       fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`)
//         .then(response => response.json())
//         .then(data => setRadiologists(data))
//         .catch(error => console.error('Error fetching radiologists:', error));
//     } else if (userType === 'radiologist') {
//       fetch(`http://localhost:8085/core/professional/radiologist-details?radiologistId=${actorId}`)
//         .then(response => response.json())
//         .then(data => setRadiologists([data])) // Fetch only the radiologist with the actorId
//         .catch(error => console.error('Error fetching radiologist:', error));
//         console.log("raddddd",radiologists);
//     }
//   }, [userType, testId, consultationId, actorId]);
  
//   // useEffect(() => {
//   //   // Fetch radiologists from API
//   //   const idParam = testId ? testId : consultationId;
//   //   fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`)
//   //     .then(response => response.json())
//   //     .then(data => setRadiologists(data))
//   //     .catch(error => console.error('Error fetching radiologists:', error));
//   // }, []);

//   const handleRadiologistClick = (radiologist) => {
//     setSelectedRadiologistId(radiologist.id); // Set selected radiologist's ID
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl); // Set selected image URL
//   };

//   // Sample image paths
//   const imagePaths = [
//     './flowers-276014_640.jpg',
//     '/home/srishti/had_testpage/HAD-DNEXUS/frontend/dnexus/public/images/free-images.jpg',
//     '/home/srishti/had_testpage/HAD-DNEXUS/frontend/dnexus/public/images/free-nature-images.jpg'
//     // Add more image paths as needed
//   ];

//   return (
//     <div className="chat-container">
//       <div className="image-list">
//         <h2>Images</h2>
//         <div className="image-thumbnails">
//           {imagePaths.map((path, index) => (
//             <img
//               key={index}
//               src={path}
//               alt={`Image ${index}`}
//               onClick={() => handleImageClick(path)}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="radiologist-list">
//         <h2>Radiologists</h2>
//         <ul>
//           {radiologists.map(radiologist => (
//             <li key={radiologist.id} onClick={() => handleRadiologistClick(radiologist)}>
//               {radiologist.fullName||radiologist.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="chat-window">
//         <h2>Chat</h2>
//         <MessagingPage selectedRadiologistId={selectedRadiologistId} /> {/* Pass selected radiologist's ID as prop */}
//       </div>
//       <div className="selected-image">
//         {selectedImage && <img src={selectedImage} alt="Selected Image" />}
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

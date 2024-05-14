import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import "./Style/PatientViewProfile.css";

import Navbar from "../components/Navbar/ConditionalNavbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { AuthContext } from "../components/Authentication/AuthContext";
import Footer from "../components/Footer/Footer";


function PatientViewProfile() {
    const { actorId } = useContext(AuthContext);
    console.log("actorId:",actorId);
    const [actorIdState, setActorIdState] = useState(actorId || localStorage.getItem('actorId'));
    console.log("actorIdState:",actorIdState);

    const [patientDetails, setPatientDetails] = useState([]);
    const [profileDetails, setProfileDetails] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if actorId is available and not null
        if (actorId) {
          setActorIdState(actorId);
          localStorage.setItem('actorId', actorId);
        }
      }, [actorId]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                // Make API call to fetch patient details
                const response = await axios.get(`http://localhost:8085/core/consultation/patient-details-by-patient-id?patientId=${actorIdState}`);

                console.log("response.data:",response.data);

                // Set patient details in state
                setPatientDetails(response.data);
                console.log("email:",patientDetails.email);
                setIsLoading(false);
            } catch (error) {
                // Handle error
                console.error("Error fetching patient details:", error);
                setError("Error fetching patient details. Please try again.");
                setIsLoading(false);
            }
        };

        fetchPatientDetails();
    }, [actorIdState]);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            console.log("patientDetails.email:",patientDetails.email);
            if (patientDetails && patientDetails.email) {
                try {

                    const userType = sessionStorage.getItem('userType');
                    const jwtToken = localStorage.getItem('jwtToken');

                    if (!userType || !jwtToken) {
                        throw new Error('User type or token not found.');
                    }

                    // Make API call to fetch patient profile details
                    const profileResponse = await axios.get(`http://localhost:8080/patient/get-profile/${patientDetails.email}`, {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                          }
                    });
                    console.log("profileResponse:",profileResponse);

                    // Set profile details in state
                    setProfileDetails(profileResponse.data);

                    console.log("profileResponse.data:",profileResponse.data);
                } catch (error) {
                    // Handle error
                    console.error("Error fetching profile details:", error);
                    setError("Error fetching profile details. Please try again.");
                }
            }
        };

        fetchProfileDetails();
    }, [patientDetails]);

    return (
        <>
            <Navbar />
            <Breadcrumbs pageTitle="Patient Profile" />

            <div className="patient-view-profile-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : patientDetails ? (
                    <div >
                         <div className="patient-profile">
                            {profileDetails && (
                                <>
                                    <h1>{profileDetails.firstName} {profileDetails.lastName}</h1>

                                    <div className="patient-profile-section">
                                        <div className="patient-profile-section-left">
                                            <p>Age: {profileDetails.age}</p>
                                            <p>Gender: {profileDetails.gender}</p>
                                            <p>Date of Birth: {profileDetails.dob}</p>
                                            <p>Blood Group: {profileDetails.bloodGrp}</p>
                                            <p>Contact: {profileDetails.contact}</p>
                                        </div>
                                        <div className="patient-profile-section-right">
                                            <p>Email: {profileDetails.email}</p>
                                            
                                            <p>Address: {profileDetails.address}</p>
                                            <p>Guardian Name: {profileDetails.guardianFirstName} {profileDetails.guardianLastName}</p>
                                            <p>Guardian Contact: {profileDetails.guardianContact}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                         </div>
                        <div className="patient-profile-button">
                            {/* <button className="patient-profile-edit-btn">Edit</button> */}
                            <button className="patient-profile-delete-btn">Delete</button>
                        </div>
                    </div>
                ) : (
                    <p>No patient details available.</p>
                )}
            </div>

            <Footer/>
        </>
    );
}

export default PatientViewProfile;

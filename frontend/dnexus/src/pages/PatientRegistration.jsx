import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Navbar from "../components/Navbar/ConditionalNavbar";
import "./Style/PatientRegistration.css";

function PatientRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        contact: '',
        email: '',
        address: '',
        blood_grp: '',
        guardian_first_name: '',
        guardian_last_name: '',
        guardian_contact: ''
    });
    const [showOTPField, setShowOTPField] = useState(false); // State to manage the visibility of OTP field
    const [showSendButton, setShowSendButton] = useState(true); 
    const [otpVerified, setOTPVerified] = useState(false); // State to track OTP verification status

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData); // Print form data to console
        try {
            const response = await axios.post('http://localhost:8081/patient-signup', formData,{responseType: "text"});
            console.log('response data:', response.data); 
            console.log('response :', response); 

            // if (response.status === 200) 
                // const responseData = response.data; // Get response data as a string
               const responseData = response.data.trim();
               // console.log('response data:', responseData); 
                console.log('response :', response); 
                if (response.status === 201) {
                    alert('User added successfully');
                    // Navigate to PLogin
                    navigate('/PLogin');
                    // navigate('/PLogin'); // Success, navigate to login page
                } else if (response.status === 200) {
                    alert('User already exists');
                } else {
                    throw new Error('404 Not Found');
                }
            
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('User already exists'); // User already exists
            } else {
                console.error(error);
                alert('INVALID DATA!!!'); // Handle other errors
            }
        }
    };
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleSendConsentMail = () => {
    //     // Perform any actions related to sending consent mail
    //     // For example, show a popup, send a request, etc.
    //     setShowOTPField(true); 
    //     setShowSendButton(false); // Hide the "Send Consent Mail" button
    // };

    const handleSendConsentMail = async () => {
        try {
            // Send a request to the server to send consent mail with email as a query parameter
            const response = await axios.post(`http://localhost:8081/send-otp?email=${formData.email}`);
            console.log('response status:', response.status); 
            
            if (response.status === 200) {
                alert('OTP sent successfully');
                // If consent mail sent successfully, show OTP field and hide the "Send Consent Mail" button
                setShowOTPField(true);
                setShowSendButton(false);
             } //else if (response.status === 401) {
            //     // If consent mail sending fails, show an alert
            //     alert('Enter a valid email address');
            // }
        } catch (error) {
            if (error.response.status === 455) {
                alert('Email Field Empty. Enter Email');
                
                
             }
             else if (error.response.status === 456){
                alert('Invalid Email Format');

             }

             else if (error.response.status === 500){
                alert('OTP could not be sent. Try again Later');

             }
             

            // If an error occurs during sending consent mail, show an alert
            //  alert('Enter Valid Email Address');
            //  console.error(error);
        }
    };
    
    // const handleSendConsentMail = async () => {
    //     try {
    //         // Send a request to the server to send consent mail with email as a query parameter
    //         const response = await axios.post(`http://localhost:8081/send-otp?email=${formData.email}`);
            
    //         if (response.status === 200) {
    //             // If consent mail sent successfully, show OTP field and hide the "Send Consent Mail" button
    //             setShowOTPField(true);
    //             setShowSendButton(false);
    //         } else {
    //             // If consent mail sending fails, show an appropriate alert based on response status
    //             if (response.status === 401) {
    //                 alert('Enter a valid email address');
    //             } else {
    //                 alert('An error occurred');
    //             }
    //         }
    //     } catch (error) {
    //         // If an error occurs during sending consent mail, show an alert
    //         alert('An error occurred while sending consent mail');
    //         console.error(error);
    //     }
    // };

    const handleVerifyOTP = async () => {
        try {
            // Send a request to the server to verify the OTP with OTP as a query parameter
            const response = await axios.post(`http://localhost:8081/validate-otp?userEnteredOTP=${formData.otp}&email=${formData.email}`);
    
            if (response.status === 200) {
                alert('OTP verified successfully');
                setOTPVerified(true);
                // You can perform additional actions after OTP verification if needed
            } else if (response.status ===498){
                // If OTP verification fails, show an appropriate alert based on response status
                alert('OTP verification failed');
            }
        } catch (error) {

            if (error.response.status === 457) {
                alert('OTP Field Empty');
                
                
             }
             else if (error.response.status === 498){
                alert('OTP Expired. Try Again');
                setShowOTPField(false);
                setShowSendButton(true);
                

             }

             else if (error.response.status === 458){
                alert('Invalid otp format');

             }
             
             else if (error.response.status === 400){
                alert('Bad Request');

             }
            // console.error(error);
            // // If an error occurs during OTP verification, show an alert
            // alert('An error occurred during OTP verification');
        }
    };
    
    

    return (
        <>
            <Navbar />
            <div className='registrationHeading'><span>Registration Form</span></div>
            <form onSubmit={handleSubmit}>
                <div className='formContainer'>
                    <div className='directionContainer'>
                        <div className='inputLeft'>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="contact">Contact No.</label>
                            <input type="tel" id="contact" name="contact" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="email">Email ID</label>
                            <input type="email" id="email" name="email" placeholder="" onChange={handleChange} required/>

                            {/* Your existing form inputs */}
                    {/* {showSendButton && ( // Render "Send Consent Mail" button only if showSendButton is true
                        <div className='SubmitButton'>
                            <button type="button" onClick={handleSendConsentMail}>Send Consent Mail</button>
                        </div>
                    )} */}
                    {/* {showOTPField && ( // Show OTP field only when showOTPField is true
                        <div>
                        <label htmlFor="otp">Enter OTP</label>
                        <input type="text" id="otp" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
                        <button type="button" onClick={handleVerifyOTP}>Verify OTP</button>
                    </div>
                    )} */}
                            {/* {showOTPField && ( // Show OTP field only when showOTPField is true
                        <div>
                            <label htmlFor="otp">Enter OTP</label>
                            <input type="text" id="otp" placeholder="Enter OTP" />
                            <button type="submit">Verify OTP</button>
                        </div>
                    )}  */}

                        {!otpVerified && showSendButton && (
                                <div className='SubmitButton'>
                                    <button type="button" onClick={handleSendConsentMail}>Send Consent Mail</button>
                                </div>
                            )}
                            {showOTPField && !otpVerified && (
                                <div>
                                <label htmlFor="otp">Enter OTP</label>
                                <input type="text" id="otp" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
                                <button type="button" onClick={handleVerifyOTP}>Verify OTP</button>
                            </div>
                            )}
                            {otpVerified && (
                                <p>OTP verification successful</p>
                            )}

                        </div>
                        <div className='inputRight'>
                            <div className='makerow'>
                                <div className='agebox'>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" onChange={handleChange} required/>
                                </div>
                                <div className='makeInline'>
                                    <div className='makeInlinetext'>Gender</div>
                                    <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" id="others" name="gender" value="others" onChange={handleChange} />
                                    <label htmlFor="others">Others</label>
                                </div>
                            </div>
                            <div className='bloodgroup'>
                                <label htmlFor="blood_grp">Blood Group</label>
                                <input type="text" id="blood_grp" name="blood_grp" placeholder="" onChange={handleChange} required/>
                            </div>
                            <label htmlFor="guardian_first_name">Guardian First Name</label>
                            <input type="text" id="guardian_first_name" name="guardian_first_name" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="guardian_last_name">Guardian Last Name</label>
                            <input type="text" id="guardian_last_name" name="guardian_last_name" placeholder="" onChange={handleChange} required/>

                            <label htmlFor="guardian_contact">Guardian Contact</label>
                            <input type="tel" id="guardian_contact" name="guardian_contact" placeholder="" onChange={handleChange} required/>

                            {/* <label htmlFor="otp">OTP</label>
                            <input type="text" id="otp" placeholder="" /> */}
                            {/* <div>
                            <button type="submit">Verify OTP</button>
                            </div>  */}
                        </div>
                    </div>
                    <div className='SubmitButton'>
                        {/* <button type="submit">ADD</button> */}
                        <button type="submit" disabled={!otpVerified}>ADD</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PatientRegistration;
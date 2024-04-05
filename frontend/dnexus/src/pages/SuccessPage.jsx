import React from 'react';

import "./Style/SuccessPage.css";
import Navbar from "../components/Navbar/ConditionalNavbar"

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SuccessPage = ({ loginId, password }) => {
  return (
    <div>
      <Navbar/>
        <div className="success-page">
            <div className='icon'>
              <IoIosCheckmarkCircleOutline />
            </div>
            <div className='success-msg'>
              <div className='heading'>
                <h2>Added Successfully!</h2>
              </div>
              <div className='credentials'>
                <p>Please save the details for future use</p>
                <ul>
                    <li>Login Id: {loginId}</li>
                    <li>Password: {password}</li>
                </ul>
              </div>
            </div>
            <div className='button-div'>
              <button to={"/AdminDashboard"}>FINISH</button>
            </div>
        </div>
    </div>
  );
};

export default SuccessPage;

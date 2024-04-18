import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Success.css";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";


const Success = ({ loginId, password }) => {

    const navigate = useNavigate();

    const handleFinish = () => {
        navigate("/admin/dashboard");
      }

  return (
    <div>
        <div className="success-page">
            <div className='icon'>
              <IoIosCheckmarkCircleOutline />
            </div>
            <div className='success-msg'>
              <div className='heading'>
                <h2>Added Successfully!</h2>
              </div>
              <div className='credentials'>
                <p>Credentials send to professional's Email ID</p>
              </div>
            </div>
            <div className='button-div'>
              <button onClick={handleFinish}>FINISH</button>
            </div>
        </div>
    </div>
  );
};

export default Success;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Failure.css";

import { MdErrorOutline } from "react-icons/md";


const Failure = ({ loginId, password }) => {

    const navigate = useNavigate();

    const handleFinish = () => {
        navigate("/admin/dashboard");
      }

  return (
    <div>
        <div className="failure-page">
            <div className='red-icon'>
                <MdErrorOutline />
            </div>
            <div className='failure-msg'>
              <div className='heading'>
                <h5>ERROR <br/> Invalid ID</h5>
              </div>
            </div>
            {/* <div className='button-div'>
              <button onClick={handleFinish}>FINISH</button>
            </div> */}
        </div>
    </div>
  );
};

export default Failure;


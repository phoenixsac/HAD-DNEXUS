import React from 'react'

import "./Style/PatientReport.css";
import Navbar from "../components/Navbar/LoginNav";

function PatientReport() {
  return (
    <>
    <Navbar />
        <div className='PatientChoicecontainer'>
        <div className='PatientChoicechildcontainer'>
               
            
          <div className='PatientChoicecard' >
            <p>Lab Images</p>
          </div>

          <div className='PatientChoicecard' >
            <p>RadioLogist Impression</p>
          </div>

          <div className='PatientChoicecard' >
            <p>Final Report</p>
          </div>

         </div>
        </div>

    </>
  )
}

export default PatientReport
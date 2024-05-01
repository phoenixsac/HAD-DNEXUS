import React from 'react';
import { Link } from 'react-router-dom';

import "./FacilityList.css"

const FacilityList = ({ facilities }) => {

  return (
    <div className="facility-list" >

      <div className="facility-card heading-card">
        <div className="field">
          <p>Facility ID</p>
        </div>
        <div className="field">
          <p>Facility Name</p>
        </div>
        <div className="field">
          <p>Location</p>
        </div>
        <div className="field">
          <p>Ownership</p>
        </div>  
      </div>

      {facilities.map((facility) => (

        <Link className='facility-card-link' 
        key={facility.id} 
        to={`/admin/facility/${facility.facilityId}`}
        >  
          
          <div className="facility-card facility-list-bg">
            <div className="field">
              <p>{facility.facilityUFID}</p>
            </div>
            <div className="field">
              <p>{facility.facilityName}</p>
            </div>
            <div className="field">
              <p>{facility.facilitySubDistrict} {facility.facilityDistrict}</p>
            </div>
            <div className="field">
              <p>{facility.facility_ownership}</p>
            </div>  
          </div>
          
      </Link>

      ))}
    </div>
  );
};

export default FacilityList;
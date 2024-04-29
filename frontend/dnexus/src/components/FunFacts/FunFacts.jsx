import './FunFacts.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiUser } from "react-icons/ci";

const FunFacts = () => {
    return (
        <div id="fun-facts" className="fun-facts section overlay">
            <div className="container" style={{ height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,width: '1440px'}}>
            <div className="row" style={{ width: '1440px', justifyContent: 'center', alignItems: 'center',    marginLeft: '50px' }}>


                    <div className="col-lg-3 col-md-6 col-12">
                        {/* Start Single Fun */}
                        <div className="single-fun">
                        {/* <CiUser style={{ color: 'white' }} /> */}

                            <div className="content">
                                <span className="counter">3256</span>
                                <p>Happy Patients</p>
                            </div>
                        </div>
                        {/* End Single Fun */}
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        {/* Start Single Fun */}
                        <div className="single-fun">
                            
                            <div className="content">
                                <span className="counter">557</span>
                                <p>Specialist Doctors</p>
                            </div>
                        </div>
                        {/* End Single Fun */}
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        {/* Start Single Fun */}
                        <div className="single-fun">
                            
                            <div className="content">
                                <span className="counter">4379</span>
                                <p>Cases Resolved</p>
                            </div>
                        </div>
                        {/* End Single Fun */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default FunFacts;

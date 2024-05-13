import './FunFacts.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiUser } from "react-icons/ci";

const FunFacts = () => {
    return (
        <div id="fun-facts" className="fun-facts section overlay">
            <div className="fun">
                <div className="single-fun">
                    <div className="content">
                        <span className="counter">10</span>
                        <p>Happy Patients</p>
                    </div>
                </div>
                <div className="single-fun">
                    <div className="content">
                        <span className="counter">5</span>
                        <p>Specialist Doctors</p>
                    </div>
                </div>
                <div className="single-fun">
                    <div className="content">
                        <span className="counter">15</span>
                        <p>Cases Resolved</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FunFacts;

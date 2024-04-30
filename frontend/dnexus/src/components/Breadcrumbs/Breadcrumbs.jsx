import React from 'react';
import './Breadcrumbs.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Breadcrumbs = ({ pageTitle}) => {
    return (
        <div className="breadcrumbs overlay">
            <div>    
             <h2>{pageTitle}</h2>
            </div>
         </div>
           
    );
}

export default Breadcrumbs;
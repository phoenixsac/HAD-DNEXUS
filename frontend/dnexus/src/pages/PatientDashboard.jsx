import React from 'react';
import { Link } from 'react-router-dom';

import "./Style/PatientDashboard.css";
import Navbar from "../components/Navbar/ConditionalNavbar";

// const threads = [
//   { threadId: 1, threadName: 'Thread 1', isCompleted: false },
//   { threadId: 2, threadName: 'Thread 2', isCompleted: true },
//   { threadId: 3, threadName: 'Thread 3', isCompleted: true },
// ];

// function PatientDash({threads}) {
  function PatientDashboard() {  
    const threads = [
      { threadId: 1, threadName: 'Thread 1', isCompleted: false },
      { threadId: 2, threadName: 'Thread 2', isCompleted: true },
      { threadId: 3, threadName: 'Thread 3', isCompleted: true },
    ];

    
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='childcontainer'>
          {threads.map((thread) => (
            <div key={thread.threadId}>
              {thread.isCompleted ? (
                <Link to="/patient/report" className="link-no-underline">
                  <div className='card'>
                    <div className='cardId'><p>{thread.threadId}</p></div>
                    <div className='cardName'><p>{thread.threadName}</p></div>
                    <div className='cardStatus'><p>{thread.isCompleted ? 'COMPLETED' : 'ONGOING'}</p></div>
                  </div>
                </Link>
              ) : (
                <div className='card'>
                  <div className='cardId'><p>{thread.threadId}</p></div>
                  <div className='cardName'><p>{thread.threadName}</p></div>
                  <div className='cardStatus'><p>{thread.isCompleted ? 'COMPLETED' : 'ONGOING'}</p></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;

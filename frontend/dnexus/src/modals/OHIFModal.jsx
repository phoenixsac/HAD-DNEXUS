import React, { useEffect } from 'react';
import './OHIFModal.css';

function OHIFModal({ url, onClose }) {
  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-container">
          <button className="close-button" onClick={closeModal}>&times;</button>
          <div className="modal-header">
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
          <div className="modal-content">
            <iframe src={url} title="modal" width="100%" height="100%" style={{ border: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OHIFModal;

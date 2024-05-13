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
    <div className="ohif-modal-overlay" onClick={closeModal}>
      <div className="ohif-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ohif-modal-container">
          <button className="ohif-modal-close-button" onClick={closeModal}>&times;</button>
         
          <div className="ohif-modal-content">
            <iframe src={url} title="modal" width="100%" height="100%" style={{ border: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OHIFModal;

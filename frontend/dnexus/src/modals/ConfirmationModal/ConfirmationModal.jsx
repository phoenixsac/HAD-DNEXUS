import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ title, message, onConfirm, onClose, isDeleting, success }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="button-container">
          <button className="confirm" onClick={onConfirm} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Yes'}</button>
          <button className="cancel" onClick={onClose}>No</button>
        </div>
        {success && <p className="success-message">Professional successfully deleted</p>}
      </div>
    </div>
  );
};

export default ConfirmationModal;

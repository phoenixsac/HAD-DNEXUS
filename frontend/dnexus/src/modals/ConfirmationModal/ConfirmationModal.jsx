import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ title, message, onConfirm, onClose, isDeleting, success }) => {
  return (
    <div className="user-delete-confirmation-modal">
      <div className="user-delete-modal-content">
        {/* <h2>{title}</h2> */}
        <p>{message}</p>
        <div className="user-delete-modal-button-container">
          <button className="user-delete-confirm" onClick={onConfirm} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Yes'}</button>
          <button className="user-delete-cancel" onClick={onClose}>No</button>
        </div>
        {success && <p className="user-delete-success-message">Professional successfully deleted</p>}
      </div>
    </div>
  );
};

export default ConfirmationModal;

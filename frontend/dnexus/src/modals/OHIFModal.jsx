// Modal.js
import React, { useEffect } from 'react';
import './OHIFModal.css';

function OHIFModal({ url, onClose }) {
  useEffect(() => {
    const newTab = window.open(url, '_blank');
    return () => {
      newTab.close();
    };
  }, [url]);

  return null; // Modal doesn't render anything directly
}

export default OHIFModal;

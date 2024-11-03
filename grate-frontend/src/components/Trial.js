// src/CustomForm.js
import React, { useState } from 'react';

const Trial = () => {
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    // Close the modal only if clicking on the overlay
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

    return (
        <div className="flex items-center justify-center h-screen">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}>
          Open Modal
        </button>
  
        {/* Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={handleOutsideClick} // Attach click handler here
          >
            <div className="fixed inset-0 bg-black opacity-50" />
            <div
              className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
                isOpen ? "scale-100" : "scale-90"
              }`}
            >
              <h2 className="text-xl mb-4">Modal Title</h2>
              <p>This issdsdh a pop transition effect!</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default Trial;

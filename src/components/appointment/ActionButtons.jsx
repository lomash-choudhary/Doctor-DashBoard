import React from "react";

export default function ActionButtons({ onClose }) {
  const handleStartConsultation = () => {
    // Logic to start consultation
    console.log("Starting consultation");
    // You would likely add navigation or state changes here
  };

  return (
    <div className="flex justify-end space-x-4">
      <button
        onClick={onClose}
        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
      >
        Close
      </button>
      <button 
        onClick={handleStartConsultation}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
      >
        Start Consultation
      </button>
    </div>
  );
}
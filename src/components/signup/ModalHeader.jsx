import React from "react";

export default function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-2xl font-bold text-emerald-800 flex items-center">
          <i className="fas fa-user-md text-emerald-600 mr-2"></i>
          {title}
        </h3>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        aria-label="Close"
      >
        <i className="fas fa-times text-xl"></i>
      </button>
    </div>
  );
}

import React from "react";

export default function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
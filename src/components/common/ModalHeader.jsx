import React from "react";

export default function ModalHeader({ title, onClose }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <i className="fas fa-times text-xl"></i>
      </button>
    </div>
  );
}

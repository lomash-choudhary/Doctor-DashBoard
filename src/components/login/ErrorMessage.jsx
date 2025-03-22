import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
      <div className="flex items-center">
        <i className="fas fa-exclamation-circle mr-2"></i>
        {message}
      </div>
    </div>
  );
}
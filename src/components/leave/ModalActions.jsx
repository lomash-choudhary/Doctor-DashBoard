import React from "react";

export default function ModalActions({ onCancel, onSubmit, submitText = "Submit" }) {
  return (
    <div className="mt-8 flex justify-end space-x-4">
      <button
        onClick={onCancel}
        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
      >
        {submitText}
      </button>
    </div>
  );
}
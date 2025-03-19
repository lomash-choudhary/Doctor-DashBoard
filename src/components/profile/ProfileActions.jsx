import React from "react";

export default function ProfileActions({ setShowProfileModal, setShowTimeSlotModal }) {
  return (
    <div className="mt-8 flex justify-end space-x-4">
      <button
        onClick={() => {
          setShowProfileModal(false);
          setShowTimeSlotModal(true);
        }}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
      >
        Manage Time Slots
      </button>
      <button
        onClick={() => setShowProfileModal(false)}
        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
      >
        Close
      </button>
    </div>
  );
}
import React from "react";

export default function AppointmentInfo({ date, time }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-600">Date</p>
        <p className="font-semibold text-gray-800">{date}</p>
      </div>
      <div>
        <p className="text-gray-600">Time</p>
        <p className="font-semibold text-gray-800">{time}</p>
      </div>
    </div>
  );
}
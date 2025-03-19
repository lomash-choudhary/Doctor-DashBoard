import React from "react";

export default function PatientInfo({ patientImage, patientName, appointmentType }) {
  return (
    <div className="flex items-center">
      <img
        src={patientImage}
        alt={patientName}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-800">
          {patientName}
        </h4>
        <p className="text-gray-600">{appointmentType}</p>
      </div>
    </div>
  );
}
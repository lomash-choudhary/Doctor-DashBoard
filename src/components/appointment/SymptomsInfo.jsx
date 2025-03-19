import React from "react";

export default function SymptomsInfo({ symptoms }) {
  return (
    <div>
      <p className="text-gray-600">Symptoms</p>
      <p className="font-semibold text-gray-800">{symptoms}</p>
    </div>
  );
}
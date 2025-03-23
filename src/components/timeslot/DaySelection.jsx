import React from "react";

export default function DaySelection({
  selectedDay,
  onChange,
  disabled = false,
}) {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <label className="block text-gray-700 mb-2">Day</label>
      <select
        value={selectedDay}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        {weekdays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      {disabled && (
        <p className="mt-1 text-xs text-gray-500">
          Day cannot be changed when editing a time slot
        </p>
      )}
    </div>
  );
}

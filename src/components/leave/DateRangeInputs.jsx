import React from "react";

export default function DateRangeInputs({ startDate, endDate, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange("endDate", e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
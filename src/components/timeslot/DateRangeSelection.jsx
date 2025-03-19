import React from "react";

export default function DateRangeSelection({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
import React from "react";

export default function DateRangeSelection({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  errors = {},
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className={`w-full px-4 py-2 border ${
            errors.startDate ? "border-red-500" : "border-gray-200"
          } rounded-lg focus:outline-none focus:border-emerald-500`}
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 mb-2">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className={`w-full px-4 py-2 border ${
            errors.endDate ? "border-red-500" : "border-gray-200"
          } rounded-lg focus:outline-none focus:border-emerald-500`}
        />
        {errors.endDate && (
          <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
        )}
      </div>
    </div>
  );
}

import React from "react";

export default function TimeSelection({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  errors = {},
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2">
          Start Time <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className={`w-full px-4 py-2 border ${
            errors.start ? "border-red-500" : "border-gray-200"
          } rounded-lg focus:outline-none focus:border-emerald-500`}
        />
        {errors.start && (
          <p className="mt-1 text-sm text-red-500">{errors.start}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 mb-2">
          End Time <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          className={`w-full px-4 py-2 border ${
            errors.end ? "border-red-500" : "border-gray-200"
          } rounded-lg focus:outline-none focus:border-emerald-500`}
        />
        {errors.end && (
          <p className="mt-1 text-sm text-red-500">{errors.end}</p>
        )}
      </div>
    </div>
  );
}

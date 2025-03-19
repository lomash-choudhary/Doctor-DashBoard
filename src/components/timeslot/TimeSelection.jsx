import React from "react";

export default function TimeSelection({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange 
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-2">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
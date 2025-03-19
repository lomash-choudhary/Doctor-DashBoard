import React from "react";

export default function WeeklySchedule({ availability }) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Schedule
      </h4>
      <div className="space-y-3">
        {Object.entries(availability || {}).map(([day, slots]) => (
          <div
            key={day}
            className="flex items-center justify-between"
          >
            <span className="text-gray-600">{day}</span>
            <div className="flex space-x-2">
              {slots.map((slot, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    slot.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {slot.start} - {slot.end}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
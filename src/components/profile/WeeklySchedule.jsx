import React from "react";

export default function WeeklySchedule({ availability }) {
  // Check if there's any schedule data
  const hasSchedule = Object.values(availability || {}).some(
    (slots) => Array.isArray(slots) && slots.length > 0
  );

  // Days of the week with corresponding icons
  const daysWithIcons = [
    { day: "Monday", icon: "calendar-day" },
    { day: "Tuesday", icon: "calendar-day" },
    { day: "Wednesday", icon: "calendar-day" },
    { day: "Thursday", icon: "calendar-day" },
    { day: "Friday", icon: "calendar-day" },
    { day: "Saturday", icon: "calendar-week" },
    { day: "Sunday", icon: "calendar-week" },
  ];

  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-calendar-alt text-emerald-500 mr-2"></i>
        Weekly Schedule
      </h3>

      {hasSchedule ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
          {daysWithIcons.map(({ day, icon }) => (
            <div key={day} className="p-4">
              <div className="flex items-center mb-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    (availability[day]?.length || 0) > 0
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <i className={`fas fa-${icon}`}></i>
                </div>
                <h4 className="font-medium text-gray-800">{day}</h4>
              </div>

              {availability[day] && availability[day].length > 0 ? (
                <div className="ml-12 space-y-2">
                  {availability[day].map((slot, index) => (
                    <div
                      key={index}
                      className={`inline-block mr-2 px-3 py-1.5 rounded-md text-sm ${
                        slot.isAvailable
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <i
                        className={`fas fa-${
                          slot.isAvailable ? "clock" : "times-circle"
                        } mr-1`}
                      ></i>
                      {slot.start} - {slot.end}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-12 text-gray-500 text-sm italic">
                  No slots scheduled
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-300">
          <div className="text-gray-400 mb-2">
            <i className="fas fa-calendar-times text-5xl"></i>
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            No Schedule Available
          </h4>
          <p className="text-gray-500">
            You haven't set up your weekly schedule yet.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors inline-flex items-center"
            onClick={() => {
              /* Handle schedule setup */
            }}
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Time Slots
          </button>
        </div>
      )}
    </div>
  );
}

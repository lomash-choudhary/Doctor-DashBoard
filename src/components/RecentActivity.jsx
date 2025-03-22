import React from "react";

export function RecentActivity({ appointments }) {
  // Sort appointments by date (newest first) and take the first 5
  const recentAppointments = Array.isArray(appointments)
    ? [...appointments]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    : [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Recent Activity
      </h3>

      {recentAppointments.length > 0 ? (
        <div className="space-y-4">
          {recentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={appointment.patientImage}
                alt={appointment.patientName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {appointment.patientName}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.date} | {appointment.time}
                </p>
              </div>
              <span
                className={`ml-auto px-2 py-1 rounded-full text-xs ${
                  appointment.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : appointment.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
          <i className="fas fa-calendar-day text-3xl mb-3 opacity-30"></i>
          <p className="text-center">No recent activity to display</p>
          <p className="text-sm mt-1">New appointments will appear here</p>
        </div>
      )}
    </div>
  );
}

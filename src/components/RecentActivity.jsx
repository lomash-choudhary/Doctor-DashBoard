export function RecentActivity({ appointments = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={appointment.patientImage}
              alt={appointment.patientName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
              <h4 className="font-semibold text-gray-800">
                {appointment.patientName}
              </h4>
              <p className="text-gray-600">
                {appointment.type} - {appointment.time}
              </p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

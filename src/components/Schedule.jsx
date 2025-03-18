export default function Schedule({ doctorProfile, setShowLeaveModal, setShowTimeSlotModal }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Time Slots Management
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLeaveModal(true)}
            className="bg-amber-100 text-amber-700 px-4 py-2 text-sm font-medium rounded-lg hover:bg-amber-200 transition duration-300 !rounded-button whitespace-nowrap flex items-center"
          >
            <i className="fas fa-calendar-minus mr-2"></i>
            Request Leave
          </button>
          <button
            onClick={() => setShowTimeSlotModal(true)}
            className="bg-emerald-500 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Time Slot
          </button>
        </div>
      </div>
      <div className="flex border-b">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <div
            key={day}
            className={`flex-1 py-4 text-center ${
              day === "Monday"
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {doctorProfile.availability["Monday"]?.map((slot, index) => (
          <div
            key={index}
            className="flex items-center p-4 border rounded-lg"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="ml-4 text-gray-900 font-medium">
              {slot.start} - {slot.end}
            </span>
            <span className="ml-4 px-3 py-1 bg-emerald-50 text-emerald-500 text-sm rounded-full">
              Weekly
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Leaves
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctorProfile.leaves.map((leave, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        leave.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : leave.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {leave.status.charAt(0).toUpperCase() +
                        leave.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 hover:text-red-900">
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
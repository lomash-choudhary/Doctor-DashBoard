import { getLocalTimeSlots } from "@/services/api";

export default function Schedule({
  doctorProfile,
  setShowLeaveModal,
  setShowTimeSlotModal,
}) {
  // Early return with loading message if doctorProfile is undefined or null
  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          Doctor profile data is loading or unavailable...
        </div>
      </div>
    );
  }

  // Parse timeSlots data from the API format to a more usable structure
  const formatTimeSlots = () => {
    // Create an empty structure with all days
    const formattedAvailability = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    // Check if we have locally stored time slots first
    const localTimeSlots = getLocalTimeSlots();

    // Use timeSlots from API if available, then supplement with local storage data
    const timeSlotSources =
      localTimeSlots.length > 0
        ? [...(doctorProfile.timeSlots || []), ...localTimeSlots]
        : doctorProfile.timeSlots;

    // If timeSlots exist, populate the structure
    if (timeSlotSources && Array.isArray(timeSlotSources)) {
      timeSlotSources.forEach((daySlot) => {
        const dayName = daySlot.dayName;

        if (daySlot.slots && Array.isArray(daySlot.slots)) {
          // Map each slot to the format expected by the UI
          const formattedSlots = daySlot.slots.map((slot) => ({
            start: slot.startTime,
            end: slot.endTime,
            capacity: slot.maxPatientsInTheSlot,
            isRecurring: slot.recurring,
            status: slot.status,
            // Add a flag for locally stored slots
            isLocalOnly: !!slot.isLocalOnly,
          }));

          // Add the formatted slots to the day
          if (formattedAvailability[dayName]) {
            // Combine with any existing slots
            formattedAvailability[dayName] = [
              ...formattedAvailability[dayName],
              ...formattedSlots,
            ];
          }
        }
      });
    }

    return formattedAvailability;
  };

  const availability = formatTimeSlots();

  // Get Monday slots or default to empty array
  const mondaySlots = Array.isArray(availability.Monday)
    ? availability.Monday
    : [];

  // Create a default empty array for leaves if they don't exist
  const leaves = Array.isArray(doctorProfile.leaves)
    ? doctorProfile.leaves
    : [];

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

      {/* Development mode banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-code text-amber-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">
              Developer Note
            </h3>
            <div className="mt-1 text-sm text-amber-700">
              <p>
                The time slot API is currently under development. Any time slots
                you add are stored temporarily in your browser and will be lost
                if you clear your browser data.
              </p>
            </div>
          </div>
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
        {mondaySlots.length > 0 ? (
          mondaySlots.map((slot, index) => (
            <div
              key={index}
              className={`flex items-center p-4 border rounded-lg ${
                slot.isLocalOnly ? "border-amber-200 bg-amber-50" : ""
              }`}
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="ml-4 text-gray-900 font-medium">
                {slot.start} - {slot.end}
              </span>
              <span className="ml-4 px-3 py-1 bg-emerald-50 text-emerald-500 text-sm rounded-full">
                {slot.isRecurring ? "Weekly" : "One-time"}
              </span>
              {slot.capacity && (
                <span className="ml-4 text-gray-600 text-sm">
                  Capacity: {slot.capacity} patients
                </span>
              )}
              {slot.status && (
                <span
                  className={`ml-4 px-3 py-1 text-xs rounded-full ${
                    slot.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {slot.status}
                </span>
              )}
              {slot.isLocalOnly && (
                <span className="ml-auto px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  Local Only
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No time slots defined for Monday. Click "Add Time Slot" to create
            one.
          </div>
        )}
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
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
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
                        {leave.status?.charAt(0).toUpperCase() +
                          leave.status?.slice(1) || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-red-600 hover:text-red-900">
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No leave requests found. Click "Request Leave" to create
                    one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

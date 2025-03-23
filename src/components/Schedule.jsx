import { useState } from "react";
import {
  getLocalTimeSlots,
  deleteDoctorTimeSlot,
  getDoctorInfo,
} from "@/services/api";
import TimeSlotActionMenu from "./timeslot/TimeSlotActionMenu";

export default function Schedule({
  doctorProfile,
  setShowLeaveModal,
  setShowTimeSlotModal,
  setSelectedSlot, // Add this prop
}) {
  const [activeDay, setActiveDay] = useState("Monday");
  const [loading, setLoading] = useState(false);

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

  // Get active day slots or default to empty array
  const activeDaySlots = Array.isArray(availability[activeDay])
    ? availability[activeDay]
    : [];

  // Create a default empty array for leaves if they don't exist
  const leaves = Array.isArray(doctorProfile.leaves)
    ? doctorProfile.leaves
    : [];

  // Handle time slot deletion
  const handleDeleteTimeSlot = async (slot) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) {
      return;
    }

    try {
      setLoading(true);

      // Format the delete data
      const deleteData = {
        dayName: activeDay,
        slots: [
          {
            startTime: slot.start,
            endTime: slot.end,
          },
        ],
      };

      // Display loading notification
      const loadingDiv = document.createElement("div");
      loadingDiv.className =
        "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      loadingDiv.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Deleting time slot...`;
      document.body.appendChild(loadingDiv);

      // Call API to delete the time slot
      await deleteDoctorTimeSlot(deleteData);

      loadingDiv.remove();

      // Show success notification
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Time slot deleted successfully!`;
      document.body.appendChild(successDiv);

      // Refresh the doctor profile
      const username = localStorage.getItem("doctorUsername");
      const updatedDataResponse = await getDoctorInfo(username);
      // Force page reload to reflect changes
      window.location.reload();

      setTimeout(() => successDiv.remove(), 3000);
    } catch (error) {
      console.error("Failed to delete time slot:", error);

      // Show error notification
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i> Failed to delete time slot: ${error.message}`;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click - pass slot data to parent component
  const handleEditTimeSlot = (slot) => {
    // Set the selected slot for editing
    const slotForEdit = {
      day: activeDay,
      start: slot.start,
      end: slot.end,
      capacity: slot.capacity || 1,
      isRecurring: slot.isRecurring,
      status: slot.status || "ACTIVE",
      isEditMode: true,
      originalStart: slot.start, // Keep track of original start time for updating
    };

    // Set the selected slot using the setter from props
    setSelectedSlot(slotForEdit);

    // Open the modal with the selected slot data
    setShowTimeSlotModal(true);
  };

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
            onClick={() => {
              setSelectedSlot(null); // Reset selected slot for a new slot
              setShowTimeSlotModal(true);
            }}
            className="bg-emerald-500 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Time Slot
          </button>
        </div>
      </div>

      {/* API Info */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-blue-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Time Slot Management
            </h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>
                You can now add multiple time slots per day, update existing
                time slots, and delete time slots. Click on the actions menu
                (...) next to a slot to edit or delete it.
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
            className={`flex-1 py-4 text-center cursor-pointer ${
              day === activeDay
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {activeDaySlots.length > 0 ? (
          activeDaySlots.map((slot, index) => (
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

              {/* Actions menu */}
              <div className="ml-auto">
                <TimeSlotActionMenu
                  onEdit={() => handleEditTimeSlot(slot)}
                  onDelete={() => handleDeleteTimeSlot(slot)}
                  isDisabled={loading}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No time slots defined for {activeDay}. Click "Add Time Slot" to
            create one.
          </div>
        )}
      </div>

      {/* Leave requests section */}
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

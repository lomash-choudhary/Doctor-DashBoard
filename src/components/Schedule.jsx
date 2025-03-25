import { useState } from "react";
import {
  getLocalTimeSlots,
  deleteDoctorTimeSlot,
  getDoctorInfo,
} from "@/services/api";
import TimeSlotActionMenu from "./timeslot/TimeSlotActionMenu";
import TimeSlotDetailsModal from "./timeslot/TimeSlotDetailsModal";
import { formatTo12Hour, getTimeDisplay } from "@/utils/timeFormatter";
import { formatApiError } from "@/utils/errorHandler";
import ExceptionBadge from "./timeslot/ExceptionBadge";

export default function Schedule({
  doctorProfile,
  setShowLeaveModal,
  setShowTimeSlotModal,
  setSelectedSlot,
}) {
  const [activeDay, setActiveDay] = useState("Monday");
  const [loading, setLoading] = useState(false);
  const [detailSlot, setDetailSlot] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
          const formattedSlots = daySlot.slots.map((slot) => {
            console.log(
              `Processing slot for ${dayName}:`,
              JSON.stringify(slot)
            );

            // Ensure exceptions are properly parsed and normalized
            const normalizedExceptions = Array.isArray(slot.exceptions)
              ? slot.exceptions.map((exception) => {
                  console.log(`Exception data:`, JSON.stringify(exception));
                  // If _id exists but no status or date, it might be a reference that needs to be expanded
                  if (
                    exception._id &&
                    (!exception.status || !exception.expectedDateOfException)
                  ) {
                    console.warn("Incomplete exception data:", exception);
                  }
                  return {
                    ...exception,
                    // Make sure expectedDateOfException is a proper date string if it exists
                    expectedDateOfException:
                      exception.expectedDateOfException || null,
                  };
                })
              : [];

            // Calculate upcoming exceptions
            const upcomingExceptions = normalizedExceptions
              .filter((exception) => {
                if (!exception.expectedDateOfException) {
                  console.warn(
                    "Exception missing expectedDateOfException:",
                    exception
                  );
                  return false;
                }
                const exceptionDate = new Date(
                  exception.expectedDateOfException
                );
                const today = new Date();
                return !isNaN(exceptionDate) && exceptionDate >= today;
              })
              .sort(
                (a, b) =>
                  new Date(a.expectedDateOfException) -
                  new Date(b.expectedDateOfException)
              )
              .slice(0, 3); // Limit to 3 most recent for display

            console.log(
              `Found ${upcomingExceptions.length} upcoming exceptions for ${dayName} slot (${slot.startTime}-${slot.endTime})`
            );

            return {
              start: slot.startTime,
              end: slot.endTime,
              startFormatted: getTimeDisplay(slot.startTime),
              endFormatted: getTimeDisplay(slot.endTime),
              capacity: slot.maxPatientsInTheSlot,
              isRecurring: slot.recurring,
              status: slot.status,
              exceptions: normalizedExceptions,
              upcomingExceptions: upcomingExceptions,
              isLocalOnly: !!slot.isLocalOnly,
              // Add this property to easily check if it has exceptions
              hasExceptions: normalizedExceptions.length > 0,
            };
          });

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

  // Show details of a time slot
  const handleViewDetails = (slot) => {
    // Add day information to the slot for context
    const slotWithContext = {
      ...slot,
      day: activeDay,
    };
    setDetailSlot(slotWithContext);
    setShowDetailsModal(true);
  };

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

      // Format the error for user-friendly display
      const userMessage = formatApiError(error, "deleting time slot");

      // Show error notification
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i> ${userMessage}`;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click - pass slot data to parent component
  const handleEditTimeSlot = (slot) => {
    // Set the selected slot for editing - ensure all required fields are included
    const slotForEdit = {
      day: activeDay,
      start: slot.start, // Preserve original time format from backend
      end: slot.end, // Preserve original time format from backend
      startFormatted: slot.startFormatted, // Keep the display format
      endFormatted: slot.endFormatted, // Keep the display format
      capacity: slot.capacity || 1,
      isRecurring: slot.isRecurring || false,
      status: slot.status || "ACTIVE",
      exceptions: slot.exceptions || [],
      isEditMode: true,
      originalStart: slot.start, // Keep original for backend reference
    };

    console.log("Setting up edit for time slot:", slotForEdit);

    // Set the selected slot using the setter from props
    setSelectedSlot(slotForEdit);

    // Open the modal with the selected slot data
    setShowTimeSlotModal(true);
  };

  // Check if a slot has any exceptions
  const hasExceptions = (slot) => {
    return (
      slot.hasExceptions || (slot.exceptions && slot.exceptions.length > 0)
    );
  };

  // Count upcoming exceptions (within the next 30 days)
  const countUpcomingExceptions = (slot) => {
    if (!slot.exceptions || !Array.isArray(slot.exceptions)) return 0;

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return slot.exceptions.filter((exception) => {
      const exceptionDate = new Date(exception.expectedDateOfException);
      return exceptionDate >= today && exceptionDate <= thirtyDaysFromNow;
    }).length;
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
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                slot.isLocalOnly ? "border-amber-200" : "border-gray-200"
              } ${
                hasExceptions(slot)
                  ? "border-red-200 shadow-sm hover:shadow-md"
                  : "hover:border-emerald-200"
              }`}
            >
              {/* Main slot information - clickable to show details */}
              <div
                className={`flex flex-col md:flex-row md:items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  slot.isLocalOnly ? "bg-amber-50" : ""
                } ${
                  hasExceptions(slot)
                    ? "bg-gradient-to-r from-red-50 to-white"
                    : ""
                }`}
                onClick={() => handleViewDetails(slot)}
              >
                <div className="flex items-center flex-grow">
                  <div
                    className={`w-2 h-10 ${
                      hasExceptions(slot) ? "bg-red-500" : "bg-emerald-500"
                    } rounded-full mr-4`}
                  ></div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium mr-2">
                        {slot.startFormatted} - {slot.endFormatted}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full">
                        {slot.isRecurring ? "Weekly" : "One-time"}
                      </span>
                      {slot.capacity && (
                        <span className="ml-2 text-gray-600 text-xs px-2 py-1 bg-gray-100 rounded-full flex items-center">
                          <i className="fas fa-user-friends text-gray-400 mr-1"></i>
                          {slot.capacity}
                        </span>
                      )}
                      {slot.status && (
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full flex items-center ${
                            slot.status === "ACTIVE"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          <i
                            className={`fas fa-${
                              slot.status === "ACTIVE"
                                ? "check-circle"
                                : "times-circle"
                            } mr-1`}
                          ></i>
                          {slot.status}
                        </span>
                      )}
                    </div>

                    {/* Display upcoming exceptions directly in the card */}
                    {slot.upcomingExceptions &&
                      slot.upcomingExceptions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 items-center">
                          <span className="text-xs text-red-600 font-medium">
                            <i className="fas fa-exclamation-circle mr-1"></i>
                            {!slot.isRecurring
                              ? "Non-recurring - Unavailable except:"
                              : "Unavailable on:"}
                          </span>
                          {slot.upcomingExceptions.map((exception, idx) => (
                            <ExceptionBadge key={idx} exception={exception} />
                          ))}

                          {/* Show indicator for additional exceptions */}
                          {countUpcomingExceptions(slot) > 3 && (
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              +{countUpcomingExceptions(slot) - 3} more
                            </span>
                          )}
                        </div>
                      )}
                  </div>
                </div>

                {slot.isLocalOnly && (
                  <span className="ml-auto px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded mr-2 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    Local Only
                  </span>
                )}

                {/* Actions menu */}
                <div className="ml-auto mt-2 md:mt-0">
                  <TimeSlotActionMenu
                    onEdit={() => handleEditTimeSlot(slot)}
                    onDelete={() => handleDeleteTimeSlot(slot)}
                    isDisabled={loading}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-gray-400 mb-3">
              <i className="fas fa-calendar-times text-4xl"></i>
            </div>
            <h3 className="text-gray-500 font-medium mb-1">
              No time slots defined
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Click "Add Time Slot" to create a schedule for {activeDay}
            </p>
            <button
              onClick={() => {
                setSelectedSlot({
                  day: activeDay,
                  start: "09:00",
                  end: "17:00",
                  isRecurring: true,
                  capacity: 1,
                  status: "ACTIVE",
                });
                setShowTimeSlotModal(true);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center"
            >
              <i className="fas fa-plus-circle mr-2"></i>
              Add Time Slot
            </button>
          </div>
        )}
      </div>

      {/* Time Slot Details Modal */}
      <TimeSlotDetailsModal
        slot={detailSlot}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        onEdit={() => {
          setShowDetailsModal(false);
          if (detailSlot) handleEditTimeSlot(detailSlot);
        }}
        onDelete={() => {
          setShowDetailsModal(false);
          if (detailSlot) handleDeleteTimeSlot(detailSlot);
        }}
      />

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

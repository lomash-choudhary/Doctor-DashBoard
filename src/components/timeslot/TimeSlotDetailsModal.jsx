import React from "react";
import ModalHeader from "../common/ModalHeader";
import { getTimeDisplay } from "@/utils/timeFormatter";

export default function TimeSlotDetailsModal({
  slot,
  showModal,
  setShowModal,
  onEdit,
  onDelete,
}) {
  if (!showModal || !slot) return null;

  // Format dates for better display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e, dateString);
      return dateString || "N/A";
    }
  };

  // Get exception status label with icon
  const getExceptionStatusLabel = (status) => {
    switch (status) {
      case "DAY_OFF":
        return { label: "Day Off", icon: "fa-home" };
      case "HOLIDAY":
        return { label: "Holiday", icon: "fa-gift" };
      case "LEAVE":
        return { label: "Leave", icon: "fa-suitcase" };
      default:
        return { label: status, icon: "fa-calendar-times" };
    }
  };

  // Check how many upcoming exceptions
  const getUpcomingExceptionsCount = () => {
    if (!slot.exceptions || !Array.isArray(slot.exceptions)) return 0;

    const today = new Date();
    return slot.exceptions.filter((exception) => {
      const exceptionDate = new Date(exception.expectedDateOfException);
      return exceptionDate >= today;
    }).length;
  };

  // Format slot times for display - use the original formatted times if available
  const startFormatted = slot.startFormatted || getTimeDisplay(slot.start);
  const endFormatted = slot.endFormatted || getTimeDisplay(slot.end);
  
  // Count upcoming exceptions
  const upcomingExceptionsCount = getUpcomingExceptionsCount();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <ModalHeader
          title="Time Slot Details"
          onClose={() => setShowModal(false)}
        />

        <div className="space-y-6">
          {/* Time Slot Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <div className={`w-3 h-10 ${upcomingExceptionsCount > 0 ? "bg-red-500" : "bg-emerald-500"} rounded-full`}></div>
              <h3 className="ml-3 text-lg font-semibold text-gray-800">
                {slot.day}: {startFormatted} - {endFormatted}
              </h3>
              <span
                className={`ml-auto px-3 py-1 text-xs rounded-full ${
                  slot.status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {slot.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient Capacity</p>
                <p className="font-medium flex items-center">
                  <i className="fas fa-user-friends text-emerald-400 mr-2"></i>
                  {slot.capacity || 1}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule Type</p>
                <p className="font-medium flex items-center">
                  <i className={`fas fa-${slot.isRecurring ? "sync" : "calendar-day"} text-emerald-400 mr-2`}></i>
                  {slot.isRecurring ? "Weekly Recurring" : "One-time"}
                </p>
              </div>
            </div>
          </div>

          {/* Time Slot Exceptions */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
              <i className="fas fa-calendar-times text-red-500 mr-2"></i>
              Exceptions
              {upcomingExceptionsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                  {upcomingExceptionsCount} upcoming
                </span>
              )}
            </h4>

            {slot.exceptions && slot.exceptions.length > 0 ? (
              <div className="space-y-2">
                {upcomingExceptionsCount > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-circle text-red-400"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          This time slot has {upcomingExceptionsCount} upcoming exception{upcomingExceptionsCount === 1 ? "" : "s"} when it won't
                          be available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {slot.exceptions.map((exception, index) => {
                        // Ensure exception.expectedDateOfException is a valid date
                        let exceptionDate;
                        try {
                          exceptionDate = new Date(exception.expectedDateOfException);
                          if (isNaN(exceptionDate.getTime())) {
                            console.error("Invalid exception date:", exception.expectedDateOfException);
                            exceptionDate = null;
                          }
                        } catch (e) {
                          console.error("Error parsing exception date:", e);
                          exceptionDate = null;
                        }
                        
                        const isUpcoming = exceptionDate && exceptionDate >= new Date();
                        const { label, icon } = getExceptionStatusLabel(exception.status);

                        return (
                          <tr
                            key={index}
                            className={`transition-colors ${isUpcoming ? "bg-red-50" : ""}`}
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {formatDate(exception.expectedDateOfException)}
                              {isUpcoming && (
                                <span className="ml-2 text-xs text-red-600 animate-pulse">
                                  <i className="fas fa-clock"></i> Upcoming
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 flex items-center w-fit">
                                <i className={`fas ${icon} mr-1`}></i>
                                {label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <i className="fas fa-info-circle text-gray-400 mr-2"></i>
                  No exceptions defined for this time slot.
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <i className="fas fa-edit mr-2"></i>
              Edit Time Slot
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <i className="fas fa-trash-alt mr-2"></i>
              Delete
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

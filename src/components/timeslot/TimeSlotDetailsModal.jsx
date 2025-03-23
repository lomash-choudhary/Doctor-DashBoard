import React from "react";
import ModalHeader from "../common/ModalHeader";
import { formatTo12Hour } from "@/utils/timeFormatter";

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
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString || "N/A";
    }
  };

  // Get exception status label
  const getExceptionStatusLabel = (status) => {
    switch (status) {
      case "DAY_OFF":
        return "Day Off";
      case "HOLIDAY":
        return "Holiday";
      case "LEAVE":
        return "Leave";
      default:
        return status;
    }
  };

  // Check if there are any upcoming exceptions
  const hasUpcomingExceptions = () => {
    if (!slot.exceptions || !Array.isArray(slot.exceptions)) return false;

    const today = new Date();
    return slot.exceptions.some((exception) => {
      const exceptionDate = new Date(exception.expectedDateOfException);
      return exceptionDate >= today;
    });
  };

  // Format slot times for display
  const startFormatted = slot.startFormatted || formatTo12Hour(slot.start);
  const endFormatted = slot.endFormatted || formatTo12Hour(slot.end);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader
          title="Time Slot Details"
          onClose={() => setShowModal(false)}
        />

        <div className="space-y-6">
          {/* Time Slot Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
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
                <p className="font-medium">{slot.capacity || 1}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule Type</p>
                <p className="font-medium">
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
            </h4>

            {slot.exceptions && slot.exceptions.length > 0 ? (
              <div className="space-y-2">
                {hasUpcomingExceptions() && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-circle text-red-400"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          This time slot has upcoming exceptions when it won't
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
                        const exceptionDate = new Date(
                          exception.expectedDateOfException
                        );
                        const isUpcoming = exceptionDate >= new Date();

                        return (
                          <tr
                            key={index}
                            className={isUpcoming ? "bg-red-50" : ""}
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {formatDate(exception.expectedDateOfException)}
                              {isUpcoming && (
                                <span className="ml-2 text-xs text-red-600">
                                  <i className="fas fa-clock"></i> Upcoming
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                {getExceptionStatusLabel(exception.status)}
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
              <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg">
                No exceptions defined for this time slot.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <i className="fas fa-edit mr-2"></i>
              Edit Time Slot
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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

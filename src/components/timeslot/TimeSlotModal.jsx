import React, { useState, useEffect } from "react";
import ModalHeader from "../common/ModalHeader";
import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import RecurringOption from "./RecurringOption";
import ExceptionsSection from "./ExceptionsSection";
import ModalActions from "./ModalActions";
import { formatTo12Hour } from "@/utils/timeFormatter";
import { formatApiError } from "@/utils/errorHandler";

export default function TimeSlotModal({
  showTimeSlotModal,
  setShowTimeSlotModal,
  newTimeSlot,
  setNewTimeSlot,
  onSubmit,
  isLoading,
  selectedSlot = null,
}) {
  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState(null);
  const [exceptions, setExceptions] = useState([]);

  // Determine if we're in edit mode
  const isEditMode = selectedSlot?.isEditMode || false;

  // Initialize form with selected slot data if in edit mode
  useEffect(() => {
    if (selectedSlot && selectedSlot.isEditMode) {
      setNewTimeSlot(selectedSlot);
      if (selectedSlot.exceptions) {
        setExceptions(selectedSlot.exceptions);
      }
    }
  }, [selectedSlot, setNewTimeSlot]);

  // Validation function
  const validateTimeSlot = () => {
    const newErrors = {};

    // Validate time fields
    if (!newTimeSlot.start) {
      newErrors.start = "Start time is required";
    }

    if (!newTimeSlot.end) {
      newErrors.end = "End time is required";
    } else if (
      newTimeSlot.start &&
      newTimeSlot.end &&
      newTimeSlot.start >= newTimeSlot.end
    ) {
      newErrors.end = "End time must be after start time";
    }

    // Validate capacity
    if (!newTimeSlot.capacity || newTimeSlot.capacity < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    // Validate date range if not recurring
    if (!newTimeSlot.isRecurring) {
      // We're keeping only the exceptions when not recurring,
      // but we still need these dates on the backend
      if (!newTimeSlot.startDate) {
        // Set today as default if not provided
        const today = new Date().toISOString().split("T")[0];
        setNewTimeSlot({ ...newTimeSlot, startDate: today });
      }

      if (!newTimeSlot.endDate) {
        // Set a default end date if not provided (30 days from today)
        const defaultEndDate = new Date();
        defaultEndDate.setDate(defaultEndDate.getDate() + 30);
        setNewTimeSlot({
          ...newTimeSlot,
          endDate: defaultEndDate.toISOString().split("T")[0],
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding an exception
  const handleAddException = (exception) => {
    setExceptions([...exceptions, exception]);
  };

  // Handle removing an exception
  const handleRemoveException = (index) => {
    const updatedExceptions = [...exceptions];
    updatedExceptions.splice(index, 1);
    setExceptions(updatedExceptions);
  };

  // Handle submission - updated to include exceptions and handle edit mode
  const handleSubmit = () => {
    if (validateTimeSlot()) {
      // Create time slot data with exceptions
      const timeSlotData = {
        ...newTimeSlot,
        exceptions,
      };

      // Set API status to show endpoint info is being gathered
      setApiStatus("pending");

      // Prepare data differently based on add or edit mode
      const payload = isEditMode
        ? {
            // Format for update
            dayName: timeSlotData.day,
            slots: [
              {
                startTime: timeSlotData.originalStart, // Use original start time to find the slot
                endTime: timeSlotData.end, // Current end time for identification
                newStartTime: timeSlotData.start, // New start time for update
                newEndTime: timeSlotData.end, // New end time for update
                maxPatientsInTheSlot: timeSlotData.capacity,
                status: timeSlotData.status || "ACTIVE",
                recurring: timeSlotData.isRecurring,
                exceptions: timeSlotData.exceptions || [],
              },
            ],
          }
        : {
            // Format for add
            dayName: timeSlotData.day,
            slots: [
              {
                startTime: timeSlotData.start,
                endTime: timeSlotData.end,
                maxPatientsInTheSlot: timeSlotData.capacity || 1,
                status: timeSlotData.status || "ACTIVE",
                recurring: timeSlotData.isRecurring,
                exceptions: timeSlotData.exceptions || [],
                ...(timeSlotData.isRecurring
                  ? {}
                  : {
                      startDate: timeSlotData.startDate,
                      endDate: timeSlotData.endDate,
                    }),
              },
            ],
          };

      // Pass the data with exceptions to parent component
      onSubmit(payload, isEditMode)
        .then(() => {
          setApiStatus("success");
          // Only close modal on success
          setShowTimeSlotModal(false);

          // Reset form for next use
          setNewTimeSlot({
            day: "Monday",
            start: "09:00",
            end: "17:00",
            isRecurring: true,
            startDate: "",
            endDate: "",
            capacity: 1,
          });
          setExceptions([]);
        })
        .catch((error) => {
          console.error("Time slot submission error:", error);
          // Format error message in a user-friendly way
          const context = isEditMode
            ? "updating time slot"
            : "adding time slot";
          const errorMessage = formatApiError(error, context);

          // Display error in the modal
          setApiStatus("error");
          setErrors({
            ...errors,
            submission: errorMessage,
          });

          // Keep modal open on error
        });
    }
  };

  if (!showTimeSlotModal) return null;

  // Set current date as default for exceptions
  const today = new Date().toISOString().split("T")[0];

  // Display formatted times
  const startTimeFormatted = formatTo12Hour(newTimeSlot.start);
  const endTimeFormatted = formatTo12Hour(newTimeSlot.end);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader
          title={isEditMode ? "Edit Time Slot" : "Add New Time Slot"}
          onClose={() => setShowTimeSlotModal(false)}
        />

        {/* Info banner */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-400"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {isEditMode ? "Update Time Slot" : "Add Time Slot"}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {isEditMode
                    ? `Update the details of this time slot (${startTimeFormatted} - ${endTimeFormatted}).`
                    : "Add a new time slot to your schedule. You can add multiple slots per day."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Display any submission errors */}
        {errors.submission && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-red-400"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>{errors.submission}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <DaySelection
            selectedDay={newTimeSlot.day}
            onChange={(day) => setNewTimeSlot({ ...newTimeSlot, day })}
            disabled={isEditMode} // Can't change day when editing
          />

          <TimeSelection
            startTime={newTimeSlot.start}
            endTime={newTimeSlot.end}
            onStartTimeChange={(start) =>
              setNewTimeSlot({ ...newTimeSlot, start })
            }
            onEndTimeChange={(end) => setNewTimeSlot({ ...newTimeSlot, end })}
            errors={errors}
          />

          {/* Add capacity input */}
          <div>
            <label className="block text-gray-700 mb-2">
              Patient Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={newTimeSlot.capacity || ""}
              onChange={(e) =>
                setNewTimeSlot({
                  ...newTimeSlot,
                  capacity: parseInt(e.target.value) || "",
                })
              }
              className={`w-full px-4 py-2 border ${
                errors.capacity ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-emerald-500`}
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
            )}
          </div>

          {/* Status selection */}
          <div>
            <label className="block text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={newTimeSlot.status || "ACTIVE"}
              onChange={(e) =>
                setNewTimeSlot({
                  ...newTimeSlot,
                  status: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <RecurringOption
            isRecurring={newTimeSlot.isRecurring}
            onChange={(isRecurring) => {
              setNewTimeSlot({
                ...newTimeSlot,
                isRecurring,
                // Silently set date fields in the background if not recurring
                ...(isRecurring
                  ? {}
                  : {
                      startDate: today,
                      endDate: new Date(
                        new Date().setDate(new Date().getDate() + 30)
                      )
                        .toISOString()
                        .split("T")[0],
                    }),
              });
            }}
          />

          {/* Add exceptions section always visible when not recurring */}
          {!newTimeSlot.isRecurring && (
            <ExceptionsSection
              exceptions={exceptions}
              onAddException={handleAddException}
              onRemoveException={handleRemoveException}
            />
          )}
        </div>

        <ModalActions
          onCancel={() => setShowTimeSlotModal(false)}
          onSubmit={handleSubmit}
          submitText={
            apiStatus === "error"
              ? "Try Again"
              : isEditMode
              ? "Update Time Slot"
              : "Add Time Slot"
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

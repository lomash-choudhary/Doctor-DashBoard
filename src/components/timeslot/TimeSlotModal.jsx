import React, { useState } from "react";
import ModalHeader from "../common/ModalHeader";
import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import RecurringOption from "./RecurringOption";
import DateRangeSelection from "./DateRangeSelection";
import ModalActions from "./ModalActions";
import ExceptionsSection from "./ExceptionsSection";

export default function TimeSlotModal({
  showTimeSlotModal,
  setShowTimeSlotModal,
  newTimeSlot,
  setNewTimeSlot,
  onSubmit,
  isLoading,
}) {
  const [errors, setErrors] = useState({});
  const [manualEndpoint, setManualEndpoint] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [exceptions, setExceptions] = useState([]);

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
      if (!newTimeSlot.startDate) {
        newErrors.startDate = "Start date is required";
      }

      if (!newTimeSlot.endDate) {
        newErrors.endDate = "End date is required";
      } else if (
        newTimeSlot.startDate &&
        newTimeSlot.endDate &&
        new Date(newTimeSlot.startDate) > new Date(newTimeSlot.endDate)
      ) {
        newErrors.endDate = "End date must be after start date";
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

  // Handle submission - updated to include exceptions
  const handleSubmit = () => {
    if (validateTimeSlot()) {
      // Show the data that's being sent to the backend - helpful for debugging
      console.log("Sending time slot data:", {
        ...newTimeSlot,
        exceptions,
      });

      // Display the data format in a more visible way
      const dataStr = JSON.stringify({ ...newTimeSlot, exceptions }, null, 2);
      console.log("Data structure:", dataStr);

      // Set API status to show endpoint info is being gathered
      setApiStatus("pending");

      // If manual endpoint is provided, use it
      const endpoint = manualEndpoint.trim() || null;

      // Pass the data with exceptions to parent component
      onSubmit({ ...newTimeSlot, exceptions }, endpoint)
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
          setManualEndpoint("");
        })
        .catch((error) => {
          console.error("Time slot submission error:", error);
          setApiStatus("error");
          // Keep modal open on error
        });
    }
  };

  if (!showTimeSlotModal) return null;

  // Set current date as default for date fields if they're empty
  const today = new Date().toISOString().split("T")[0];

  // For startDate, use existing value or today
  const startDateValue = newTimeSlot.startDate || today;

  // For endDate, use existing value or 7 days from today
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  const endDateValue =
    newTimeSlot.endDate || defaultEndDate.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader
          title="Add New Time Slot"
          onClose={() => setShowTimeSlotModal(false)}
        />

        {/* Update this info banner */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-400"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Schedule Update
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Adding a time slot will update your doctor profile with the
                  new availability. Make sure all details are correct before
                  submitting.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DaySelection
            selectedDay={newTimeSlot.day}
            onChange={(day) => setNewTimeSlot({ ...newTimeSlot, day })}
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

          <RecurringOption
            isRecurring={newTimeSlot.isRecurring}
            onChange={(isRecurring) => {
              setNewTimeSlot({
                ...newTimeSlot,
                isRecurring,
                // Initialize dates when switching to non-recurring
                ...(isRecurring
                  ? {}
                  : {
                      startDate: startDateValue,
                      endDate: endDateValue,
                    }),
              });
            }}
          />

          {!newTimeSlot.isRecurring && (
            <DateRangeSelection
              startDate={startDateValue}
              endDate={endDateValue}
              onStartDateChange={(startDate) =>
                setNewTimeSlot({ ...newTimeSlot, startDate })
              }
              onEndDateChange={(endDate) =>
                setNewTimeSlot({ ...newTimeSlot, endDate })
              }
              errors={errors}
            />
          )}

          {/* Add exceptions section */}
          {!newTimeSlot.isRecurring && (
            <ExceptionsSection 
              exceptions={exceptions}
              onAddException={handleAddException}
              onRemoveException={handleRemoveException}
            />
          )}

          {/* Developer settings - always visible now */}
          <div className="mt-4 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-gray-500 flex items-center"
            >
              <i
                className={`fas fa-chevron-${
                  showAdvanced ? "up" : "down"
                } mr-1`}
              ></i>
              Advanced Settings (Developer)
            </button>

            {showAdvanced && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <div className="text-xs text-gray-700 mb-2 font-medium">
                  Manual Endpoint Configuration:
                </div>
                <input
                  type="text"
                  value={manualEndpoint}
                  onChange={(e) => setManualEndpoint(e.target.value)}
                  placeholder="/doctor/updateTimeSlot"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                  <p>
                    This will be added after {window.location.origin}/api/v1
                  </p>
                  <p className="italic text-amber-600">
                    Check API Documentation for supported endpoints.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <ModalActions
          onCancel={() => setShowTimeSlotModal(false)}
          onSubmit={handleSubmit}
          submitText={apiStatus === "error" ? "Try Again" : "Update Schedule"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

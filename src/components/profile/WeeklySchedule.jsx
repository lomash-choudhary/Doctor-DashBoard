import React, { useState } from "react";
import TimeSlotDetailsModal from "../timeslot/TimeSlotDetailsModal";
import { formatTo12Hour } from "@/utils/timeFormatter";

export default function WeeklySchedule({
  availability,
  setShowTimeSlotModal,
  setSelectedSlot,
}) {
  const [detailSlot, setDetailSlot] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Check if there's any schedule data
  const hasSchedule = Object.values(availability || {}).some(
    (slots) => Array.isArray(slots) && slots.length > 0
  );

  // Days of the week with corresponding icons
  const daysWithIcons = [
    { day: "Monday", icon: "calendar-day" },
    { day: "Tuesday", icon: "calendar-day" },
    { day: "Wednesday", icon: "calendar-day" },
    { day: "Thursday", icon: "calendar-day" },
    { day: "Friday", icon: "calendar-day" },
    { day: "Saturday", icon: "calendar-week" },
    { day: "Sunday", icon: "calendar-week" },
  ];

  // Handle click on a time slot to view details
  const handleViewDetails = (day, slot) => {
    const slotWithContext = {
      ...slot,
      day,
    };
    setDetailSlot(slotWithContext);
    setShowDetailsModal(true);
  };

  // Handle edit button click - prepare slot data for editing
  const handleEditSlot = (day, slot) => {
    // Create slot data for editing
    const slotForEdit = {
      day: day,
      start: slot.start,
      end: slot.end,
      capacity: slot.capacity || 1,
      isRecurring: true, // Weekly schedule slots are always recurring
      status: slot.isAvailable ? "ACTIVE" : "INACTIVE",
      exceptions: slot.exceptions || [],
      isEditMode: true,
      originalStart: slot.start, // Track original start time for updating
    };

    // Set selected slot and open modal
    setSelectedSlot(slotForEdit);
    setShowTimeSlotModal(true);
  };

  // Handle add time slot for a specific day
  const handleAddSlot = (day) => {
    // Reset selected slot with the day pre-selected
    setSelectedSlot({
      day: day,
      start: "09:00",
      end: "17:00",
      isRecurring: true,
      capacity: 1,
      status: "ACTIVE",
      isEditMode: false,
    });
    setShowTimeSlotModal(true);
  };

  // Check if a slot has exceptions
  const hasExceptions = (slot) => {
    return slot.exceptions && slot.exceptions.length > 0;
  };

  // Enhance each slot with formatted time
  const enhancedAvailability = {};
  for (const [day, slots] of Object.entries(availability || {})) {
    enhancedAvailability[day] = Array.isArray(slots)
      ? slots.map((slot) => ({
          ...slot,
          startFormatted: formatTo12Hour(slot.start),
          endFormatted: formatTo12Hour(slot.end),
        }))
      : [];
  }

  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-calendar-alt text-emerald-500 mr-2"></i>
        Weekly Schedule
      </h3>

      {hasSchedule ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
          {daysWithIcons.map(({ day, icon }) => (
            <div key={day} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      (availability[day]?.length || 0) > 0
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <i className={`fas fa-${icon}`}></i>
                  </div>
                  <h4 className="font-medium text-gray-800">{day}</h4>
                </div>

                {/* Add time slot button for this day */}
                <button
                  onClick={() => handleAddSlot(day)}
                  className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full hover:bg-emerald-100 flex items-center"
                >
                  <i className="fas fa-plus mr-1"></i> Add Slot
                </button>
              </div>

              {enhancedAvailability[day] &&
              enhancedAvailability[day].length > 0 ? (
                <div className="ml-12 space-y-2">
                  {enhancedAvailability[day].map((slot, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm ${
                        slot.isAvailable
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      } ${
                        hasExceptions(slot) ? "border-red-300 bg-red-50" : ""
                      }`}
                    >
                      <div
                        className="flex items-center flex-grow cursor-pointer"
                        onClick={() => handleViewDetails(day, slot)}
                      >
                        <i
                          className={`fas fa-${
                            slot.isAvailable ? "clock" : "times-circle"
                          } mr-1`}
                        ></i>
                        <span>
                          {slot.startFormatted} - {slot.endFormatted}
                        </span>

                        {slot.capacity && (
                          <span className="ml-2 text-xs bg-white bg-opacity-60 px-1 py-0.5 rounded">
                            {slot.capacity} patients
                          </span>
                        )}

                        {/* Display exception marker if present */}
                        {hasExceptions(slot) && (
                          <span className="ml-2 text-xs text-red-600">
                            <i className="fas fa-exclamation-circle"></i>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Edit button */}
                        <button
                          onClick={() => handleEditSlot(day, slot)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit time slot"
                        >
                          <i className="fas fa-edit"></i>
                        </button>

                        {/* Info/Details button */}
                        <button
                          onClick={() => handleViewDetails(day, slot)}
                          className="text-gray-500 hover:text-gray-700"
                          title="View details"
                        >
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-12 text-gray-500 text-sm italic">
                  No slots scheduled
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-300">
          <div className="text-gray-400 mb-2">
            <i className="fas fa-calendar-times text-5xl"></i>
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            No Schedule Available
          </h4>
          <p className="text-gray-500 mb-4">
            You haven't set up your weekly schedule yet.
          </p>
          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center"
            onClick={() => {
              setSelectedSlot(null);
              setShowTimeSlotModal(true);
            }}
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Time Slots
          </button>
        </div>
      )}

      {/* Time Slot Details Modal */}
      <TimeSlotDetailsModal
        slot={detailSlot}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        onEdit={() => {
          setShowDetailsModal(false);
          if (detailSlot) handleEditSlot(detailSlot.day, detailSlot);
        }}
        onDelete={() => {
          setShowDetailsModal(false);
          // Delete functionality would be added here if needed
          alert("Delete functionality is only available on the Schedule page");
        }}
      />
    </div>
  );
}

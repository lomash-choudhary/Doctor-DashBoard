import React from "react";
import ModalHeader from "../login/ModalHeader";
import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import RecurringOption from "./RecurringOption";
import DateRangeSelection from "./DateRangeSelection";
import ModalActions from "./ModalActions";

export default function TimeSlotModal({ 
  showTimeSlotModal, 
  setShowTimeSlotModal, 
  newTimeSlot, 
  setNewTimeSlot 
}) {
  if (!showTimeSlotModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <ModalHeader 
          title="Add New Time Slot"
          onClose={() => setShowTimeSlotModal(false)}
        />
        
        <div className="space-y-4">
          <DaySelection 
            selectedDay={newTimeSlot.day} 
            onChange={(day) => setNewTimeSlot({ ...newTimeSlot, day })}
          />
          
          <TimeSelection 
            startTime={newTimeSlot.start}
            endTime={newTimeSlot.end}
            onStartTimeChange={(start) => setNewTimeSlot({ ...newTimeSlot, start })}
            onEndTimeChange={(end) => setNewTimeSlot({ ...newTimeSlot, end })}
          />
          
          <RecurringOption
            isRecurring={newTimeSlot.isRecurring}
            onChange={(isRecurring) => setNewTimeSlot({ ...newTimeSlot, isRecurring })}
          />
          
          {!newTimeSlot.isRecurring && (
            <DateRangeSelection
              startDate={newTimeSlot.startDate}
              endDate={newTimeSlot.endDate}
              onStartDateChange={(startDate) => setNewTimeSlot({ ...newTimeSlot, startDate })}
              onEndDateChange={(endDate) => setNewTimeSlot({ ...newTimeSlot, endDate })}
            />
          )}
        </div>
        
        <ModalActions
          onCancel={() => setShowTimeSlotModal(false)}
          onSubmit={() => {
            // Handle adding new time slot
            setShowTimeSlotModal(false);
          }}
        />
      </div>
    </div>
  );
}
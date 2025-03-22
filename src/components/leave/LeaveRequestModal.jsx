import React from "react";
import ModalHeader from "../common/ModalHeader";
import DateRangeInputs from "./DateRangeInputs";
import ReasonTextArea from "./ReasonTextArea";
import ModalActions from "./ModalActions";

export default function LeaveRequestModal({
  showLeaveModal,
  setShowLeaveModal,
  newLeave,
  setNewLeave,
}) {
  if (!showLeaveModal) return null;

  const handleSubmitLeave = () => {
    // Handle submitting leave request
    setShowLeaveModal(false);
    // You could add success notification here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <ModalHeader
          title="Request Leave"
          onClose={() => setShowLeaveModal(false)}
        />

        <div className="space-y-4">
          <DateRangeInputs
            startDate={newLeave.startDate}
            endDate={newLeave.endDate}
            onChange={(field, value) =>
              setNewLeave({ ...newLeave, [field]: value })
            }
          />

          <ReasonTextArea
            reason={newLeave.reason}
            onChange={(reason) => setNewLeave({ ...newLeave, reason })}
          />
        </div>

        <ModalActions
          onCancel={() => setShowLeaveModal(false)}
          onSubmit={handleSubmitLeave}
          submitText="Submit Request"
        />
      </div>
    </div>
  );
}

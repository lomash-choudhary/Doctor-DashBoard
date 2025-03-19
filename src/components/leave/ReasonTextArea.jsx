import React from "react";

export default function ReasonTextArea({ reason, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">Reason</label>
      <textarea
        value={reason}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none"
        placeholder="Please provide a reason for your leave request..."
      ></textarea>
    </div>
  );
}
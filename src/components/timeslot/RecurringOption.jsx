import React from "react";

export default function RecurringOption({ isRecurring, onChange }) {
  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => onChange(e.target.checked)}
          className="form-checkbox h-5 w-5 text-emerald-600"
        />
        <span className="text-gray-700">Recurring Weekly</span>
      </label>
    </div>
  );
}
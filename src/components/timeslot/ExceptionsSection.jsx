import React, { useState } from "react";

export default function ExceptionsSection({
  exceptions,
  onAddException,
  onRemoveException,
}) {
  const [newException, setNewException] = useState({
    expectedDateOfException: "",
    status: "DAY_OFF",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddException = () => {
    if (!newException.expectedDateOfException) {
      // Simple validation
      alert("Please select an exception date");
      return;
    }

    onAddException({ ...newException });
    setNewException({ expectedDateOfException: "", status: "DAY_OFF" });
    setShowAddForm(false);
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-700 font-medium">Exceptions</h3>
        {!showAddForm && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
          >
            <i className="fas fa-plus mr-1"></i> Add Exception
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-3 rounded-md mb-3">
          <div className="flex flex-col md:flex-row md:items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">
                Exception Date
              </label>
              <input
                type="date"
                value={newException.expectedDateOfException}
                onChange={(e) =>
                  setNewException({
                    ...newException,
                    expectedDateOfException: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select
                value={newException.status}
                onChange={(e) =>
                  setNewException({
                    ...newException,
                    status: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="DAY_OFF">Day Off</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="LEAVE">Leave</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddException}
                className="px-3 py-2 bg-emerald-500 text-white rounded"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {exceptions.length > 0 ? (
        <div className="space-y-2 mt-2">
          {exceptions.map((exception, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center">
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full mr-2">
                  {exception.status === "DAY_OFF"
                    ? "Day Off"
                    : exception.status === "HOLIDAY"
                    ? "Holiday"
                    : "Leave"}
                </span>
                <span className="text-sm text-gray-700">
                  {new Date(
                    exception.expectedDateOfException
                  ).toLocaleDateString()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveException(index)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-1">
          No exceptions added. Exceptions let you mark specific days when this
          time slot won't be available.
        </p>
      )}
    </div>
  );
}

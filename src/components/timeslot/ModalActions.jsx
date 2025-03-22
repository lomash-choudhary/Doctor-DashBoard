import React from "react";

export default function ModalActions({
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Save",
  isLoading = false,
}) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-70"
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
}

import React from "react";

export default function FormNavigation({
  currentStep,
  isSubmitting,
  handleNextStep,
  handlePrevStep,
  totalSteps,
}) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium flex items-center shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <i className="fas fa-arrow-left mr-2"></i> Previous
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={handleNextStep}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium flex items-center ml-auto shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Next <i className="fas fa-arrow-right ml-2"></i>
        </button>
      ) : null}
    </div>
  );
}

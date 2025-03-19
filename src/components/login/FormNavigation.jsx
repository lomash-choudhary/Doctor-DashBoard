import React from "react";

export default function FormNavigation({ currentStep, setCurrentStep, isSubmitting }) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-arrow-left mr-2"></i> Previous
        </button>
      )}
      {currentStep < 3 ? (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 ml-auto !rounded-button whitespace-nowrap"
        >
          Next <i className="fas fa-arrow-right ml-2"></i>
        </button>
      ) : (
        <button
          type="submit"
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 ml-auto !rounded-button whitespace-nowrap"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Creating Account...
            </>
          ) : (
            <>
              Complete Registration <i className="fas fa-check ml-2"></i>
            </>
          )}
        </button>
      )}
    </div>
  );
}
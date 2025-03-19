import React from "react";

export default function ProgressSteps({ currentStep }) {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Professional" },
    { number: 3, label: "Schedule" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="w-full absolute top-1/2 transform -translate-y-1/2">
          <div className="h-1 bg-gray-200">
            <div
              className="h-1 bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
        {steps.map((step) => (
          <div key={step.number} className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                currentStep >= step.number
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
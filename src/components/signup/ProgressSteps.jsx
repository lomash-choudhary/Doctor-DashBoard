import React from "react";

export default function ProgressSteps({ currentStep }) {
  const steps = [
    { number: 1, label: "Basic Info", icon: "fa-user" },
    { number: 2, label: "Professional", icon: "fa-stethoscope" },
    { number: 3, label: "Schedule", icon: "fa-calendar-alt" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="w-full absolute top-1/2 transform -translate-y-1/2">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center z-10"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                currentStep >= step.number
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-400 border border-gray-200"
              }`}
            >
              <i className={`fas ${step.icon}`}></i>
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap">
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number
                    ? "text-emerald-600"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6"></div>
    </div>
  );
}

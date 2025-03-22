import React from "react";

export default function ProfessionalInfoForm({ register, errors }) {
  const specializations = [
    { value: "cardiology", label: "Cardiology" },
    { value: "dermatology", label: "Dermatology" },
    { value: "neurology", label: "Neurology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "psychiatry", label: "Psychiatry" },
    { value: "oncology", label: "Oncology" },
    { value: "endocrinology", label: "Endocrinology" },
  ];

  const durations = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "60 minutes" },
  ];

  // Prevent form submission on enter
  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={preventEnterSubmit}>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h3 className="text-blue-800 font-medium flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          Professional Information
        </h3>
        <p className="text-blue-700 text-sm mt-1">
          This information will be used to verify your credentials and will be
          visible to patients.
        </p>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Specialization <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-stethoscope"></i>
          </div>
          <select
            className={`w-full pl-10 pr-4 py-2 border ${
              errors.specialization ? "border-red-500" : "border-gray-200"
            } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 bg-white transition-colors appearance-none`}
            {...register("specialization")}
          >
            <option value="">Select your specialization</option>
            {specializations.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.specialization.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          License Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-id-card"></i>
          </div>
          <input
            type="text"
            className={`w-full pl-10 pr-4 py-2 border ${
              errors.licenseNumber ? "border-red-500" : "border-gray-200"
            } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
            placeholder="Format: MH/12345/2023"
            {...register("licenseNumber")}
          />
        </div>
        {errors.licenseNumber && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.licenseNumber.message}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          <i className="fas fa-info-circle mr-1"></i>
          Enter your medical license number in the format STATE/NUMBER/YEAR
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-history"></i>
            </div>
            <input
              type="number"
              min="0"
              className={`w-full pl-10 pr-4 py-2 border ${
                errors.yearsOfExperience ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="5"
              {...register("yearsOfExperience")}
            />
          </div>
          {errors.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.yearsOfExperience.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Consultation Fee (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <input
              type="number"
              min="0"
              className={`w-full pl-10 pr-4 py-2 border ${
                errors.consultationFee ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="1000"
              {...register("consultationFee")}
            />
          </div>
          {errors.consultationFee && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.consultationFee.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Consultation Duration <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-clock"></i>
          </div>
          <select
            className={`w-full pl-10 pr-4 py-2 border ${
              errors.averageConsultationTime
                ? "border-red-500"
                : "border-gray-200"
            } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 bg-white transition-colors appearance-none`}
            {...register("averageConsultationTime")}
          >
            <option value="">Select duration</option>
            {durations.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        {errors.averageConsultationTime && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.averageConsultationTime.message}
          </p>
        )}
      </div>
    </div>
  );
}

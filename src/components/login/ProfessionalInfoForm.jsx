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

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Specialization</label>
        <select
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
          {...register("specialization")}
        >
          <option value="">Select your specialization</option>
          {specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600">
            {errors.specialization.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="5"
            {...register("experience")}
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {errors.experience.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Consultation Fee (₹)</label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="1000"
            {...register("consultationFee")}
          />
          {errors.consultationFee && (
            <p className="mt-1 text-sm text-red-600">
              {errors.consultationFee.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Consultation Duration (minutes)
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
          {...register("consultationDuration")}
        >
          <option value="">Select duration</option>
          {durations.map((duration) => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
        {errors.consultationDuration && (
          <p className="mt-1 text-sm text-red-600">
            {errors.consultationDuration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">About</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 h-32"
          placeholder="Brief description about your medical practice and expertise..."
          {...register("about")}
        ></textarea>
        {errors.about && (
          <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
        )}
      </div>
    </div>
  );
}
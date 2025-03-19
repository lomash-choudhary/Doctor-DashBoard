import React from "react";

export default function ScheduleForm({
  register,
  errors,
  clinicFields,
  removeClinic,
  appendClinic,
  weekDays
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Clinic Locations</label>
        <div className="space-y-3">
          {clinicFields.map((field, index) => (
            <div key={field.id} className="flex items-start space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  {...register(`clinics.${index}.address`)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Enter clinic address"
                />
                {errors.clinics?.[index]?.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.clinics[index].address.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeClinic(index)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendClinic({ address: "" })}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            <i className="fas fa-plus mr-1"></i> Add Another Clinic
          </button>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Weekly Schedule</label>
        <div className="space-y-4">
          {Object.keys(weekDays).map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-24">
                <span className="text-gray-700">{day}</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="time"
                    {...register(`schedule.${day}.start`)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    {...register(`schedule.${day}.end`)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <input
                  type="number"
                  {...register(`schedule.${day}.capacity`)}
                  className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Capacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
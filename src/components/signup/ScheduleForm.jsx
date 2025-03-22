import React from "react";

export default function ScheduleForm({
  register,
  errors,
  clinicFields,
  removeClinic,
  appendClinic,
  weekDays,
  isSubmitting,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-6">
        <h3 className="text-emerald-800 font-medium flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          Final Steps
        </h3>
        <p className="text-emerald-700 text-sm mt-1">
          Add your clinic locations and schedule to complete your profile.
        </p>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Clinic Locations <span className="text-red-500">*</span>
        </label>
        <div className="space-y-4">
          {clinicFields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">
                  Location {index + 1}
                </h4>
                {clinicFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClinic(index)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center transition-colors"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <input
                    type="text"
                    {...register(`clinics.${index}.addressline1`)}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.clinics?.[index]?.addressline1
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
                    placeholder="Street Address"
                  />
                </div>
                {errors.clinics?.[index]?.addressline1 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.clinics[index].addressline1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Address Line 2 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-building"></i>
                  </div>
                  <input
                    type="text"
                    {...register(`clinics.${index}.addressLine2`)}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.clinics?.[index]?.addressLine2
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
                    placeholder="Area, Locality"
                  />
                </div>
                {errors.clinics?.[index]?.addressLine2 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.clinics[index].addressLine2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Address Line 3 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-city"></i>
                  </div>
                  <input
                    type="text"
                    {...register(`clinics.${index}.addressLine3`)}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.clinics?.[index]?.addressLine3
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
                    placeholder="City, State, Pincode"
                  />
                </div>
                {errors.clinics?.[index]?.addressLine3 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.clinics[index].addressLine3.message}
                  </p>
                )}
              </div>

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`isPrimary-${index}`}
                  {...register(`clinics.${index}.isPrimaryLocation`)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label
                  htmlFor={`isPrimary-${index}`}
                  className="ml-2 text-gray-600 text-sm"
                >
                  This is my primary location
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendClinic({
                addressline1: "",
                addressLine2: "",
                addressLine3: "",
                isPrimaryLocation: false,
              })
            }
            className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            <i className="fas fa-plus-circle mr-1 text-lg"></i> Add Another
            Clinic
          </button>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-gray-700 mb-3 font-medium flex items-center">
          <i className="fas fa-calendar-alt mr-2 text-emerald-600"></i>
          Weekly Schedule <span className="text-red-500 ml-1">*</span>
          <span className="ml-2 text-xs text-gray-500 font-normal">
            (Add at least one time slot)
          </span>
        </label>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 gap-2 bg-gray-50 p-3 text-xs text-gray-500 font-medium border-b border-gray-200">
            <div>Day</div>
            <div>Start Time</div>
            <div>End Time</div>
            <div>Capacity</div>
            <div>Status</div>
            <div>Recurring</div>
            <div></div>
          </div>

          <div className="divide-y divide-gray-200">
            {Object.keys(weekDays).map((day) => (
              <div
                key={day}
                className="p-3 grid grid-cols-7 gap-2 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-700">
                  {day.substring(0, 3)}
                </div>

                <div>
                  <input
                    type="time"
                    {...register(`schedule.${day}.start`)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="time"
                    {...register(`schedule.${day}.end`)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="number"
                    min="1"
                    {...register(`schedule.${day}.capacity`)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors"
                    placeholder="Patients"
                  />
                </div>

                <div>
                  <select
                    {...register(`schedule.${day}.status`)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors appearance-none bg-white"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="DAY_OFF">Day Off</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`recurring-${day}`}
                      {...register(`schedule.${day}.recurring`)}
                      defaultChecked={true}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label
                      htmlFor={`recurring-${day}`}
                      className="ml-2 text-sm"
                    >
                      Weekly
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-emerald-500 hover:text-emerald-700"
                    onClick={() => {
                      // Copy previous day's timings if available
                      const days = Object.keys(weekDays);
                      const currentIndex = days.indexOf(day);
                      if (currentIndex > 0) {
                        const prevDay = days[currentIndex - 1];
                        const prevValues = {
                          start: document.querySelector(
                            `input[name="schedule.${prevDay}.start"]`
                          ).value,
                          end: document.querySelector(
                            `input[name="schedule.${prevDay}.end"]`
                          ).value,
                          capacity: document.querySelector(
                            `input[name="schedule.${prevDay}.capacity"]`
                          ).value,
                        };

                        if (prevValues.start && prevValues.end) {
                          document.querySelector(
                            `input[name="schedule.${day}.start"]`
                          ).value = prevValues.start;
                          document.querySelector(
                            `input[name="schedule.${day}.end"]`
                          ).value = prevValues.end;
                          document.querySelector(
                            `input[name="schedule.${day}.capacity"]`
                          ).value = prevValues.capacity;
                        }
                      }
                    }}
                  >
                    <i
                      className="fas fa-copy"
                      title="Copy from previous day"
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {errors.timeSlots && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.timeSlots.message}
          </p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-emerald-50 p-4 rounded-lg mb-4 text-sm text-emerald-800 border border-emerald-100">
          <p className="flex items-center font-medium">
            <i className="fas fa-check-circle mr-2 text-emerald-600"></i>
            Ready to join our network? Complete your registration below.
          </p>
          <ul className="mt-2 space-y-1 ml-6 list-disc text-emerald-700">
            <li>Your profile will be reviewed by our team</li>
            <li>Ensure all information is accurate and up-to-date</li>
            <li>You'll receive login credentials after verification</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white text-lg font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-70 disabled:hover:bg-emerald-600 disabled:hover:shadow-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Creating
              Account...
            </>
          ) : (
            <>
              Complete Registration <i className="fas fa-user-md ml-2"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

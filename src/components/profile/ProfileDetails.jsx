import React from "react";

export default function ProfileDetails({ doctorProfile }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Professional Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-user-md text-emerald-500 mr-2"></i>
            Professional Information
          </h3>

          <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm border border-gray-100">
            <div>
              <div className="text-sm text-gray-500">Medical License</div>
              <div className="font-medium">
                {doctorProfile?.licenseNumber || "Not provided"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Experience</div>
              <div className="font-medium">
                {doctorProfile?.yearsOfExperience
                  ? `${doctorProfile.yearsOfExperience} years`
                  : "Not provided"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Specialization</div>
              <div className="font-medium capitalize">
                {doctorProfile?.specialization || "Not provided"}
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-clipboard-list text-emerald-500 mr-2"></i>
            Consultation Details
          </h3>

          <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm border border-gray-100">
            <div>
              <div className="text-sm text-gray-500">Consultation Fee</div>
              <div className="font-medium">
                ₹{doctorProfile?.consultationFee || "0"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Average Consultation Time
              </div>
              <div className="font-medium">
                {doctorProfile?.averageConsultationTime || "0"} minutes
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Total Appointments</div>
              <div className="font-medium">
                {doctorProfile?.appointmentsTrackOfDoctor?.length || 0}{" "}
                appointments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-map-marker-alt text-emerald-500 mr-2"></i>
          Practice Locations
        </h3>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {doctorProfile?.locationsOfDoctor &&
          doctorProfile.locationsOfDoctor.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {doctorProfile.locationsOfDoctor.map((location, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-500 rounded-full p-2 mr-3">
                      <i className="fas fa-clinic-medical"></i>
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">
                        {location.isPrimaryLocation && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded mr-2">
                            Primary
                          </span>
                        )}
                        Location {index + 1}
                      </div>
                      <div className="text-gray-600 mt-1">
                        {location.addressline1}
                        {location.addressLine2 && `, ${location.addressLine2}`}
                        {location.addressLine3 && `, ${location.addressLine3}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No practice locations added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

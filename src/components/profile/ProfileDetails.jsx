import React from "react";

export default function ProfileDetails({ doctorProfile }) {
  return (
    <>
      <div>
        <p className="text-gray-600">License Number</p>
        <p className="font-semibold text-gray-800">
          {doctorProfile.licenseNumber}
        </p>
      </div>
      <div>
        <p className="text-gray-600">Experience</p>
        <p className="font-semibold text-gray-800">
          {doctorProfile.experience} years
        </p>
      </div>
      <div>
        <p className="text-gray-600">Current Hospital</p>
        <p className="font-semibold text-gray-800">
          {doctorProfile.hospital || 
            (doctorProfile.hospitals && doctorProfile.hospitals.length > 0 
              ? doctorProfile.hospitals[0].name
              : "Not assigned")}
        </p>
      </div>
    </>
  );
}
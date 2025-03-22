import React from "react";

export default function ProfileHeader({
  doctorProfile,
  previewImage,
  handleProfilePictureChange,
  isUpdating,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="relative group mb-6 md:mb-0">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={
              previewImage ||
              doctorProfile?.doctorAvatarURL ||
              "/default-avatar.png"
            }
            alt={doctorProfile?.name || "Doctor"}
            className="w-full h-full object-cover"
          />
        </div>
        <label className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 text-white">
          <i className="fas fa-camera text-2xl mb-1"></i>
          <span className="text-xs font-medium">Change Photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
            disabled={isUpdating}
          />
        </label>
        {isUpdating && (
          <div className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <div className="md:ml-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800">
          {doctorProfile?.name || "Doctor"}
        </h2>
        <div className="text-emerald-600 font-medium text-lg mt-1 mb-2">
          {doctorProfile?.specialization || "Specialty"}
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
          <div className="flex items-center text-gray-600">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <span>{doctorProfile?.email || "Email"}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <i className="fas fa-id-card text-gray-400 mr-2"></i>
            <span>
              License: {doctorProfile?.licenseNumber || "Not provided"}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <i className="fas fa-money-bill-wave text-gray-400 mr-2"></i>
            <span>₹{doctorProfile?.consultationFee || "0"} / consultation</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center md:justify-start">
          <div className="flex items-center bg-emerald-50 px-3 py-1 rounded-full text-emerald-700">
            <i className="fas fa-star text-amber-500 mr-2"></i>
            <span className="font-medium">
              {doctorProfile?.ratingOfDoctor || "New"}
            </span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-sm text-gray-500">Doctor Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}

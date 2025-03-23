import React, { useState } from "react";
import ModalHeader from "../common/ModalHeader";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import WeeklySchedule from "./WeeklySchedule";
import ProfileActions from "./ProfileActions";
import { updateDoctorAvatar } from "@/services/api";

export default function DoctorProfileModal({
  showProfileModal,
  setShowProfileModal,
  doctorProfile,
  setShowTimeSlotModal,
  setSelectedSlot,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details"); // New state for tabs

  // Handler for profile picture change
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create preview for immediate feedback
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);

      // Create form data and append file
      const formData = new FormData();
      formData.append("doctorAvatar", file);

      setIsUpdating(true);

      // Call API to update profile picture
      const response = await updateDoctorAvatar(formData);

      if (response && response.data) {
        // Show success message
        showNotification("Profile picture updated successfully", "success");

        // Force reload to reflect changes
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      showNotification(
        error.message || "Failed to update profile picture",
        "error"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper function to show notifications
  const showNotification = (message, type = "success") => {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg z-50 shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white flex items-center`;

    const icon =
      type === "success"
        ? '<i class="fas fa-check-circle mr-2"></i>'
        : '<i class="fas fa-exclamation-circle mr-2"></i>';

    notificationDiv.innerHTML = `${icon} ${message}`;
    document.body.appendChild(notificationDiv);
    setTimeout(() => notificationDiv.remove(), 3000);
  };

  if (!showProfileModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        {/* Header with status badges and close button */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white flex justify-between items-center rounded-t-xl flex-shrink-0">
          <h2 className="text-2xl font-bold">Doctor Profile</h2>
          <button
            onClick={() => setShowProfileModal(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="p-6 overflow-y-auto flex-grow">
          <ProfileHeader
            doctorProfile={doctorProfile}
            previewImage={previewImage}
            handleProfilePictureChange={handleProfilePictureChange}
            isUpdating={isUpdating}
          />

          {/* Tabs navigation */}
          <div className="border-b border-gray-200 mt-6 mb-4 sticky top-0 bg-white z-10 pb-0">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                className={`py-3 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("details")}
              >
                <i className="fas fa-user-md mr-2"></i>
                Professional Details
              </button>
              <button
                className={`py-3 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "schedule"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("schedule")}
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Weekly Schedule
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="py-2">
            {activeTab === "details" ? (
              <ProfileDetails doctorProfile={doctorProfile} />
            ) : (
              <WeeklySchedule
                availability={
                  doctorProfile.timeSlots
                    ? doctorProfile.timeSlots.reduce((acc, day) => {
                        acc[day.dayName] = day.slots.map((slot) => ({
                          start: slot.startTime,
                          end: slot.endTime,
                          isAvailable: slot.status === "ACTIVE",
                          capacity: slot.maxPatientsInTheSlot,
                        }));
                        return acc;
                      }, {})
                    : {}
                }
                setShowTimeSlotModal={setShowTimeSlotModal}
                setSelectedSlot={setSelectedSlot}
              />
            )}
          </div>
        </div>

        {/* Actions - fixed at bottom */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4 border-t border-gray-200 rounded-b-xl flex-shrink-0">
          <button
            onClick={() => setShowProfileModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setSelectedSlot(null); // Reset selected slot for new entry
              setShowTimeSlotModal(true);
              setShowProfileModal(false);
            }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <i className="fas fa-clock mr-2"></i>
            Manage Time Slots
          </button>
        </div>
      </div>
    </div>
  );
}

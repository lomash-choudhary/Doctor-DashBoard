import React from "react";

export default function ProfileHeader({ doctorProfile }) {
  return (
    <div className="relative group">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={doctorProfile.image || doctorProfile.doctorAvatarURL}
            alt={doctorProfile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 transform group-hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <i className="fas fa-camera text-white text-xl mb-1"></i>
                <span className="text-white text-xs">
                  Change Photo
                </span>
              </div>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-800">
            {doctorProfile.name}
          </h4>
          <p className="text-gray-600">
            {doctorProfile.specialization}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Click photo to update
          </p>
        </div>
      </div>
    </div>
  );
}

function handleImageUpload(e) {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("error", "File size should not exceed 5MB");
      return;
    }
    
    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      showNotification("error", "Please upload a valid image file (JPG, PNG)");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Show loading state
        showNotification("loading", "Uploading...", '<i class="fas fa-spinner fa-spin mr-2"></i>');
        
        // Simulate upload delay
        setTimeout(() => {
          showNotification("success", "Profile picture updated successfully!", '<i class="fas fa-check-circle mr-2"></i>');
        }, 1500);
      }
    };
    reader.readAsDataURL(file);
  }
}

function showNotification(type, message, icon = '') {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification-message');
  existingNotifications.forEach(note => note.remove());
  
  // Create new notification
  const div = document.createElement("div");
  div.className = "fixed top-4 right-4 px-6 py-3 rounded-lg z-50 shadow-lg flex items-center notification-message";
  
  switch (type) {
    case "error":
      div.className += " bg-red-500 text-white";
      break;
    case "success":
      div.className += " bg-green-500 text-white";
      break;
    case "loading":
      div.className += " bg-blue-500 text-white";
      break;
    default:
      div.className += " bg-gray-500 text-white";
  }
  
  div.innerHTML = icon ? `${icon} ${message}` : message;
  document.body.appendChild(div);
  
  if (type !== "loading") {
    setTimeout(() => div.remove(), 3000);
  }
  
  return div;
}
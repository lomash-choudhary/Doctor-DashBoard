import React from "react";
import ModalHeader from "../login/ModalHeader";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import WeeklySchedule from "./WeeklySchedule";
import ProfileActions from "./ProfileActions";

export default function DoctorProfileModal({
  showProfileModal,
  setShowProfileModal,
  doctorProfile,
  setShowTimeSlotModal
}) {
  if (!showProfileModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <ModalHeader 
          title="Doctor Profile" 
          onClose={() => setShowProfileModal(false)} 
        />
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <ProfileHeader doctorProfile={doctorProfile} />
            <ProfileDetails doctorProfile={doctorProfile} />
          </div>
          <WeeklySchedule availability={doctorProfile.availability} />
        </div>
        
        <ProfileActions 
          setShowProfileModal={setShowProfileModal}
          setShowTimeSlotModal={setShowTimeSlotModal}
        />
      </div>
    </div>
  );
}
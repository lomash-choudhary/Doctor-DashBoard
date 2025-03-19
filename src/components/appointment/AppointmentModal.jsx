import React from "react";
import ModalHeader from "../login/ModalHeader";
import PatientInfo from "./PatientInfo";
import AppointmentInfo from "./AppointmentInfo";
import SymptomsInfo from "./SymptomsInfo";
import ActionButtons from "./ActionButtons";

export default function AppointmentModal({
  showAppointmentModal,
  setShowAppointmentModal,
  selectedAppointment
}) {
  if (!showAppointmentModal || !selectedAppointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <ModalHeader 
          title="Appointment Details" 
          onClose={() => setShowAppointmentModal(false)} 
        />
        
        <div className="space-y-4">
          <PatientInfo 
            patientImage={selectedAppointment.patientImage}
            patientName={selectedAppointment.patientName}
            appointmentType={selectedAppointment.type}
          />
          
          <AppointmentInfo 
            date={selectedAppointment.date}
            time={selectedAppointment.time}
          />
          
          <SymptomsInfo symptoms={selectedAppointment.symptoms} />
          
          <ActionButtons 
            onClose={() => setShowAppointmentModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
import React from "react";

export default function StatsCard({ doctorProfile }) {
  // Calculate total unique patients
  const getTotalPatients = () => {
    if (
      !doctorProfile?.appointmentsTrackOfDoctor ||
      !Array.isArray(doctorProfile.appointmentsTrackOfDoctor)
    ) {
      return 0;
    }

    // Extract unique patient IDs from appointments
    const uniquePatientIds = new Set(
      doctorProfile.appointmentsTrackOfDoctor.map((appt) => appt.patientId)
    );

    return uniquePatientIds.size;
  };

  // Calculate today's appointments
  const getTodayAppointments = () => {
    if (
      !doctorProfile?.appointmentsTrackOfDoctor ||
      !Array.isArray(doctorProfile.appointmentsTrackOfDoctor)
    ) {
      return 0;
    }

    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    return doctorProfile.appointmentsTrackOfDoctor.filter((appt) => {
      // Check if appointment date is today
      const appointmentDate = appt.appointmentDate
        ? new Date(appt.appointmentDate).toISOString().split("T")[0]
        : null;
      return appointmentDate === today;
    }).length;
  };

  // Get average consultation time from doctor profile
  const getAverageConsultationTime = () => {
    return doctorProfile?.averageConsultationTime || 0;
  };

  // Get doctor rating
  const getDoctorRating = () => {
    return doctorProfile?.ratingOfDoctor || 0;
  };

  const totalPatients = getTotalPatients();
  const todayAppointments = getTodayAppointments();
  const avgConsultationTime = getAverageConsultationTime();
  const doctorRating = getDoctorRating();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 bg-emerald-50 rounded-full">
          <i className="fas fa-user-injured text-emerald-500 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-500">Total Patients</h3>
          <p className="text-2xl font-semibold text-gray-800">
            {totalPatients}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 bg-blue-50 rounded-full">
          <i className="fas fa-calendar-check text-blue-500 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-500">
            Appointments Today
          </h3>
          <p className="text-2xl font-semibold text-gray-800">
            {todayAppointments}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 bg-purple-50 rounded-full">
          <i className="fas fa-clock text-purple-500 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-500">
            Average Consultation Time
          </h3>
          <p className="text-2xl font-semibold text-gray-800">
            {avgConsultationTime} min
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 bg-amber-50 rounded-full">
          <i className="fas fa-star text-amber-500 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-500">Your Rating</h3>
          <p className="text-2xl font-semibold text-gray-800">
            {doctorRating} <span className="text-amber-500 text-lg">★</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Charts({ doctorProfile }) {
  // Check if there are any appointments to show
  const hasAppointments =
    doctorProfile?.appointmentsTrackOfDoctor &&
    Array.isArray(doctorProfile.appointmentsTrackOfDoctor) &&
    doctorProfile.appointmentsTrackOfDoctor.length > 0;

  // Group appointments by type for the pie chart
  const getAppointmentTypeDistribution = () => {
    if (!hasAppointments) return null;

    const typeCount = {};
    doctorProfile.appointmentsTrackOfDoctor.forEach((appointment) => {
      const type = appointment.appointmentType || "Regular Checkup";
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    // Convert to format needed for chart
    return Object.entries(typeCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Get weekly patient statistics
  const getWeeklyPatientStats = () => {
    if (!hasAppointments) return null;

    // Get the last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    });

    // Initialize counters
    const newPatients = Array(7).fill(0);
    const followUps = Array(7).fill(0);

    // Count appointments for each day
    doctorProfile.appointmentsTrackOfDoctor.forEach((appointment) => {
      const appointmentDate = appointment.appointmentDate
        ? new Date(appointment.appointmentDate).toISOString().split("T")[0]
        : null;

      const dayIndex = days.indexOf(appointmentDate);
      if (dayIndex !== -1) {
        if (appointment.isNewPatient) {
          newPatients[dayIndex]++;
        } else {
          followUps[dayIndex]++;
        }
      }
    });

    return { days, newPatients, followUps };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Patient Statistics
        </h3>

        {hasAppointments ? (
          <div id="patientStatsChart" className="h-64"></div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-center">
              <i className="fas fa-chart-line mb-3 text-3xl opacity-30"></i>
              <p>No patient statistics available yet</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Appointment Distribution
        </h3>

        {hasAppointments ? (
          <div id="appointmentChart" className="h-64"></div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-center">
              <i className="fas fa-chart-pie mb-3 text-3xl opacity-30"></i>
              <p>No appointment data available yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

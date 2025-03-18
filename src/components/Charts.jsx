export default function Charts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Patient Statistics
        </h3>
        <div id="patientStatsChart" style={{ height: "300px" }}></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Appointment Distribution
        </h3>
        <div id="appointmentChart" style={{ height: "300px" }}></div>
      </div>
    </div>
  );
}

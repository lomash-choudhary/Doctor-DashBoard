export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <i className="fas fa-user-plus text-blue-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">Total Patients</h3>
            <p className="text-2xl font-semibold text-gray-800">1,482</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-lg">
            <i className="fas fa-calendar-check text-green-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">Appointments Today</h3>
            <p className="text-2xl font-semibold text-gray-800">8</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <i className="fas fa-clock text-yellow-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">Average Wait Time</h3>
            <p className="text-2xl font-semibold text-gray-800">12 min</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-lg">
            <i className="fas fa-star text-purple-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">Patient Rating</h3>
            <p className="text-2xl font-semibold text-gray-800">4.8</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SideBar({ setSelectedTab, selectedTab }) {
  return (
    <div className="w-64 bg-white shadow-md h-[calc(100vh-4rem)] fixed">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedTab("dashboard")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedTab === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-chart-line mr-3"></i>
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("schedule")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedTab === "schedule"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-clock mr-3"></i>
              Time Slots
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("hospitals")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedTab === "hospitals"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-hospital mr-3"></i>
              Hospitals
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("appointments")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedTab === "appointments"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-calendar-alt mr-3"></i>
              Appointments
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("patients")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedTab === "patients"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-users mr-3"></i>
              Patients
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

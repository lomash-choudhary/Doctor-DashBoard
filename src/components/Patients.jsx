export default function Patients({ patients }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
          </div>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap">
            <i className="fas fa-plus mr-2"></i>
            Add Patient
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center mb-4">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {patient.name}
                </h3>
                <p className="text-gray-600">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Visit</span>
                <span className="text-gray-800">
                  {patient.lastVisit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="text-gray-800">
                  {patient.condition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    patient.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : patient.status === "Recovered"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-emerald-600 hover:text-emerald-800">
                <i className="fas fa-file-medical text-lg"></i>
              </button>
              <button className="text-emerald-600 hover:text-emerald-800">
                <i className="fas fa-edit text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
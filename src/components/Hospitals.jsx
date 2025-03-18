export default function Hospitals({ doctorProfile }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Hospitals</h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current Hospitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctorProfile.hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {hospital.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {hospital.address}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Joined: {hospital.joinDate}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          hospital.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {hospital.status.charAt(0).toUpperCase() +
                          hospital.status.slice(1)}
                      </span>
                      <button
                        onClick={() => {
                          const confirmLeave = window.confirm(
                            "Are you sure you want to leave this hospital?"
                          );
                          if (confirmLeave) {
                            // Here you would typically make an API call to update the hospital status
                            const successMessage =
                              document.createElement("div");
                            successMessage.className =
                              "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50";
                            successMessage.textContent =
                              "Successfully left the hospital";
                            document.body.appendChild(successMessage);
                            setTimeout(
                              () => successMessage.remove(),
                              3000
                            );
                          }
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hospital Requests
          </h3>
          <div className="space-y-4">
            {doctorProfile.hospitalRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={request.hospitalImage}
                  alt={request.hospitalName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {request.hospitalName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {request.message}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Requested: {request.requestDate}
                    </span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-sm !rounded-button whitespace-nowrap">
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm !rounded-button whitespace-nowrap">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
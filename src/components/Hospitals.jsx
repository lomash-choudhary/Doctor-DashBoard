import {
  acceptHospitalRequest,
  cancelHospitalRequest,
  leaveHospital,
} from "@/services/api";
import { useState } from "react";

export default function Hospitals({ doctorProfile }) {
  const [loading, setLoading] = useState(false);

  // Accept hospital request
  const handleAcceptRequest = async (hospitalId) => {
    try {
      setLoading(true);
      await acceptHospitalRequest(hospitalId);

      // Show success notification
      showNotification("success", "Hospital request accepted successfully");

      // Reload the page to fetch updated data
      window.location.reload();
    } catch (error) {
      console.error("Error accepting hospital request:", error);
      showNotification(
        "error",
        error.message || "Failed to accept hospital request"
      );
    } finally {
      setLoading(false);
    }
  };

  // Decline hospital request
  const handleDeclineRequest = async (hospitalId) => {
    try {
      setLoading(true);
      await cancelHospitalRequest(hospitalId);

      // Show success notification
      showNotification("success", "Hospital request declined successfully");

      // Reload the page to fetch updated data
      window.location.reload();
    } catch (error) {
      console.error("Error declining hospital request:", error);
      showNotification(
        "error",
        error.message || "Failed to decline hospital request"
      );
    } finally {
      setLoading(false);
    }
  };

  // Leave hospital
  const handleLeaveHospital = async (hospitalId) => {
    try {
      const confirmLeave = window.confirm(
        "Are you sure you want to leave this hospital?"
      );

      if (!confirmLeave) return;

      setLoading(true);
      await leaveHospital(hospitalId);

      // Show success notification
      showNotification("success", "Successfully left the hospital");

      // Reload the page to fetch updated data
      window.location.reload();
    } catch (error) {
      console.error("Error leaving hospital:", error);
      showNotification("error", error.message || "Failed to leave hospital");
    } finally {
      setLoading(false);
    }
  };

  // Show notification helper
  const showNotification = (type, message) => {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg z-50 shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`;

    const icon =
      type === "success"
        ? '<i class="fas fa-check-circle mr-2"></i>'
        : '<i class="fas fa-exclamation-circle mr-2"></i>';

    notificationDiv.innerHTML = `${icon} ${message}`;
    document.body.appendChild(notificationDiv);
    setTimeout(() => notificationDiv.remove(), 3000);
  };

  // Filter hospital requests with "request pending" status
  const pendingRequests =
    doctorProfile?.hospitalJoined?.filter(
      (hospital) => hospital.status === "request pending"
    ) || [];

  // Filter active hospitals with "joined" status
  const activeHospitals =
    doctorProfile?.hospitalJoined?.filter(
      (hospital) => hospital.status === "joined"
    ) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Hospitals</h2>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Current Hospitals Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current Hospitals
          </h3>

          {activeHospitals.length === 0 ? (
            <p className="text-gray-500 italic">
              You are not currently associated with any hospitals.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeHospitals.map((hospital) => (
                <div
                  key={hospital.hospitalId}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={hospital.hospitalImage || "/hospital-placeholder.jpg"}
                    alt={hospital.hospitalName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {hospital.hospitalName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {hospital.hospitalAddress || "No address provided"}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Joined:{" "}
                        {new Date(hospital.whenJoined).toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                          Active
                        </span>
                        <button
                          onClick={() =>
                            handleLeaveHospital(hospital.hospitalId)
                          }
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          disabled={loading}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hospital Requests Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hospital Requests
          </h3>

          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 italic">
              You have no pending hospital requests.
            </p>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.hospitalId}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={request.hospitalImage || "/hospital-placeholder.jpg"}
                    alt={request.hospitalName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {request.hospitalName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.message ||
                        "You have received a request to join this hospital."}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Requested:{" "}
                        {new Date(request.whenRequested).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleAcceptRequest(request.hospitalId)
                          }
                          disabled={loading}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-sm !rounded-button whitespace-nowrap"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleDeclineRequest(request.hospitalId)
                          }
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm !rounded-button whitespace-nowrap"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

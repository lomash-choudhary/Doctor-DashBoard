"use client";
import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useForm, useFieldArray } from "react-hook-form";
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import StatsCard from "@/components/StatsCard";
import Charts from "@/components/Charts";
import { RecentActivity } from "@/components/RecentActivity";
import Schedule from "@/components/Schedule";
import Hospitals from "@/components/Hospitals";
import Appointments from "@/components/Appointments";
import Patients from "@/components/Patients";
import DoctorProfileModal from "@/components/profile/DoctorProfileModal";
import TimeSlotModal from "@/components/timeslot/TimeSlotModal";
import LeaveRequestModal from "@/components/leave/LeaveRequestModal";
import AppointmentModal from "@/components/appointment/AppointmentModal";
import { getDoctorInfo, logoutDoctor, addDoctorTimeSlot } from "@/services/api";
import { formatApiError } from "@/utils/errorHandler";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); // Add this state for editing time slots
  const [newTimeSlot, setNewTimeSlot] = useState({
    day: "Monday",
    start: "09:00",
    end: "17:00",
    isRecurring: true,
    startDate: "",
    endDate: "",
    capacity: 1,
  });
  const [newLeave, setNewLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Add states for doctor data
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  // Define weekDays object
  const weekDays = {
    Monday: { start: "", end: "", capacity: "" },
    Tuesday: { start: "", end: "", capacity: "" },
    Wednesday: { start: "", end: "", capacity: "" },
    Thursday: { start: "", end: "", capacity: "" },
    Friday: { start: "", end: "", capacity: "" },
    Saturday: { start: "", end: "", capacity: "" },
    Sunday: { start: "", end: "", capacity: "" },
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      licenseNumber: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      experience: "",
      consultationFee: "",
      consultationDuration: "",
      about: "",
      clinics: [{ address: "" }],
      schedule: weekDays,
    },
  });

  // Field array for clinic addresses
  const {
    fields: clinicFields,
    append: appendClinic,
    remove: removeClinic,
  } = useFieldArray({
    control,
    name: "clinics",
  });

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);

        // Get username from localStorage
        const username = localStorage.getItem("doctorUsername");

        if (!username) {
          console.error("No username found in localStorage");
          window.location.href = "/login";
          return;
        }
        console.log("Fetching data for username:", username);

        try {
          // Add delay to ensure cookies are properly set
          // This can help with race conditions between login and data fetching
          await new Promise((resolve) => setTimeout(resolve, 500));

          const response = await getDoctorInfo(username);

          console.log("Full API response:", response);

          // Check if response data exists and has the expected structure
          if (response && response.data) {
            setDoctorProfile(response.data);
            console.log("Successfully fetched doctor profile:", response.data);

            // Parse appointments from doctor data if they exist
            if (
              response.data.appointmentsTrackOfDoctor &&
              Array.isArray(response.data.appointmentsTrackOfDoctor)
            ) {
              setAppointments(
                response.data.appointmentsTrackOfDoctor.map((appointment) => ({
                  id:
                    appointment._id ||
                    `a-${Math.random().toString(36).substr(2, 9)}`,
                  patientName: appointment.patientName || "Unknown Patient",
                  patientImage:
                    appointment.patientImage ||
                    "https://via.placeholder.com/150",
                  date:
                    new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString() || "N/A",
                  time: appointment.appointmentTime || "N/A",
                  status: appointment.status?.toLowerCase() || "pending",
                  type: appointment.appointmentType || "Regular Checkup",
                  symptoms: appointment.symptoms || "Not specified",
                }))
              );
            }

            // If no real appointments exist, empty array is fine
            console.log("Appointments loaded:", appointments.length);
          } else {
            console.error("Invalid response structure:", response);
            throw new Error("Invalid response from server");
          }
        } catch (apiError) {
          console.error("API Error:", apiError);

          // If we get an authentication error, it might be that the cookie is not being sent correctly
          if (
            apiError.message.includes("Authentication failed") ||
            apiError.message.includes("Unauthorized") ||
            apiError.message.includes("Unauthroized")
          ) {
            localStorage.removeItem("doctorUsername");
            window.location.href = "/login";
            return;
          }

          // For other errors, try refreshing once
          if (!window.hasAttemptedRefresh) {
            window.hasAttemptedRefresh = true;
            console.log("Attempting page refresh to restore session...");
            window.location.reload();
            return;
          }

          throw apiError;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError(err.message || "Failed to fetch doctor data");
        setLoading(false);

        // If authentication error, redirect to login
        if (
          err.message.includes("Authentication failed") ||
          err.message.includes("No access token found") ||
          err.message.includes("Unauthorized") ||
          err.message.includes("Bad Request")
        ) {
          // Clear localStorage and redirect to login
          localStorage.removeItem("doctorUsername");
          window.location.href = "/login";
        }
      }
    };

    fetchDoctorData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const username = localStorage.getItem("doctorUsername");
      if (!username) {
        throw new Error("No username found");
      }

      await logoutDoctor(username);

      // Redirect to login page after successful logout
      window.location.href = "/login";

      // Show success notification
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML =
        '<i class="fas fa-check-circle mr-2"></i> Logout successful!';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
    } catch (error) {
      console.error("Logout error:", error);

      // Show error notification
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      errorDiv.innerHTML =
        '<i class="fas fa-exclamation-circle mr-2"></i> Failed to logout. Please try again.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }
  };

  // Initialize charts with real data
  useEffect(() => {
    // Skip if either element doesn't exist or we have no doctor data
    if (
      !document.getElementById("patientStatsChart") ||
      !document.getElementById("appointmentChart") ||
      !doctorProfile
    )
      return;

    // Get real data or use sensible defaults
    const hasAppointments =
      doctorProfile.appointmentsTrackOfDoctor &&
      Array.isArray(doctorProfile.appointmentsTrackOfDoctor) &&
      doctorProfile.appointmentsTrackOfDoctor.length > 0;

    // Initialize patient stats chart
    const patientStatsChart = echarts.init(
      document.getElementById("patientStatsChart")
    );

    let patientStatsData;

    if (hasAppointments) {
      // Get data from the past 7 days
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...

      // Initialize arrays with zeros
      const newPatients = Array(7).fill(0);
      const followUps = Array(7).fill(0);

      // Populate with real data
      doctorProfile.appointmentsTrackOfDoctor.forEach((appt) => {
        if (!appt.appointmentDate) return;

        const appointmentDate = new Date(appt.appointmentDate);
        const diffDays = Math.floor(
          (now - appointmentDate) / (24 * 60 * 60 * 1000)
        );

        // Only include appointments from the last 7 days
        if (diffDays >= 0 && diffDays < 7) {
          const index = (dayOfWeek - diffDays + 7) % 7; // Map to chart index

          if (appt.isNewPatient) {
            newPatients[index]++;
          } else {
            followUps[index]++;
          }
        }
      });

      patientStatsData = { days, newPatients, followUps };
    } else {
      // No data, use empty arrays
      patientStatsData = {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        newPatients: [0, 0, 0, 0, 0, 0, 0],
        followUps: [0, 0, 0, 0, 0, 0, 0],
      };
    }

    const patientStatsOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["New Patients", "Follow-ups"],
      },
      xAxis: {
        type: "category",
        data: patientStatsData.days,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "New Patients",
          type: "line",
          smooth: true,
          data: patientStatsData.newPatients,
          itemStyle: {
            color: "#11B981",
          },
        },
        {
          name: "Follow-ups",
          type: "line",
          smooth: true,
          data: patientStatsData.followUps,
          itemStyle: {
            color: "#11B981",
          },
        },
      ],
    };
    patientStatsChart.setOption(patientStatsOption);

    // Initialize appointment distribution chart
    const appointmentChart = echarts.init(
      document.getElementById("appointmentChart")
    );

    let appointmentDistribution;

    if (hasAppointments) {
      // Count appointment types
      const typeCount = {};
      doctorProfile.appointmentsTrackOfDoctor.forEach((appt) => {
        const type = appt.appointmentType || "Regular Checkup";
        typeCount[type] = (typeCount[type] || 0) + 1;
      });

      // Convert to chart format
      appointmentDistribution = Object.entries(typeCount).map(
        ([name, value], index) => ({
          value,
          name,
          itemStyle: {
            color:
              index === 0 ? "#11B981" : index === 1 ? "#0EA5E9" : "#F59E0B",
          },
        })
      );
    } else {
      // No data, use empty placeholder
      appointmentDistribution = [
        { value: 0, name: "No Data", itemStyle: { color: "#CBD5E1" } },
      ];
    }

    const appointmentOption = {
      animation: false,
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
      },
      series: [
        {
          name: "Appointment Types",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          data: appointmentDistribution,
        },
      ],
    };
    appointmentChart.setOption(appointmentOption);

    return () => {
      patientStatsChart.dispose();
      appointmentChart.dispose();
    };
  }, [doctorProfile, loading]); // Add doctorProfile as dependency

  // Function to add a new time slot
  const addTimeSlot = async (timeSlotData, isEditMode = false) => {
    try {
      setLoading(true);

      // Display a temporary message for the user to understand what's happening
      const infoDiv = document.createElement("div");
      infoDiv.className =
        "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      infoDiv.innerHTML = `<i class="fas fa-info-circle mr-2"></i> ${
        isEditMode ? "Updating" : "Adding"
      } time slot...`;
      document.body.appendChild(infoDiv);

      // Call the API to add or update the time slot
      let response;
      try {
        if (isEditMode) {
          response = await updateDoctorTimeSlot(timeSlotData);
        } else {
          response = await addDoctorTimeSlot(timeSlotData);
        }

        infoDiv.remove();

        // Handle successful response
        console.log(
          `Time slot ${isEditMode ? "update" : "add"} response:`,
          response
        );

        // Show success notification
        const successDiv = document.createElement("div");
        successDiv.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
        successDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Time slot ${
          isEditMode ? "updated" : "added"
        } successfully!`;
        document.body.appendChild(successDiv);

        // Refresh doctor data to show the new time slot
        const username = localStorage.getItem("doctorUsername");
        const updatedDataResponse = await getDoctorInfo(username);
        setDoctorProfile(updatedDataResponse.data);

        setTimeout(() => successDiv.remove(), 3000);
        return response;
      } catch (error) {
        infoDiv.remove();
        throw error; // Re-throw to be handled in the outer catch block
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "add"} time slot:`,
        error
      );

      // Remove modal info div if it exists
      const existingInfoDiv = document.querySelector(
        ".fixed.top-4.right-4.bg-blue-500"
      );
      if (existingInfoDiv) {
        existingInfoDiv.remove();
      }

      // Format the error message in a user-friendly way
      const context = isEditMode ? "updating time slot" : "adding time slot";
      const userMessage = formatApiError(error, context);

      // Show error notification with formatted message
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex flex-col";
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>${userMessage}</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);

      // Re-throw to let the modal handle the error state
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="ml-4 text-lg font-semibold text-gray-700">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar
        isAuthenticated={true} // Always authenticated since login is handled elsewhere
        doctorProfile={doctorProfile}
        setShowProfileModal={setShowProfileModal}
        onLogout={handleLogout}
      />
      <div className="flex">
        {/* Sidebar */}
        <SideBar setSelectedTab={setSelectedTab} selectedTab={setSelectedTab} />
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards - pass doctorProfile */}
              <StatsCard doctorProfile={doctorProfile} />

              {/* Charts - pass doctorProfile */}
              <Charts doctorProfile={doctorProfile} />

              {/* Recent Activity - use appointments from API */}
              <RecentActivity
                appointments={doctorProfile?.appointmentsTrackOfDoctor?.map(
                  (appt) => ({
                    id:
                      appt._id ||
                      `a-${Math.random().toString(36).substring(2, 9)}`,
                    patientName: appt.patientName || "Unknown Patient",
                    patientImage:
                      appt.patientImage || "https://via.placeholder.com/150",
                    date:
                      new Date(appt.appointmentDate).toLocaleDateString() ||
                      "N/A",
                    time: appt.appointmentTime || "N/A",
                    status: appt.status?.toLowerCase() || "pending",
                  })
                )}
              />
            </div>
          )}
          {selectedTab === "schedule" && (
            <Schedule
              doctorProfile={doctorProfile}
              setShowLeaveModal={setShowLeaveModal}
              setShowTimeSlotModal={setShowTimeSlotModal}
              setSelectedSlot={setSelectedSlot} // Pass the setter to Schedule
            />
          )}
          {selectedTab === "hospitals" && (
            <Hospitals doctorProfile={doctorProfile} />
          )}
          {selectedTab === "appointments" && (
            <Appointments
              appointments={appointments}
              setSelectedAppointment={setSelectedAppointment}
              setShowAppointmentModal={setShowAppointmentModal}
            />
          )}
          {selectedTab === "patients" && <Patients patients={patients} />}
        </div>
      </div>

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        doctorProfile={doctorProfile}
        setShowTimeSlotModal={setShowTimeSlotModal}
        setSelectedSlot={setSelectedSlot} // Pass the setter to the modal
      />

      {/* Time Slot Management Modal */}
      <TimeSlotModal
        showTimeSlotModal={showTimeSlotModal}
        setShowTimeSlotModal={setShowTimeSlotModal}
        newTimeSlot={newTimeSlot}
        setNewTimeSlot={setNewTimeSlot}
        onSubmit={addTimeSlot}
        isLoading={loading}
        selectedSlot={selectedSlot} // Now selectedSlot is defined
      />

      {/* Leave Request Modal */}
      <LeaveRequestModal
        showLeaveModal={showLeaveModal}
        setShowLeaveModal={setShowLeaveModal}
        newLeave={newLeave}
        setNewLeave={setNewLeave}
      />

      {/* Appointment Details Modal */}
      <AppointmentModal
        showAppointmentModal={showAppointmentModal}
        setShowAppointmentModal={setShowAppointmentModal}
        selectedAppointment={selectedAppointment}
      />
    </div>
  );
};

export default App;

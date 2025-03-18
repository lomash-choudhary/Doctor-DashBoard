"use client";
import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import StatsCard from "@/components/StatsCard";
import Charts from "@/components/Charts";
import { RecentActivity } from "@/components/RecentActivity";
import Schedule from "@/components/Schedule";
import Hospitals from "@/components/Hospitals";
import Appointments from "@/components/Appointments";
import Patients from "@/components/Patients";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({
    day: "Monday",
    start: "09:00",
    end: "17:00",
    isRecurring: true,
  });
  const [newLeave, setNewLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const doctorProfile = {
    id: "d1",
    name: "Dr. James Anderson",
    username: "dr.anderson",
    email: "james.anderson@medical.com",
    password: "hashedPassword123",
    doctorAvatarURL:
      "https://public.readdy.ai/ai/img_res/1cf9710de2e49c3b2641a4274637bc24.jpg",
    specialization: "Cardiologist",
    licenseNumber: "MD-2025-1234",
    experience: 15,
    hospitals: [
      {
        id: "h1",
        name: "Metropolitan Medical Center",
        image:
          "https://public.readdy.ai/ai/img_res/fa7ccca371f595557a558559c735b32c.jpg",
        address: "123 Medical Plaza, New York, NY 10001",
        joinDate: "2023-01-15",
        status: "active",
      },
      {
        id: "h2",
        name: "Central City Hospital",
        image:
          "https://public.readdy.ai/ai/img_res/4f103689c0bad8000177a0e76e749b17.jpg",
        address: "456 Health Avenue, New York, NY 10002",
        joinDate: "2024-03-01",
        status: "active",
      },
    ],
    hospitalRequests: [
      {
        id: "hr1",
        hospitalName: "St. Mary Medical Center",
        hospitalImage:
          "https://public.readdy.ai/ai/img_res/146ba27ae65524582753449b9adc3008.jpg",
        requestDate: "2025-02-18",
        status: "pending",
        message:
          "We would be honored to have you join our cardiology department. Your expertise would be a valuable addition to our team.",
      },
    ],
    leaves: [
      {
        startDate: "2025-03-15",
        endDate: "2025-03-20",
        reason: "Annual Medical Conference",
        status: "approved",
      },
    ],
    availability: {
      Monday: [
        { start: "09:00", end: "12:00", isAvailable: true, isRecurring: true },
        { start: "14:00", end: "17:00", isAvailable: true, isRecurring: true },
      ],
      Tuesday: [
        { start: "09:00", end: "12:00", isAvailable: true, isRecurring: true },
        { start: "14:00", end: "17:00", isAvailable: true, isRecurring: true },
      ],
      Wednesday: [
        { start: "09:00", end: "12:00", isAvailable: true, isRecurring: true },
        { start: "14:00", end: "17:00", isAvailable: true, isRecurring: true },
      ],
      Thursday: [
        { start: "09:00", end: "12:00", isAvailable: true, isRecurring: true },
        { start: "14:00", end: "17:00", isAvailable: true, isRecurring: true },
      ],
      Friday: [
        { start: "09:00", end: "12:00", isAvailable: true, isRecurring: true },
        { start: "14:00", end: "17:00", isAvailable: true, isRecurring: true },
      ],
    },
  };

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    doctorAvatarURL: "No Profile Picture",
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    consultationFee: "",
    averageConsultationTime: "",
    locationsOfDoctor: "",
    hospitalJoined: "",
  });

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML =
        '<i class="fas fa-check-circle mr-2"></i> Login successful!';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
    }
  };

  const handleSignup = () => {
    const requiredFields = [
      "name",
      "username",
      "email",
      "password",
      "specialization",
    ];
    const emptyFields = requiredFields.filter((field) => !signupForm[field]);

    if (emptyFields.length > 0) {
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
      errorDiv.textContent = "Please fill in all required fields";
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupForm.email)) {
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
      errorDiv.textContent = "Please enter a valid email address";
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    const username = signupForm.username.toLowerCase().trim();
    if (username !== signupForm.username) {
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
      errorDiv.textContent = "Username must be lowercase and without spaces";
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    setIsAuthenticated(true);
    setShowLoginModal(false);
    const successDiv = document.createElement("div");
    successDiv.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
    successDiv.innerHTML =
      '<i class="fas fa-check-circle mr-2"></i> Account created successfully!';
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  };

  const appointments = [
    {
      id: "a1",
      patientName: "Alexandra Thompson",
      patientImage:
        "https://public.readdy.ai/ai/img_res/ea10c4e03f577f9fdf1846ea2cdcc466.jpg",
      date: "2025-02-20",
      time: "09:30 AM",
      status: "upcoming",
      type: "Regular Checkup",
      symptoms: "Mild fever, headache",
    },
    // ... rest of appointments array
  ];

  const patients = [
    {
      id: "p1",
      name: "Christopher Wilson",
      image:
        "https://public.readdy.ai/ai/img_res/aa8d6225f9ca7e74880719ee6bc60fd0.jpg",
      age: 45,
      gender: "Male",
      lastVisit: "2025-02-15",
      condition: "Hypertension",
      status: "Under Treatment",
    },
    {
      id: "a2",
      patientName: "Richard Martinez",
      patientImage:
        "https://public.readdy.ai/ai/img_res/ea87d85054dd105f9cc308676135d8cf.jpg",
      date: "2025-02-20",
      time: "10:30 AM",
      status: "upcoming",
      type: "Follow-up",
      symptoms: "Post-surgery review",
    },
    {
      id: "a3",
      patientName: "Isabella Chen",
      patientImage:
        "https://public.readdy.ai/ai/img_res/6e886bdd66b5f68888f3794575dfce6a.jpg",
      date: "2025-02-20",
      time: "02:00 PM",
      status: "upcoming",
      type: "New Patient",
      symptoms: "Chronic back pain",
    },
  ];

  useEffect(() => {
    const patientStatsChart = echarts.init(
      document.getElementById("patientStatsChart")
    );
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "New Patients",
          type: "line",
          smooth: true,
          data: [5, 8, 6, 9, 7, 4, 3],
          itemStyle: {
            color: "#11B981",
          },
        },
        {
          name: "Follow-ups",
          type: "line",
          smooth: true,
          data: [8, 12, 10, 15, 11, 6, 5],
          itemStyle: {
            color: "#11B981",
          },
        },
      ],
    };
    patientStatsChart.setOption(patientStatsOption);

    const appointmentChart = echarts.init(
      document.getElementById("appointmentChart")
    );
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
          data: [
            {
              value: 45,
              name: "Regular Checkup",
              itemStyle: { color: "#11B981" },
            },
            { value: 30, name: "Follow-up", itemStyle: { color: "#11B981" } },
            { value: 25, name: "New Patient", itemStyle: { color: "#F59E0B" } },
          ],
        },
      ],
    };
    appointmentChart.setOption(appointmentOption);

    return () => {
      patientStatsChart.dispose();
      appointmentChart.dispose();
    };
  }, []);

  // ... rest of the component JSX

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... All JSX markup remains the same ... */}
      <NavBar
        isAuthenticated={isAuthenticated}
        doctorProfile={doctorProfile}
        setShowProfileModal={setShowProfileModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="flex">
        {/* Sidebar */}
        <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <StatsCard />
              {/* Charts */}
              <Charts />
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          )}
          {selectedTab === "schedule" && (
            <Schedule
              doctorProfile={doctorProfile}
              setShowLeaveModal={setShowLeaveModal}
              setShowTimeSlotModal={setShowTimeSlotModal}
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
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Doctor Portal
                </h3>
                <p className="text-gray-600 mt-1">
                  Complete your profile to join our medical network
                </p>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="w-full absolute top-1/2 transform -translate-y-1/2">
                  <div className="h-1 bg-gray-200">
                    <div
                      className="h-1 bg-emerald-500 transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {[1, 2, 3].map((step) => (
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        currentStep >= step
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-600">
                      {step === 1
                        ? "Basic Info"
                        : step === 2
                        ? "Professional"
                        : "Schedule"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <i className="fas fa-user-md text-4xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">
                              Upload Photo
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("profileImage")}
                        onChange={handleImageChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.querySelector('input[type="file"]')?.click()
                        }
                        className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600"
                      >
                        <i className="fas fa-camera"></i>
                      </button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                          placeholder="Dr. John Smith"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                          placeholder="doctor@example.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="dr.smith"
                        {...register("username")}
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="MD-12345"
                        {...register("licenseNumber")}
                      />
                      {errors.licenseNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.licenseNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                          placeholder="••••••••"
                          {...register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <i
                            className={`fas ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                          placeholder="••••••••"
                          {...register("confirmPassword")}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <i
                            className={`fas ${
                              showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Specialization
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                      {...register("specialization")}
                    >
                      <option value="">Select your specialization</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="neurology">Neurology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="psychiatry">Psychiatry</option>
                      <option value="oncology">Oncology</option>
                      <option value="endocrinology">Endocrinology</option>
                    </select>
                    {errors.specialization && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.specialization.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="5"
                        {...register("experience")}
                      />
                      {errors.experience && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Consultation Fee (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="1000"
                        {...register("consultationFee")}
                      />
                      {errors.consultationFee && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.consultationFee.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Consultation Duration (minutes)
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                      {...register("consultationDuration")}
                    >
                      <option value="">Select duration</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                    {errors.consultationDuration && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.consultationDuration.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">About</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 h-32"
                      placeholder="Brief description about your medical practice and expertise..."
                      {...register("about")}
                    ></textarea>
                    {errors.about && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.about.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Clinic Locations
                    </label>
                    <div className="space-y-3">
                      {clinicFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              {...register(`clinics.${index}.address`)}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                              placeholder="Enter clinic address"
                            />
                            {errors.clinics?.[index]?.address && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.clinics[index].address.message}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeClinic(index)}
                            className="mt-2 text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendClinic({ address: "" })}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        <i className="fas fa-plus mr-1"></i> Add Another Clinic
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Weekly Schedule
                    </label>
                    <div className="space-y-4">
                      {Object.keys(weekDays).map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                          <div className="w-24">
                            <span className="text-gray-700">{day}</span>
                          </div>
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <input
                                type="time"
                                {...register(`schedule.${day}.start`)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div>
                              <input
                                type="time"
                                {...register(`schedule.${day}.end`)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>
                          <div>
                            <input
                              type="number"
                              {...register(`schedule.${day}.capacity`)}
                              className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                              placeholder="Capacity"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 ml-auto !rounded-button whitespace-nowrap"
                  >
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 ml-auto !rounded-button whitespace-nowrap"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i> Creating
                        Account...
                      </>
                    ) : (
                      <>
                        Complete Registration{" "}
                        <i className="fas fa-check ml-2"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Doctor Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Doctor Profile
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={doctorProfile.image}
                        alt={doctorProfile.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <label
                          htmlFor="profile-image-upload"
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 transform group-hover:scale-105"
                        >
                          <div className="flex flex-col items-center">
                            <i className="fas fa-camera text-white text-xl mb-1"></i>
                            <span className="text-white text-xs">
                              Change Photo
                            </span>
                          </div>
                          <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                // Check file size (max 5MB)
                                if (file.size > 5 * 1024 * 1024) {
                                  const errorDiv =
                                    document.createElement("div");
                                  errorDiv.className =
                                    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
                                  errorDiv.textContent =
                                    "File size should not exceed 5MB";
                                  document.body.appendChild(errorDiv);
                                  setTimeout(() => errorDiv.remove(), 3000);
                                  return;
                                }
                                // Check file type
                                const validTypes = [
                                  "image/jpeg",
                                  "image/png",
                                  "image/jpg",
                                ];
                                if (!validTypes.includes(file.type)) {
                                  const errorDiv =
                                    document.createElement("div");
                                  errorDiv.className =
                                    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
                                  errorDiv.textContent =
                                    "Please upload a valid image file (JPG, PNG)";
                                  document.body.appendChild(errorDiv);
                                  setTimeout(() => errorDiv.remove(), 3000);
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    // Show loading state
                                    const loadingDiv =
                                      document.createElement("div");
                                    loadingDiv.className =
                                      "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
                                    loadingDiv.innerHTML =
                                      '<i class="fas fa-spinner fa-spin mr-2"></i> Uploading...';
                                    document.body.appendChild(loadingDiv);
                                    // Simulate upload delay
                                    setTimeout(() => {
                                      loadingDiv.remove();
                                      const successDiv =
                                        document.createElement("div");
                                      successDiv.className =
                                        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
                                      successDiv.innerHTML =
                                        '<i class="fas fa-check-circle mr-2"></i> Profile picture updated successfully!';
                                      document.body.appendChild(successDiv);
                                      setTimeout(
                                        () => successDiv.remove(),
                                        3000
                                      );
                                    }, 1500);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold text-gray-800">
                        {doctorProfile.name}
                      </h4>
                      <p className="text-gray-600">
                        {doctorProfile.specialization}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Click photo to update
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">License Number</p>
                  <p className="font-semibold text-gray-800">
                    {doctorProfile.licenseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Experience</p>
                  <p className="font-semibold text-gray-800">
                    {doctorProfile.experience} years
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Current Hospital</p>
                  <p className="font-semibold text-gray-800">
                    {doctorProfile.hospital}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Weekly Schedule
                </h4>
                <div className="space-y-3">
                  {Object.entries(doctorProfile.availability).map(
                    ([day, slots]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600">{day}</span>
                        <div className="flex space-x-2">
                          {slots.map((slot, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-sm ${
                                slot.isAvailable
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {slot.start} - {slot.end}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setShowTimeSlotModal(true);
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Manage Time Slots
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Time Slot Management Modal */}
      {showTimeSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New Time Slot
              </h3>
              <button
                onClick={() => setShowTimeSlotModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Day</label>
                <select
                  value={newTimeSlot.day}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, day: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newTimeSlot.start}
                    onChange={(e) =>
                      setNewTimeSlot({ ...newTimeSlot, start: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={newTimeSlot.end}
                    onChange={(e) =>
                      setNewTimeSlot({ ...newTimeSlot, end: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newTimeSlot.isRecurring}
                    onChange={(e) =>
                      setNewTimeSlot({
                        ...newTimeSlot,
                        isRecurring: e.target.checked,
                      })
                    }
                    className="form-checkbox h-5 w-5 text-emerald-600"
                  />
                  <span className="text-gray-700">Recurring Weekly</span>
                </label>
              </div>
              {!newTimeSlot.isRecurring && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newTimeSlot.startDate}
                      onChange={(e) =>
                        setNewTimeSlot({
                          ...newTimeSlot,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newTimeSlot.endDate}
                      onChange={(e) =>
                        setNewTimeSlot({
                          ...newTimeSlot,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowTimeSlotModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle adding new time slot
                  setShowTimeSlotModal(false);
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Add Time Slot
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Request Leave
              </h3>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) =>
                      setNewLeave({ ...newLeave, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) =>
                      setNewLeave({ ...newLeave, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Reason</label>
                <textarea
                  value={newLeave.reason}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, reason: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none"
                  placeholder="Please provide a reason for your leave request..."
                ></textarea>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle submitting leave request
                  setShowLeaveModal(false);
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Appointment Details
              </h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={selectedAppointment.patientImage}
                  alt={selectedAppointment.patientName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {selectedAppointment.patientName}
                  </h4>
                  <p className="text-gray-600">{selectedAppointment.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">
                    {selectedAppointment.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-semibold text-gray-800">
                    {selectedAppointment.time}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Symptoms</p>
                <p className="font-semibold text-gray-800">
                  {selectedAppointment.symptoms}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-300 !rounded-button whitespace-nowrap"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap">
                  Start Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

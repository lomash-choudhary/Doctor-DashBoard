"use client";
import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useForm, useFieldArray } from "react-hook-form"; // Add this import
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import StatsCard from "@/components/StatsCard";
import Charts from "@/components/Charts";
import { RecentActivity } from "@/components/RecentActivity";
import Schedule from "@/components/Schedule";
import Hospitals from "@/components/Hospitals";
import Appointments from "@/components/Appointments";
import Patients from "@/components/Patients";
import LoginModal from "@/components/login/LoginModal";
import DoctorProfileModal from "@/components/profile/DoctorProfileModal";
import TimeSlotModal from "@/components/timeslot/TimeSlotModal";
import LeaveRequestModal from "@/components/leave/LeaveRequestModal";
import AppointmentModal from "@/components/appointment/AppointmentModal";

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

  // Add these new states for login modal
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  // Set up React Hook Form
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

  // Set up field array for clinic addresses
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

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    // Process form submission
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      reset();
      setCurrentStep(1);

      // Show success message
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML =
        '<i class="fas fa-check-circle mr-2"></i> Account created successfully!';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
    }, 1500);
  };

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
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        previewImage={previewImage}
        handleImageChange={handleImageChange}
        clinicFields={clinicFields}
        removeClinic={removeClinic}
        appendClinic={appendClinic}
        weekDays={weekDays}
      />
      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        doctorProfile={doctorProfile}
        setShowTimeSlotModal={setShowTimeSlotModal}
      />
      {/* Time Slot Management Modal */}
      <TimeSlotModal
        showTimeSlotModal={showTimeSlotModal}
        setShowTimeSlotModal={setShowTimeSlotModal}
        newTimeSlot={newTimeSlot}
        setNewTimeSlot={setNewTimeSlot}
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

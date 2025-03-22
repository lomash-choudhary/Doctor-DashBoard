"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SignUpModel from "@/components/signup/SignUpModel";

// API base URL
const API_BASE_URL = "http://localhost:4000";

export default function SignupPage() {
  // Modal visibility state
  const [showSignUpModel, setShowSignUpModel] = useState(true);

  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Define weekdays schedule object
  const weekDays = {
    Monday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Tuesday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Wednesday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Thursday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Friday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Saturday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
    Sunday: {
      start: "",
      end: "",
      capacity: "",
      recurring: true,
      status: "ACTIVE",
    },
  };

  // Set up React Hook Form with backend field names
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      licenseNumber: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      yearsOfExperience: "",
      consultationFee: "",
      averageConsultationTime: "30",
      clinics: [
        {
          addressline1: "",
          addressLine2: "",
          addressLine3: "",
          isPrimaryLocation: true,
        },
      ],
      schedule: weekDays,
      hospitalJoined: [],
    },
    mode: "onChange",
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

  // Define fields to validate for each step
  const fieldsToValidateByStep = {
    1: ["name", "email", "username", "password", "confirmPassword"],
    2: [
      "specialization",
      "licenseNumber",
      "yearsOfExperience",
      "consultationFee",
      "averageConsultationTime",
    ],
    3: ["clinics"],
  };

  // Custom validation function
  const validateFieldsForStep = async (step) => {
    const fieldsToValidate = fieldsToValidateByStep[step] || [];
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      // Additional validation logic if needed
      const values = getValues();

      // Step 1 validation
      if (step === 1) {
        // Name validation
        if (values.name.length < 2) {
          setValue("name", values.name, { shouldValidate: true });
          return false;
        }

        // Email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(values.email)) {
          setValue("email", values.email, { shouldValidate: true });
          return false;
        }

        // Username validation
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (
          values.username.length < 3 ||
          !usernameRegex.test(values.username)
        ) {
          setValue("username", values.username, { shouldValidate: true });
          return false;
        }

        // Password validation
        const hasLowercase = /[a-z]/.test(values.password);
        const hasUppercase = /[A-Z]/.test(values.password);
        const hasNumber = /\d/.test(values.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

        if (
          values.password.length < 8 ||
          !hasLowercase ||
          !hasUppercase ||
          !hasNumber ||
          !hasSpecialChar
        ) {
          setValue("password", values.password, { shouldValidate: true });
          return false;
        }

        // Confirm password
        if (values.password !== values.confirmPassword) {
          setValue("confirmPassword", values.confirmPassword, {
            shouldValidate: true,
          });
          return false;
        }
      }

      // Step 2 validation
      if (step === 2) {
        if (!values.specialization) {
          setValue("specialization", "", { shouldValidate: true });
          return false;
        }

        // License number validation - should match Indian Medical License format
        const licenseRegex = /^[A-Z]{2,3}\/[A-Z0-9]+\/[0-9]{4}$/;
        if (!licenseRegex.test(values.licenseNumber)) {
          setValue("licenseNumber", values.licenseNumber, {
            shouldValidate: true,
          });
          return false;
        }

        // Years of experience
        const yearsExp = Number(values.yearsOfExperience);
        if (isNaN(yearsExp) || yearsExp < 0 || yearsExp > 60) {
          setValue("yearsOfExperience", values.yearsOfExperience, {
            shouldValidate: true,
          });
          return false;
        }

        // Consultation fee
        const fee = Number(values.consultationFee);
        if (isNaN(fee) || fee < 0 || fee > 50000) {
          setValue("consultationFee", values.consultationFee, {
            shouldValidate: true,
          });
          return false;
        }

        // Average consultation time
        const time = Number(values.averageConsultationTime);
        if (isNaN(time) || time < 5 || time > 120) {
          setValue("averageConsultationTime", values.averageConsultationTime, {
            shouldValidate: true,
          });
          return false;
        }
      }

      // Step 3 validation
      if (step === 3) {
        // Validate clinics
        if (!values.clinics || values.clinics.length === 0) {
          return false;
        }

        // Check if clinic addresses are filled
        for (const clinic of values.clinics) {
          if (
            !clinic.addressline1 ||
            !clinic.addressLine2 ||
            !clinic.addressLine3
          ) {
            return false;
          }
        }

        // Validate at least one time slot is filled
        const filledTimeSlots = Object.entries(values.schedule).filter(
          ([_, value]) => value.start && value.end && value.capacity
        );

        if (filledTimeSlots.length === 0) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  // Next step handler
  const handleNextStep = async () => {
    const isStepValid = await validateFieldsForStep(currentStep);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      // Display validation error message
      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg";
      errorDiv.textContent = "Please fill all required fields correctly";
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }
  };

  // Previous step handler
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission handler - this is the key function to fix
  const onSubmit = async (data) => {
    try {
      // Ensure we're on step 3 before submission can happen
      if (currentStep !== 3) {
        console.log("Preventing submission - not on final step");
        setCurrentStep(3); // Force to step 3
        return; // Don't proceed with submission
      }

      console.log("Starting submission from step 3...");

      // Final validation before submission
      const isValid = await validateFieldsForStep(3);

      if (!isValid) {
        throw new Error(
          "Please complete all required fields before submitting"
        );
      }

      // Make sure at least one day has time slots filled out
      const filledTimeSlots = Object.entries(data.schedule).filter(
        ([_, value]) => value.start && value.end && value.capacity
      );

      if (filledTimeSlots.length === 0) {
        throw new Error("Please add at least one time slot");
      }

      // Additional validation - check if any clinic address is incomplete
      const hasIncompleteAddress = data.clinics.some(
        (clinic) =>
          !clinic.addressline1 || !clinic.addressLine2 || !clinic.addressLine3
      );

      if (hasIncompleteAddress) {
        throw new Error("Please complete all fields in clinic addresses");
      }

      // Transform form data to match backend API expectations
      const transformedData = {
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        specialization: data.specialization,
        licenseNumber: data.licenseNumber,
        yearsOfExperience: Number(data.yearsOfExperience),
        consultationFee: Number(data.consultationFee),
        averageConsultationTime: Number(data.averageConsultationTime),

        // Format locationsOfDoctor as an array of objects
        locationsOfDoctor: data.clinics.map((clinic) => ({
          addressline1: clinic.addressline1 || "",
          addressLine2: clinic.addressLine2 || "",
          addressLine3: clinic.addressLine3 || "",
          isPrimaryLocation: !!clinic.isPrimaryLocation,
        })),

        // Format timeSlots to match backend schema
        timeSlots: filledTimeSlots.map(([day, value]) => ({
          dayName: day,
          slots: [
            {
              startTime: value.start,
              endTime: value.end,
              maxPatientsInTheSlot: Number(value.capacity) || 1,
              status: value.status || "ACTIVE",
              recurring: !!value.recurring,
              exceptions: [],
            },
          ],
        })),

        // Default empty array for hospitalJoined
        hospitalJoined: [],
      };

      console.log("Sending data to backend:", transformedData);

      // Make API call to register doctor
      const response = await fetch(`${API_BASE_URL}/api/v1/doctor/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      // Reset form and close modal on success
      reset();
      setCurrentStep(1);

      // Show success message
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML =
        '<i class="fas fa-check-circle mr-2"></i> Account created successfully!';
      document.body.appendChild(successDiv);

      setTimeout(() => {
        successDiv.remove();
        // Redirect to login page after success
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error);

      // Format validation errors from backend if available
      let errorMessage =
        error.message || "Registration failed. Please try again.";
      try {
        // Check if the error message is a JSON string containing validation errors
        if (error.message.includes("Validation failed:")) {
          const jsonStart = error.message.indexOf("[");
          if (jsonStart !== -1) {
            const errorsJson = error.message.substring(jsonStart);
            const errorsArray = JSON.parse(errorsJson);

            // Format the errors as a bulleted list
            errorMessage =
              "Validation failed:\n• " +
              errorsArray.map((err) => err.message).join("\n• ");
          }
        }
      } catch (e) {
        // If JSON parsing fails, use the original error message
        console.error("Error parsing validation errors:", e);
      }

      const errorDiv = document.createElement("div");
      errorDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg whitespace-pre-wrap";
      errorDiv.textContent = errorMessage;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000); // Give more time to read validation errors
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center py-8 px-4">
      <SignUpModel
        showSignUpModel={showSignUpModel}
        setShowSignUpModel={setShowSignUpModel}
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
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        trigger={trigger}
        getValues={getValues}
        setValue={setValue}
        totalSteps={3}
        watch={watch}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function BasicInfoForm({
  register,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  previewImage,
  handleImageChange,
  watch,
}) {
  // Watch password fields to check requirements in real-time
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  // Password requirement states
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Check password requirements
  useEffect(() => {
    setPasswordRequirements({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Check if passwords match
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  // Prevent form submission on enter
  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={preventEnterSubmit}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
        <div className="relative mb-4 sm:mb-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 shadow-sm">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Doctor Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="text-center">
                <i className="fas fa-user-md text-3xl text-gray-400 mb-1"></i>
                <p className="text-xs text-gray-500">Upload Photo</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profileImage"
            {...register("profileImage")}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById("profileImage").click()}
            className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
          >
            <i className="fas fa-camera"></i>
          </button>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="Dr. John Smith"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-envelope"></i>
            </div>
            <input
              type="email"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="doctor@example.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-user"></i>
            </div>
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="dr.username"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.username.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-lock"></i>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-lock"></i>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border rounded-lg ${
                errors.confirmPassword || (confirmPassword && !passwordsMatch)
                  ? "border-red-500"
                  : confirmPassword && passwordsMatch
                  ? "border-green-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 transition-colors`}
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.confirmPassword.message}
            </p>
          )}
          {/* Custom password match indicator */}
          {confirmPassword && !errors.confirmPassword && (
            <p
              className={`text-sm mt-1 flex items-center ${
                passwordsMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              <i
                className={`fas ${
                  passwordsMatch ? "fa-check-circle" : "fa-times-circle"
                } mr-1`}
              ></i>
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
        </div>
      </div>

      {/* Password strength indicators */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Password must contain:
        </h4>
        <ul className="space-y-1">
          <li
            className={`text-sm flex items-center ${
              passwordRequirements.minLength
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            <i
              className={`fas ${
                passwordRequirements.minLength ? "fa-check-circle" : "fa-circle"
              } mr-2`}
            ></i>
            At least 8 characters
          </li>
          <li
            className={`text-sm flex items-center ${
              passwordRequirements.hasLowercase
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            <i
              className={`fas ${
                passwordRequirements.hasLowercase
                  ? "fa-check-circle"
                  : "fa-circle"
              } mr-2`}
            ></i>
            One lowercase letter
          </li>
          <li
            className={`text-sm flex items-center ${
              passwordRequirements.hasUppercase
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            <i
              className={`fas ${
                passwordRequirements.hasUppercase
                  ? "fa-check-circle"
                  : "fa-circle"
              } mr-2`}
            ></i>
            One uppercase letter
          </li>
          <li
            className={`text-sm flex items-center ${
              passwordRequirements.hasNumber
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            <i
              className={`fas ${
                passwordRequirements.hasNumber ? "fa-check-circle" : "fa-circle"
              } mr-2`}
            ></i>
            One number
          </li>
          <li
            className={`text-sm flex items-center ${
              passwordRequirements.hasSpecial
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            <i
              className={`fas ${
                passwordRequirements.hasSpecial
                  ? "fa-check-circle"
                  : "fa-circle"
              } mr-2`}
            ></i>
            One special character
          </li>
        </ul>
      </div>
    </div>
  );
}

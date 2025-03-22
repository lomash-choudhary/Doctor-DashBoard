import React from "react";

export default function PasswordInput({ 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword 
}) {
  return (
    <div>
      <label className="block text-gray-700 mb-2" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fas fa-lock text-gray-400"></i>
        </div>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-300 text-gray-700 bg-gray-50"
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
        >
          <i
            className={`fas ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
}
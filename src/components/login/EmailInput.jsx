import React from "react";

export default function EmailInput({ email, setEmail }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2" htmlFor="email">
        Email Address
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fas fa-envelope text-gray-400"></i>
        </div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-300 text-gray-700 bg-gray-50"
          placeholder="doctor@example.com"
          required
        />
      </div>
    </div>
  );
}
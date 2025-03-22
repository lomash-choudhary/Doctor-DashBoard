import React from "react";

export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
        <i className="fas fa-user-md text-white text-3xl transform -rotate-12"></i>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
        Welcome Back, Doctor
      </h2>
      <p className="mt-2 text-gray-600">
        Sign in to access your dashboard
      </p>
    </div>
  );
}
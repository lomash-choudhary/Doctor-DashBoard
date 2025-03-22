import React from "react";

export default function RememberForgot() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-700"
        >
          Remember me
        </label>
      </div>
      <button
        type="button"
        onClick={() => window.location.href = "/forgot-password"}
        className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
      >
        Forgot password?
      </button>
    </div>
  );
}
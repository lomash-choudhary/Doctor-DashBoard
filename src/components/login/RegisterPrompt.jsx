import React from "react";

export default function RegisterPrompt() {
  return (
    <div className="text-center mt-6">
      <span className="text-gray-600">Don't have an account?</span>
      <button
        type="button"
        onClick={() => window.location.href = "/register"}
        className="ml-2 text-emerald-600 hover:text-emerald-500 font-medium"
      >
        Register now
      </button>
    </div>
  );
}
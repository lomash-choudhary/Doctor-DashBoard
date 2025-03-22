import React from "react";

export default function SubmitButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 !rounded-button whitespace-nowrap"
    >
      {isSubmitting ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i> Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
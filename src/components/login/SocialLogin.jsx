import React from "react";

export default function SocialLogin({ onGoogleLogin }) {
  return (
    <button
      type="button"
      onClick={onGoogleLogin}
      className="w-full px-8 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition duration-300 flex items-center justify-center space-x-3 !rounded-button whitespace-nowrap"
    >
      <img
        src="https://public.readdy.ai/ai/img_res/4c1fb570d460b6f210f283d443bf5651.jpg"
        alt="Google"
        className="w-6 h-6"
      />
      <span>Sign in with Google</span>
    </button>
  );
}
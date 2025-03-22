"use client";

import React, { useState } from "react";
import LoginContainer from "@/components/login/LoginContainer";
import LoginHeader from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";
import Divider from "@/components/login/Divider";
import SocialLogin from "@/components/login/SocialLogin";
import RegisterPrompt from "@/components/login/RegisterPrompt";
import ErrorMessage from "@/components/login/ErrorMessage";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      console.log("Making login request with:", { email, password: "***" });

      const response = await fetch(`${API_BASE_URL}/api/v1/doctor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for cookies
      });

      console.log("Login response status:", response.status);
      const responseText = await response.text();
      
      // Try to parse as JSON, but handle it gracefully if it's not JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Login response data:", data);
      } catch (e) {
        console.error("Response is not JSON:", responseText);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Important! Get the actual username from database - don't try to extract from email
      // For now, we'll need to use the email itself (or part of it) as username
      // since the backend doesn't return the username in the login response
      
      // 1. First try to get username from the response if available
      let username;
      if (data.data && data.data.username) {
        username = data.data.username;
      } else if (data.data && data.data.user && data.data.user.username) {
        username = data.data.user.username;
      } else {
        // 2. If not available in response, try to extract cleanly from email
        const emailUsername = email.split('@')[0];
        
        // Make sure it doesn't have spaces or special characters (except underscores)
        username = emailUsername.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
        
        console.warn("Username not found in response, using derived username:", username);
      }

      // Store username in localStorage - this is needed for your dashboard
      if (username) {
        localStorage.setItem("doctorUsername", username);
        console.log("Username stored in localStorage:", username);
      }

      // Show success message
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center";
      successDiv.innerHTML =
        '<i class="fas fa-check-circle mr-2"></i> Login successful!';
      document.body.appendChild(successDiv);

      // Redirect to dashboard after success message
      console.log("Preparing to redirect to dashboard...");
      setTimeout(() => {
        successDiv.remove();
        console.log("Redirecting to dashboard now");
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        // Network error - server might be down or unreachable
        setErrorMessage(
          "Cannot connect to server. Please check if the server is running."
        );
      } else {
        setErrorMessage(error.message || "Invalid email or password");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/v1/doctor/google/login`;
  };

  return (
    <LoginContainer>
      <LoginHeader />

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
        isSubmitting={isSubmitting}
      />

      <Divider text="Or continue with" />

      <SocialLogin onGoogleLogin={handleGoogleLogin} />

      <RegisterPrompt />
    </LoginContainer>
  );
}

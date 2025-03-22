import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberForgot from "./RememberForgot";
import SubmitButton from "./SubmitButton";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  isSubmitting,
}) {
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <EmailInput email={email} setEmail={setEmail} />
      
      <PasswordInput 
        password={password} 
        setPassword={setPassword} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} 
      />
      
      <RememberForgot />
      
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
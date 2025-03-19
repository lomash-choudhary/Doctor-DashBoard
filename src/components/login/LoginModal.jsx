import React from "react";
import ModalHeader from "./ModalHeader";
import ProgressSteps from "./ProgressSteps";
import BasicInfoForm from "./BasicInfoForm";
import ProfessionalInfoForm from "./ProfessionalInfoForm";
import ScheduleForm from "./ScheduleForm";
import FormNavigation from "./FormNavigation";

export default function LoginModal({
  showLoginModal,
  setShowLoginModal,
  currentStep,
  setCurrentStep,
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  previewImage,
  handleImageChange,
  clinicFields,
  removeClinic,
  appendClinic,
  weekDays
}) {
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full">
        <ModalHeader 
          title="Doctor Portal" 
          subtitle="Complete your profile to join our medical network"
          onClose={() => setShowLoginModal(false)} 
        />

        <ProgressSteps currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <BasicInfoForm
              register={register}
              errors={errors}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              previewImage={previewImage}
              handleImageChange={handleImageChange}
            />
          )}

          {currentStep === 2 && (
            <ProfessionalInfoForm
              register={register}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <ScheduleForm
              register={register}
              errors={errors}
              clinicFields={clinicFields}
              removeClinic={removeClinic}
              appendClinic={appendClinic}
              weekDays={weekDays}
            />
          )}

          <FormNavigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
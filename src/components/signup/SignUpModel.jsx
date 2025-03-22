import React from "react";
import ModalHeader from "./ModalHeader";
import ProgressSteps from "./ProgressSteps";
import BasicInfoForm from "./BasicInfoForm";
import ProfessionalInfoForm from "./ProfessionalInfoForm";
import ScheduleForm from "./ScheduleForm";
import FormNavigation from "./FormNavigation";

export default function SignUpModel({
  showSignUpModel,
  setShowSignUpModel,
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
  weekDays,
  handleNextStep,
  handlePrevStep,
  totalSteps,
  trigger,
  getValues,
  setValue,
  watch,
}) {
  if (!showSignUpModel) return null;

  // Prevent default form submission on enter key
  const preventEnterKeySubmission = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <ModalHeader
          title="Care Setu Doctor Portal"
          subtitle="Complete your profile to join our medical network"
          onClose={() => setShowSignUpModel(false)}
        />

        <ProgressSteps currentStep={currentStep} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          onKeyDown={preventEnterKeySubmission}
        >
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
              watch={watch}
            />
          )}

          {currentStep === 2 && (
            <ProfessionalInfoForm register={register} errors={errors} />
          )}

          {currentStep === 3 && (
            <ScheduleForm
              register={register}
              errors={errors}
              clinicFields={clinicFields}
              removeClinic={removeClinic}
              appendClinic={appendClinic}
              weekDays={weekDays}
              isSubmitting={isSubmitting}
            />
          )}

          <FormNavigation
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            totalSteps={3}
          />
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSignupMutation } from "../../features/Auth/authApi.ts";

import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/Auth/authSlice.ts";
import { StepData } from "../../types/FormTypes.types";
import MultiStep from "../utils/MultiStep";
import AuthStepFour from "./AuthFormSteps/AuthStepFour";
import AuthStepOne from "./AuthFormSteps/AuthStepOne";
import AuthStepThree from "./AuthFormSteps/AuthStepThree";
import AuthStepTwo from "./AuthFormSteps/AuthStepTwo";

interface LawyerSignupFormProps {
  setIsSuccessLawyer: React.Dispatch<React.SetStateAction<boolean>>;
}

const LawyerSignupForm: React.FC<LawyerSignupFormProps> = ({
  setIsSuccessLawyer,
}) => {
  const [stepData, setStepData] = useState<StepData>({
    firstName: "",
    lastName: "",
    nationalId: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    specialization: { value: "", label: "" },
    nationalIdImage: "",
    certificate: "",
    lawLicense: "",
    slotsConfirmed: false,
    uploadedFileNames: {
      nationalIdImage: "",
      certificate: "",
      lawLicense: "",
    },
    selectedOptions: {
      specialization: null,
    },
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [signup, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: stepData,
  });

  const handleNext = (data: StepData) => {
    setStepData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBackClick = () => {
    setActiveStep(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setStepData({
      firstName: "",
      lastName: "",
      nationalId: "",
      city: "",
      phone: "",
      email: "",
      password: "",
      specialization: { value: "", label: "" },
      nationalIdImage: "",
      certificate: "",
      lawLicense: "",
      slotsConfirmed: false,
      uploadedFileNames: {
        nationalIdImage: "",
        certificate: "",
        lawLicense: "",
      },
      selectedOptions: {
        specialization: null,
      },
    });
    setActiveStep(0);
    methods.reset();
  };

  const dispatch = useDispatch();

  const handleFinalSubmit = async (data: StepData) => {
    const userType = "Lawyer";
    try {
      // todo: Create a func to transform hours to 24 hours mode...
      const availability = {};
      Object.keys(data.timeSlots).forEach((day, index) => {
        availability[index] = data.timeSlots[day].map(
          (slot: {
            from: { hour: string; minute: string };
            to: { hour: string; minute: string };
          }) => ({
            from: `${slot.from.hour}:${slot.from.minute}`,
            to: `${slot.to.hour}:${slot.to.minute}`,
          }),
        );
      });

      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("city", data.city);
      formData.append("nationalId", data.nationalId);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("specialization", data.specialization[0].value);
      formData.append("password", data.password);
      formData.append("nationalIdImage", data.nationalIdImage[0]);
      formData.append("certificate", data.certificate[0]);
      formData.append("lawLicense", data.lawLicense[0]);
      formData.append("availability", JSON.stringify(availability));
      formData.append("userType", userType);

      const response = await signup(formData).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      Cookie.set("lawyerToken", response.token, { expires: 30 });
      localStorage.setItem("userType", response.user.userType);
      setIsSuccessLawyer(true);
      handleReset();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const steps = [
    <AuthStepOne
      key={activeStep}
      onNext={handleNext}
      defaultValues={stepData}
    />,
    <AuthStepTwo
      key={activeStep}
      onNext={handleNext}
      onBack={handleBackClick}
      defaultValues={stepData}
      lawyer={true}
    />,
    <AuthStepThree
      key={activeStep}
      onNext={handleNext}
      onBack={handleBackClick}
      defaultValues={stepData}
    />,
    <AuthStepFour
      key={activeStep}
      stepData={stepData}
      onSubmit={handleFinalSubmit}
      onBack={handleBackClick}
      isLoading={isLoading}
    />,
  ];

  return (
    <FormProvider {...methods}>
      <div className="w-[90vw] lg:w-full">
        <MultiStep
          lawyerStep
          items={[
            "المعلومات الأساسية",
            "المعلومات التقنية",
            "المعلومات القانونية",
            "معلومات المواعيد",
          ]}
          active={activeStep}
        />
      </div>
      <div className="flex w-[90vw] flex-col gap-1 py-4 lg:w-full">
        {isError ? (
          <p
            className={`py-2 text-error ${
              activeStep === 3 ? "block" : "hidden"
            } self-center text-sm`}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {error?.data?.msg}
          </p>
        ) : (
          <p
            className={`self-center py-2 text-sm text-success ${
              activeStep === 3
                ? `${isSuccess ? "block opacity-100" : "block opacity-0"}`
                : "hidden"
            }`}
          >
            تم إنشاء الحساب
          </p>
        )}
        {steps[activeStep]}
      </div>
    </FormProvider>
  );
};

export default LawyerSignupForm;

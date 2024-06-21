import Cookie from "js-cookie";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/Auth/authApi.ts";
import { setCredentials } from "../../features/Auth/authSlice.ts";
import { UserSignUpData } from "../../types/FormTypes.types.ts";
import MultiStep from "../utils/MultiStep";
import AuthStepOne from "./AuthFormSteps/AuthStepOne.tsx";
import AuthStepTwo from "./AuthFormSteps/AuthStepTwo.tsx";

interface UserSignupFormProps {
  setIsSuccessUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserSignupForm: React.FC<UserSignupFormProps> = ({
  setIsSuccessUser,
}) => {
  const [stepData, setStepData] = useState<UserSignUpData>({
    firstName: "",
    lastName: "",
    nationalId: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [signup, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: stepData,
  });

  const handleNext = (data: UserSignUpData) => {
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
    });
    setActiveStep(0);
    methods.reset();
  };

  const dispatch = useDispatch();
  const handleFinalSubmit = async (data: UserSignUpData) => {
    const userType = "Client";
    try {
      const formData = new FormData();
      formData.append("firstName", stepData.firstName);
      formData.append("lastName", stepData.lastName);
      formData.append("city", stepData.city);
      formData.append("nationalId", stepData.nationalId);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("userType", userType);

      const response = await signup(formData).unwrap();
      setIsSuccessUser(true);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      dispatch(setCredentials({ user: response.user, token: response.token }));
      Cookie.set("userToken", response.token, { expires: 30 });
      localStorage.setItem("userType", response.user.userType);
      handleReset();
    } catch (err) {
      console.error("Signup failed", err);
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
      isLoading={isLoading}
      defaultValues={stepData}
      onBack={handleBackClick}
      onNext={handleFinalSubmit}
    />,
  ];

  return (
    <FormProvider {...methods}>
      <div className="w-[90vw] lg:w-full">
        <MultiStep
          items={["المعلومات الأساسية", "المعلومات الأخرى"]}
          active={activeStep}
        />
      </div>
      <div className="flex w-[90vw] flex-col gap-1 py-4 lg:w-full">
        {isError ? (
          <p
            className={`py-2 text-error ${
              activeStep === 1 ? "block" : "hidden"
            } self-center text-sm`}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {error?.data?.msg}
          </p>
        ) : (
          <p
            className={`self-center py-2 text-sm text-success ${
              activeStep === 1
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

export default UserSignupForm;

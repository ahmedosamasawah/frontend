import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { stepTwoSchema } from "../../utils/validationsSchemas.ts";

import { UserSignUpData } from "../../../types/FormTypes.types.ts";
import Cta from "../Cta.tsx";
import Loading from "../Feedback/Loading";
import TextInput from "../Form/TextInput.tsx";
import TermsAndConditions from "../TermsAndConditions.tsx";

const StepTwo: React.FC<{
  onNext: (data: UserSignUpData) => void;
  onBack: () => void;
  defaultValues: UserSignUpData;
  lawyer?: boolean;
  isLoading?: boolean;
}> = ({ onNext, onBack, defaultValues, isLoading = false, lawyer = false }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const methods = useForm({
    resolver: zodResolver(stepTwoSchema),
    mode: "onTouched",
    defaultValues,
  });

  const handleUserSubmit = (data: UserSignUpData) => {
    methods.trigger().then(isValid => {
      if (isValid) {
        if (!termsAccepted) {
          alert("يرجى قبول الشروط لإنشاء الحساب");
        } else {
          onNext(data);
        }
      }
    });
  };

  const handleLawyerSubmit = (data: UserSignUpData) => {
    methods.trigger().then(isValid => {
      if (isValid) {
        onNext(data);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          lawyer
            ? methods.handleSubmit(handleLawyerSubmit)()
            : methods.handleSubmit(handleUserSubmit)();
        }}
        className="md:px-16"
      >
        <TextInput
          name="phone"
          type="tel"
          labelText="رقم الهاتف"
          placeholder="| 1234 5678 9256"
          error={methods.formState.errors.phone?.message}
          register={methods.register("phone")}
        />
        <TextInput
          name="email"
          type="email"
          labelText="البريد الإلكتروني"
          placeholder="ما هو بريدك الإلكتروني؟"
          error={methods.formState.errors.email?.message}
          register={methods.register("email")}
        />
        <TextInput
          name="password"
          type="password"
          labelText="كلمة السر"
          placeholder="ما هي كلمة السر؟"
          error={methods.formState.errors.password?.message}
          register={methods.register("password")}
        />
        {!lawyer && (
          <TermsAndConditions
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
        )}
        <div className={`flex ${isLoading ? "justify-center" : ""} mt-8 gap-2`}>
          {isLoading && !lawyer ? (
            <Loading />
          ) : (
            <>
              <button
                type="button"
                onClick={onBack}
                className="flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm border-2 border-secondary-normal p-4 text-md text-secondary-normal hover:bg-background"
              >
                السابق
              </button>
              <Cta text={lawyer ? "التالي" : "إنشاء حساب"} type="submit" />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default StepTwo;

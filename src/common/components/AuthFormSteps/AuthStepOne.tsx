import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import Cta from "../Cta";
import TextInput from "../Form/TextInput.tsx";
import { UserSignUpData } from "../../../types/FormTypes.types.ts";
import { stepOneSchema } from "../../utils/validationsSchemas.ts";

const StepOne: React.FC<{
  onNext: (data: UserSignUpData) => void;
  defaultValues: UserSignUpData;
}> = ({ onNext, defaultValues }) => {
  const methods = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: "onTouched",
    defaultValues,
  });

  const handleSubmit = (data: UserSignUpData) => {
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
          methods.handleSubmit(handleSubmit)();
        }}
        className="md:px-16"
      >
        <TextInput
          name="firstName"
          type="text"
          labelText="الإسم الأول"
          placeholder="دعنا نتعرف على إسمك الأول"
          error={methods.formState.errors.firstName?.message}
          register={methods.register("firstName")}
        />
        <TextInput
          name="lastName"
          type="text"
          labelText="الإسم الأخير"
          placeholder="دعنا نتعرف على إسمك الأخير"
          error={methods.formState.errors.lastName?.message}
          register={methods.register("lastName")}
        />
        <TextInput
          name="city"
          type="text"
          labelText="المدينة"
          placeholder="دعنا نتعرف على مدينتك"
          error={methods.formState.errors.city?.message}
          register={methods.register("city")}
        />
        <TextInput
          name="nationalId"
          type="text"
          labelText="رقم الهوية"
          placeholder="ما هو رقم هويتك؟"
          error={methods.formState.errors.nationalId?.message}
          register={methods.register("nationalId")}
        />
        <div className="mt-4">
          <Cta text="التالي" type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default StepOne;

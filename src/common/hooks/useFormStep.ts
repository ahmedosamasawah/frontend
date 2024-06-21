import { useState } from "react";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type UseFormStepProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  defaultValues: T;
};

const useFormStep = <T extends FieldValues>({
  schema,
  defaultValues,
}: UseFormStepProps<T>) => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    // @ts-expect-error - type T is not assignable to type FieldValues
    defaultValues,
  });

  const handleNext = async (onSubmit: SubmitHandler<T>) => {
    const isValid = await methods.trigger();
    if (isValid) {
      onSubmit(methods.getValues());
      setActiveStep(prev => prev + 1);
    } else {
      alert("Please resolve all errors before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return {
    activeStep,
    setActiveStep,
    methods,
    handleNext,
    handleBack,
  };
};

export default useFormStep;

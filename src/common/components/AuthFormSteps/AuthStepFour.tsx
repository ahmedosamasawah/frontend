import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { ReservedPeriod, TimeSlot } from "../../../types/FormTypes.types.ts";
import { stepFourSchema } from "../../utils/validationsSchemas.ts";
import Cta from "../Cta.tsx";
import Loading from "../Feedback/Loading";
import TimePicker from "../Form/TimePicker.tsx";
import TermsAndConditions from "../TermsAndConditions.tsx";

interface StepFourFormData extends FieldValues {
  slotsConfirmed: boolean;
}

const StepFour: React.FC<{
  stepData: StepFourFormData;
  onSubmit: (data: unknown) => void;
  onBack: () => void;
  isLoading?: boolean;
}> = ({ stepData, onSubmit, onBack, isLoading }) => {
  const methods = useForm({
    resolver: zodResolver(stepFourSchema),
    mode: "onTouched",
    defaultValues: stepData,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [reservedPeriods, setReservedPeriods] = useState<
    Record<string, ReservedPeriod[]>
  >({
    السبت: [],
    الأحد: [],
    الإثنين: [],
    الثلاثاء: [],
    الأربعاء: [],
    الخميس: [],
    الجمعة: [],
  });
  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>({
    السبت: [],
    الأحد: [],
    الإثنين: [],
    الثلاثاء: [],
    الأربعاء: [],
    الخميس: [],
    الجمعة: [],
  });
  const [timePickerError, setTimePickerError] = useState<string>("");

  const checkIfAnySlotConfirmed = () => {
    return Object.values(timeSlots).some(slots =>
      slots.some(slot => slot.confirmed),
    );
  };

  const handleSubmit = () => {
    methods.trigger("slotsConfirmed").then(isValid => {
      if (isValid && checkIfAnySlotConfirmed()) {
        if (!termsAccepted) {
          alert("يرجى قبول الشروط لإنشاء الحساب");
          return;
        }
        onSubmit({ ...stepData, timeSlots });
      } else {
        setTimePickerError("يرجى اختيار موعد واحد في الأسبوع على الأقل!");
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
        className="md:px-3"
      >
        <TimePicker
          labelText="حدد أوقاتك المتاحة للعمل"
          error={methods.formState.errors.slotsConfirmed?.message}
          timePickerError={timePickerError}
          setTimePickerError={setTimePickerError}
          reservedPeriods={reservedPeriods}
          setReservedPeriods={setReservedPeriods}
          timeSlots={timeSlots}
          setTimeSlots={setTimeSlots}
        />
        <TermsAndConditions
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
        />
        <div className={`mt-4 flex gap-2 ${isLoading ? "justify-center" : ""}`}>
          {isLoading ? (
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
              <Cta text="إنشاء الحساب" type="submit" />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default StepFour;

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useFetchSpecializationsQuery } from "../../../features/Auth/authApi.ts";
import { StepData } from "../../../types/FormTypes.types.ts";
import { stepThreeSchema } from "../../utils/validationsSchemas.ts";
import Cta from "../Cta.tsx";
import FileInput from "../Form/FileInput";
import FormSelect from "../Form/FormSelect";

const StepThree: React.FC<{
  onNext: (data: StepData) => void;
  onBack: () => void;
  defaultValues: StepData;
}> = ({ onNext, onBack, defaultValues }) => {
  const methods = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: "onTouched",
    defaultValues,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState(
    defaultValues.uploadedFileNames,
  );
  const [selectedOptions, setSelectedOptions] = useState(
    defaultValues.selectedOptions,
  );
  const [optionsOpen, setOptionsOpen] = useState({ specialization: false });
  const [options, setOptions] = useState([]);
  const { data: specializations, isLoading } =
    useFetchSpecializationsQuery(undefined);

  useEffect(() => {
    if (specializations) {
      const newOptions = specializations.categories.map(
        (item: { name: string; _id: string }) => ({
          label: item.name,
          value: item._id,
        }),
      );
      setOptions(newOptions);
    }
  }, [specializations]);

  const handleNext = (data: StepData) => {
    methods.trigger().then(isValid => {
      if (isValid) {
        onNext({
          ...data,
          uploadedFileNames,
          selectedOptions,
        });
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          methods.handleSubmit(handleNext)();
        }}
        className="md:px-16"
      >
        <FileInput
          name="nationalIdImage"
          labelText="ارفع صورة الهوية"
          accept="image/*"
          error={methods.formState.errors.nationalIdImage?.message}
          register={methods.register("nationalIdImage", { required: true })}
          fileName={uploadedFileNames.nationalIdImage}
          setFileName={value =>
            setUploadedFileNames(prev => ({
              ...prev,
              nationalIdImage: value,
            }))
          }
        />
        <FileInput
          name="certificate"
          labelText="ارفع صورة المؤهل"
          accept="image/*"
          error={methods.formState.errors.certificate?.message}
          register={methods.register("certificate")}
          fileName={uploadedFileNames.certificate}
          setFileName={value =>
            setUploadedFileNames(prev => ({
              ...prev,
              certificate: value,
            }))
          }
        />
        <FileInput
          name="lawLicense"
          labelText="ارفع صورة رخصة المحاماة"
          accept="image/*"
          error={methods.formState.errors.lawLicense?.message}
          register={methods.register("lawLicense")}
          fileName={uploadedFileNames.lawLicense}
          setFileName={value =>
            setUploadedFileNames(prev => ({
              ...prev,
              lawLicense: value,
            }))
          }
        />
        <FormSelect
          labelText="برجاء اختيار التخصص"
          list={isLoading ? [] : options}
          error={methods.formState.errors.specialization?.message}
          optionsOpen={optionsOpen.specialization}
          setOptionsOpen={() =>
            setOptionsOpen(prev => ({
              ...prev,
              specialization: !prev.specialization,
            }))
          }
          selectedOption={selectedOptions.specialization}
          setSelectedOption={value => {
            setSelectedOptions(prev => ({
              ...prev,
              specialization: value,
            }));
          }}
          register={methods.register("specialization")}
        />
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            onClick={onBack}
            className="flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm border-2 border-secondary-normal p-4 text-md text-secondary-normal hover:bg-background"
          >
            السابق
          </button>
          <Cta text="التالي" type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default StepThree;

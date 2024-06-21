import { useState } from "react";
import StepOne from "../../common/components/ConsultationSteps/StepOne.tsx";
import StepThree from "../../common/components/ConsultationSteps/StepThree.tsx";
import StepTwo from "../../common/components/ConsultationSteps/StepTwo.tsx";
import MultiStep from "../../common/utils/MultiStep";

const steps = ["حدد القسم", "حدد النوع", "املأ بيانات الاستشارة"];

const ConsultationRequestPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedConsultationType, setSelectedConsultationType] =
    useState(null);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <main className="flex flex-col gap-8 lg:gap-10">
      <MultiStep items={steps} active={currentStep} consultation={true} />
      <div>
        {currentStep === 0 && (
          <StepOne
            nextStep={nextStep}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {currentStep === 1 && (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            selectedCategory={selectedCategory}
            setSelectedConsultationType={setSelectedConsultationType}
          />
        )}
        {currentStep === 2 && (
          <StepThree
            setCurrentStep={setCurrentStep}
            prevStep={prevStep}
            selectedCategory={selectedCategory}
            selectedConsultationType={selectedConsultationType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </div>
    </main>
  );
};

export default ConsultationRequestPage;

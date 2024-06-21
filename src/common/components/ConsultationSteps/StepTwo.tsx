import React, { useState } from "react";

import Cta from "../Cta";
import SearchFilterBar from "../SearchFilterBar.tsx";

const dummyConsultationTypes = [
  {
    id: 1,
    name: "استشارة قانونية",
    description:
      "الاستيلاء على المعلومات الشخصية، تتنوع حالات انتحال الشخصية من الاستيلاء على بطاقات الائتمان أو الحسابات المصرفية إلى إنشاء حسابات وهمية على وسائل التواصل الاجتماعي باستخدام معلومات شخصية مزيفة..",
    documents: ["وثيقة 1", "وثيقة 2"],
    cost: 500,
  },
  {
    id: 2,
    name: "استشارة طبية",
    description:
      "الاستيلاء على المعلومات الشخصية، تتنوع حالات انتحال الشخصية من الاستيلاء على بطاقات الائتمان أو الحسابات المصرفية إلى إنشاء حسابات وهمية على وسائل التواصل الاجتماعي باستخدام معلومات شخصية مزيفة..",
    documents: ["وثيقة 1", "وثيقة 2"],
    cost: 600,
  },
  {
    id: 3,
    name: "استشارة مالية",
    description:
      "الاستيلاء على المعلومات الشخصية، تتنوع حالات انتحال الشخصية من الاستيلاء على بطاقات الائتمان أو الحسابات المصرفية إلى إنشاء حسابات وهمية على وسائل التواصل الاجتماعي باستخدام معلومات شخصية مزيفة..",
    documents: ["وثيقة 1", "وثيقة 2"],
    cost: 700,
  },
];

const StepTwo = ({
  nextStep,
  prevStep,
  selectedCategory,
  setSelectedConsultationType,
}) => {
  const [selectedConsultationTypeId, setSelectedConsultationTypeId] =
    useState(null);
  const [error, setError] = useState("");
  const [filteredConsultationTypes, setFilteredConsultationTypes] = useState(
    dummyConsultationTypes,
  );

  const handleSearch = (query: string) => {
    setFilteredConsultationTypes(
      dummyConsultationTypes.filter(type =>
        type.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const handleFilter = (filter: any) => {
    // هنا يمكنك إضافة منطق التصفية بناء على الفلتر المحدد
    console.log("تصفية:", filter);
  };

  const handleConsultationTypeClick = type => {
    setSelectedConsultationTypeId(type.id);
    setSelectedConsultationType(type);
    setError("");
  };

  const handleNextClick = () => {
    if (!selectedConsultationTypeId) {
      setError("يجب اختيار نوع الاستشارة للانتقال إلى الخطوة التالية.");
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchFilterBar
        fullWidth={true}
        onSearch={handleSearch}
        onFilter={handleFilter}
        placeholder="ابحث عن نوع الاستشارة"
        suggestions={dummyConsultationTypes}
        onSuggestionClick={handleConsultationTypeClick}
      />

      <div className="mt-2 grid grid-cols-1 gap-6 text-text-light md:grid-cols-2">
        {filteredConsultationTypes.map(type => (
          <div
            key={type.id}
            onClick={() => handleConsultationTypeClick(type)}
            className={`flex cursor-pointer flex-col justify-between gap-6 rounded-md border bg-background p-8 ${
              selectedConsultationTypeId === type.id
                ? "border-secondary-normal"
                : "border-background"
            }`}
          >
            <div className="flex items-center gap-4">
              <span>{selectedCategory.icon}</span>
              <div className="flex flex-col gap-2">
                <span className="text-md text-secondary-normal">
                  {selectedCategory.title}
                </span>
                <h3 className="text-xl">{type.name}</h3>
              </div>
            </div>
            <p className="text-md font-extralight">{type.description}</p>
            <div className="flex flex-col gap-4">
              <p className="text-md text-secondary-dark">المستندات المطلوبة:</p>
              <ul className="flex justify-between text-md font-extralight">
                {type.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-md text-secondary-dark">سعر الخدمة:</p>
              <p className="text-sm">{type.cost} ريال</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {error ? (
          <p className="text-center text-error">{error}</p>
        ) : (
          <p className="opacity-0">
            لا توجد مشاكل، يمكنك الذهاب للخطوة التالية
          </p>
        )}
        <div className="flex justify-between gap-8">
          <button
            type="button"
            onClick={prevStep}
            className="flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm border-2 border-secondary-normal p-4 text-md text-secondary-normal hover:bg-background"
          >
            السابق
          </button>
          <Cta text="التالي" onClick={handleNextClick} type="button" />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

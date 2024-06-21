import Image from "next/image";
import React, { useState } from "react";
import Cta from "../Cta";
import DateInput from "../Form/DateInput.tsx";
import FileInput from "../Form/FileInput.tsx";
import SearchFilterBar from "../SearchFilterBar.tsx";

const dummyLawyers = [
  {
    id: 1,
    name: "بندر عبد العزيز محمد",
    rating: 4,
    imageUrl: "/muslim.png",
    availableTimes: {
      "0": [
        { from: "06:00", to: "07:00" },
        { from: "07:30", to: "08:30" },
        { from: "09:00", to: "10:00" },
        { from: "13:30", to: "16:00" },
      ],
      "1": [
        { from: "01:00", to: "04:00" },
        { from: "12:30", to: "03:30" },
        { from: "20:00", to: "21:00" },
      ],
      "2": [{ from: "04:00", to: "12:00" }],
      "3": [
        { from: "01:00", to: "04:00" },
        { from: "11:00", to: "13:00" },
      ],
      "4": [
        { from: "05:00", to: "06:00" },
        { from: "15:30", to: "17:30" },
        { from: "21:00", to: "23:30" },
      ],
      "5": [
        { from: "03:30", to: "05:00" },
        { from: "14:30", to: "15:30" },
      ],
      "6": [
        { from: "02:00", to: "04:30" },
        { from: "17:30", to: "19:30" },
        { from: "21:00", to: "23:00" },
      ],
    },
  },
  {
    id: 2,
    name: "سارة القحطاني",
    rating: 5,
    imageUrl: "/muslim.png",
    availableTimes: {
      "0": [
        { from: "08:00", to: "09:00" },
        { from: "10:30", to: "11:30" },
      ],
      "2": [{ from: "02:00", to: "03:00" }],
      "4": [
        { from: "12:00", to: "13:00" },
        { from: "14:00", to: "15:00" },
      ],
      "5": [{ from: "16:00", to: "17:00" }],
      "6": [{ from: "18:00", to: "19:00" }],
    },
  },
  {
    id: 3,
    name: "علي الأحمد",
    rating: 3,
    imageUrl: "/muslim.png",
    availableTimes: {
      "1": [
        { from: "09:00", to: "10:00" },
        { from: "13:00", to: "14:00" },
      ],
      "3": [{ from: "11:00", to: "12:00" }],
      "4": [{ from: "16:00", to: "17:00" }],
      "5": [
        { from: "18:00", to: "19:00" },
        { from: "20:00", to: "21:00" },
      ],
    },
  },
  {
    id: 4,
    name: "فاطمة الزهراء",
    rating: 4.5,
    imageUrl: "/muslim.png",
    availableTimes: {
      "0": [{ from: "07:00", to: "08:00" }],
      "2": [
        { from: "10:00", to: "11:00" },
        { from: "15:00", to: "16:00" },
      ],
      "4": [
        { from: "09:00", to: "10:00" },
        { from: "14:00", to: "15:00" },
      ],
      "6": [
        { from: "12:00", to: "13:00" },
        { from: "18:00", to: "19:00" },
      ],
    },
  },
  {
    id: 5,
    name: "محمد الدوسري",
    rating: 3.5,
    imageUrl: "/muslim.png",
    availableTimes: {
      "1": [
        { from: "11:00", to: "12:00" },
        { from: "13:00", to: "14:00" },
      ],
      "3": [
        { from: "08:00", to: "09:00" },
        { from: "15:00", to: "16:00" },
      ],
      "5": [{ from: "09:00", to: "10:00" }],
    },
  },
  {
    id: 6,
    name: "نورة الشهري",
    rating: 4,
    imageUrl: "/muslim.png",
    availableTimes: {
      "0": [
        { from: "07:00", to: "08:00" },
        { from: "16:00", to: "17:00" },
      ],
      "2": [
        { from: "11:00", to: "12:00" },
        { from: "13:00", to: "14:00" },
      ],
      "3": [{ from: "08:00", to: "09:00" }],
      "4": [
        { from: "09:00", to: "10:00" },
        { from: "15:00", to: "16:00" },
      ],
      "6": [{ from: "12:00", to: "13:00" }],
    },
  },
  {
    id: 7,
    name: "عبد الرحمن السبيعي",
    rating: 5,
    imageUrl: "/muslim.png",
    availableTimes: {
      "1": [
        { from: "10:00", to: "11:00" },
        { from: "14:00", to: "15:00" },
      ],
      "3": [
        { from: "09:00", to: "10:00" },
        { from: "13:00", to: "14:00" },
      ],
      "4": [
        { from: "11:00", to: "12:00" },
        { from: "16:00", to: "17:00" },
      ],
      "6": [{ from: "08:00", to: "09:00" }],
    },
  },
];

const StepThree = ({
  prevStep,
  setCurrentStep,
  selectedCategory,
  selectedConsultationType,
  selectedDate,
  setSelectedDate,
}) => {
  const [filteredLawyers, setFilteredLawyers] = useState(dummyLawyers);
  const [selectedLawyer, setSelectedLawyer] = useState({});
  const [files, setFiles] = useState<Record<string, any>>({});
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationDuration, setConsultationDuration] = useState<string>("");
  const [selectedDateError, setSelectedDateError] = useState<string | null>(
    null,
  );
  const [filesError, setFilesError] = useState<string | null>(null);
  const [consultationDurationError, setConsultationDurationError] = useState<
    string | null
  >(null);

  const handleDurationClick = (duration: React.SetStateAction<string>) => {
    setConsultationDuration(duration);
    setConsultationDurationError(null);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setFilteredLawyers(
        filteredLawyers.filter(lawyer =>
          lawyer.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredLawyers(filteredLawyers);
    }
  };

  const handleFilter = (filter: string) => {
    console.log("تصفية:", filter);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const requiredFiles = ["file1", "file2", "file3"];
    const missingFiles = requiredFiles.filter(
      file => !files[file] || files[file] === "",
    );

    if (!consultationDuration) {
      setConsultationDurationError("برجاء اختيار مدة الاستشارة");
      return;
    }
    if (!selectedDate) {
      setSelectedDateError("برجاء اختيار تاريخ الاستشارة");
      return;
    }
    if (missingFiles.length > 0) {
      setFilesError(
        `يرجى إرفاق جميع المستندات المطلوبة: ${missingFiles.join(", ")}`,
      );
      setTimeout(() => {
        setFilesError(null);
      }, 2000);
      return;
    } else {
      setFilesError(null);

      if (!selectedTime) {
        alert("يرجى اختيار موعد لذى المحامي الذي تفضل");
        return;
      }

      if (!consultationDurationError && !selectedDateError) {
        console.log("Form Data:", {
          selectedLawyer,
          selectedTime,
          consultationDuration,
          selectedDate,
          files,
        });
        setSelectedLawyer({});
        setSelectedTime(null);
        setConsultationDuration("");
        setSelectedDate(null);
        setFiles({});
        setCurrentStep(0);
      }
    }
  };

  const getDayOfWeek = (date: Date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : dayOfWeek.toString();
  };

  const dayNames = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  return (
    <main className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 rounded-md bg-background px-10 py-8 text-text-light">
        <div className="flex items-center gap-6">
          <span>{selectedCategory.icon}</span>
          <div className="flex flex-col gap-4">
            <span className="text-md text-secondary-normal">
              {selectedCategory.title}
            </span>
            <div className="flex items-center gap-8">
              <span className="text-xl">{selectedConsultationType.name}</span>
              <span className="text-lg">
                {selectedConsultationType.cost} ريال
              </span>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 rounded-md bg-background px-16 py-10">
          <div className="flex flex-col gap-4 text-text-light">
            <div className="flex gap-2">
              {" "}
              <h3 className="text-md">اختر مدة الاستشارة</h3>{" "}
              {consultationDurationError ? (
                <small className={"mr-2 text-sm text-error"}>
                  {consultationDurationError}
                </small>
              ) : (
                <small className={"mr-2 text-sm opacity-0"}>No Error</small>
              )}{" "}
            </div>
            <div className="flex gap-6">
              {["15 دقيقة", "30 دقيقة", "45 دقيقة", "60 دقيقة"].map(
                (duration, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-sm bg-background px-4 py-2 text-center text-[14px] font-light ${
                      consultationDuration === duration
                        ? "bg-primary-normal"
                        : ""
                    }`}
                    onClick={() => handleDurationClick(duration)}
                  >
                    {duration}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="mt-[-10px] flex flex-col gap-2">
            {selectedDateError ? (
              <small className={"mr-2 text-sm text-error"}>
                {selectedDateError}
              </small>
            ) : (
              <small className={"mr-2 text-sm opacity-0"}>No Error</small>
            )}
            <DateInput
              setSelectedDateError={setSelectedDateError}
              selectedDateError={selectedDateError}
              selected={selectedDate}
              setSelected={setSelectedDate}
            />
          </div>
          <div className="flex flex-col text-text-light">
            <div className="flex items-center gap-4">
              <h3 className="text-md">الملفات المطلوبة</h3>
              {filesError ? (
                <small className={"text-md text-error"}>{filesError}</small>
              ) : (
                <small className={"text-md opacity-0"}>No Error</small>
              )}
            </div>
            {["file1", "file2", "file3"].map((file, index) => (
              <FileInput
                key={index}
                name={file}
                labelText={`ارفع ${file}`}
                accept=".pdf,.doc,.docx,.jpeg,.jpg,.webp,.png"
                fileName={files[file]}
                setFileName={fileName =>
                  setFiles(prev => ({ ...prev, [file]: fileName }))
                }
              />
            ))}
          </div>
        </div>
        {selectedDate && (
          <div className="flex flex-col gap-10 text-text-light">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">اختر المحامي</h3>
              <SearchFilterBar
                onSearch={handleSearch}
                onFilter={handleFilter}
                suggestions={dummyLawyers}
                placeholder="ابحث عن محاميك"
                showSuggestions={false}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
              {filteredLawyers.map(lawyer => {
                const dayOfWeek = getDayOfWeek(selectedDate);
                if (
                  !dayOfWeek ||
                  !lawyer.availableTimes[dayOfWeek] ||
                  lawyer.availableTimes[dayOfWeek].length === 0
                ) {
                  return null;
                }
                const availableTimes = lawyer.availableTimes[dayOfWeek];
                return (
                  <div
                    key={lawyer.id}
                    className="flex flex-col gap-6 rounded-md bg-background px-8 py-6"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={lawyer.imageUrl}
                        alt={lawyer.name}
                        height={115}
                        width={154}
                        className="rounded-[2.5px]"
                      />
                      <div className="">
                        <h4 className="text-[24px]">{lawyer.name}</h4>
                        <div className="flex gap-1 text-2xl text-secondary-normal">
                          {"★".repeat(lawyer.rating)}
                          {"☆".repeat(5 - lawyer.rating)}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg">احجز موعد</h4>
                    <h4 className="text-lg">{dayNames[parseInt(dayOfWeek)]}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3">
                      {availableTimes.map((time, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer rounded-sm border p-2 text-center text-sm ${
                            selectedTime === time
                              ? "border-input-bg bg-input-bg"
                              : "border-secondary-normal"
                          }`}
                          onClick={() => {
                            handleTimeClick(time);
                            setSelectedLawyer(lawyer);
                          }}
                        >
                          {`من ${time.from} إلى ${time.to}`}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-between gap-8">
          <button
            type="button"
            onClick={prevStep}
            className="flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm border-2 border-secondary-normal p-4 text-md text-secondary-normal hover:bg-background"
          >
            السابق
          </button>
          <Cta text="انتقل إلى بوابة الدفع" onClick={onSubmit} type="submit" />
        </div>
      </form>
    </main>
  );
};

export default StepThree;

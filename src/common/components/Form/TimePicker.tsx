import useTimePickerValidation from "../../hooks/useTimePickerValidation";
import React, { useState, useEffect, useRef } from "react";
import useTimeSlots from "../../hooks/useTimeSlots";
import { useFormContext } from "react-hook-form";
import TimeSlot from "./TimeSlot";
import type {
  ReservedPeriod,
  TimeSlot as TimeSlotType,
} from "../../../types/FormTypes.types.ts";

type TimeSlotUpdaterFunction = (
  prev: Record<string, TimeSlotType[]>,
) => Record<string, TimeSlotType[]>;

type Props = {
  labelText: string;
  timePickerError?: string;
  error?: string;
  setTimePickerError?: (value: string) => void;
  reservedPeriods: Record<string, ReservedPeriod[]>;
  setReservedPeriods: (
    value: (
      prev: Record<string, ReservedPeriod[]>,
    ) => Record<string, ReservedPeriod[]>,
  ) => void;
  timeSlots: Record<string, TimeSlotType[]>;
  setTimeSlots: (value: TimeSlotUpdaterFunction) => void;
};

const TimePicker: React.FC<Props> = ({
  error,
  labelText,
  timePickerError,
  reservedPeriods,
  timeSlots,
  setTimeSlots,
  setReservedPeriods,
  setTimePickerError,
}) => {
  const methods = useFormContext();
  const [selectedDay, setSelectedDay] = useState<string>("السبت");
  const slotContainerRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  const { addTimeSlot, removeTimeSlot, updateTimeSlot, togglePeriod } =
    useTimeSlots();
  const { validateTimeSlot, validateNoOverlap } = useTimePickerValidation(
    reservedPeriods,
    setTimePickerError!,
  );

  useEffect(() => {
    const unconfirmedSlots = timeSlots[selectedDay].filter(
      slot => !slot.confirmed,
    );
    if (unconfirmedSlots.length > 0) {
      setTimeSlots(prev => ({
        ...prev,
        [selectedDay]: prev[selectedDay].filter(
          (slot: { confirmed: boolean }) => slot.confirmed,
        ),
      }));
    }
  }, [selectedDay]);

  const handleAddTimeSlot = () => {
    if (timeSlots[selectedDay].some(slot => !slot.confirmed)) {
      setTimePickerError?.("برجاء تأكيد الموعد الحالي قبل إضافة موعد آخر!");
      return;
    }
    addTimeSlot(selectedDay, setTimeSlots);

    // Does not work, will fix it later...
    setTimeout(() => {
      scrollContainerToTop();
    }, 50);
  };

  // Does not work, will fix it later...
  function scrollContainerToTop() {
    const slotDev = slotContainerRef.current?.parentElement;

    if (slotDev) {
      console.log(slotDev);
      console.log("Current scroll position:", slotDev?.scrollTop);
    }
  }

  const handleTimeSlotChange = (
    index: number,
    field: keyof TimeSlotType,
    value: string,
  ) => {
    updateTimeSlot(selectedDay, index, field, value, setTimeSlots, timeSlots);
  };

  const handlePeriodToggle = (index: number, field: keyof TimeSlotType) => {
    togglePeriod(selectedDay, index, field, setTimeSlots, timeSlots);
  };

  const handleRemoveTimeSlot = (index: number) => {
    removeTimeSlot(selectedDay, index, setTimeSlots, setReservedPeriods);
  };

  const confirmTimeSlot = (index: number) => {
    const slot = timeSlots[selectedDay][index];

    if (!validateTimeSlot(selectedDay, slot)) {
      return;
    }

    if (!validateNoOverlap(selectedDay, slot)) {
      return;
    }

    const updatedTimeSlots = [...timeSlots[selectedDay]];
    updatedTimeSlots[index].confirmed = true;
    setTimeSlots(prev => ({
      ...prev,
      [selectedDay]: updatedTimeSlots,
    }));

    setReservedPeriods(prev => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], { from: slot.from, to: slot.to }],
    }));

    methods.setValue("slotsConfirmed", checkIfAnySlotConfirmed(), {
      shouldValidate: true,
    });
  };

  function checkIfAnySlotConfirmed() {
    return Object.values(timeSlots).some(slots =>
      slots.some(slot => slot.confirmed),
    );
  }

  return (
    <div className="scrollbar relative my-4 flex w-full flex-col justify-center gap-2 overflow-auto">
      <label className="text-md text-white">{labelText}</label>
      {timePickerError ? (
        <small className="mr-2 text-sm text-error">{timePickerError}</small>
      ) : (
        <small className="text-sm opacity-0">
          لا مشاكل، يمكنك إنشاء الحساب الآن
        </small>
      )}
      <div
        className={`mx-auto w-full rounded-sm border bg-[#334F6980] p-6 ${
          timePickerError || error ? "border-error" : "border-[#334F6980]"
        }`}
      >
        <div className="scrollbar mb-8 flex flex-shrink-0 items-center self-stretch overflow-auto">
          {daysOfWeek.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`${
                selectedDay === day
                  ? "border-b-2 border-b-secondary-normal bg-[#395875] text-text-light"
                  : "text-[#FBFDFF]"
              } flex items-center justify-center rounded-tl-xs rounded-tr-xs px-2`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="scrollbar mb-4 flex max-h-[121px] min-h-0 flex-col-reverse items-start gap-4 overflow-y-auto rounded-sm">
          {timeSlots[selectedDay]?.map((slot, index) => (
            <TimeSlot
              key={index}
              slot={slot}
              index={index}
              selectedDay={selectedDay}
              handlePeriodToggle={handlePeriodToggle}
              handleTimeSlotChange={handleTimeSlotChange}
              handleRemoveTimeSlot={handleRemoveTimeSlot}
              confirmTimeSlot={confirmTimeSlot}
              slotContainerRef={slotContainerRef}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddTimeSlot}
          className="flex items-center justify-center gap-2 text-[#E4AC66]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Add Time Slot</title>
            <g id="plus-circle">
              <path
                id="Vector"
                d="M8 12H16M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#E4AC66"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          إضافة موعد
        </button>
      </div>
      {error ? (
        <small className="mr-2 text-sm text-error">{error}</small>
      ) : (
        <small className="text-sm opacity-0">
          لا مشاكل، يمكنك إنشاء الحساب الآن
        </small>
      )}
    </div>
  );
};

export default TimePicker;

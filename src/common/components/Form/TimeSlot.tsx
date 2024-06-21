import { useFormContext } from "react-hook-form";
import type { TimeSlot as TimeSlotType } from "../../../types/FormTypes.types.ts";
import React from "react";

type Props = {
  slot: TimeSlotType;
  index: number;
  selectedDay: string;
  handlePeriodToggle: (index: number, field: keyof TimeSlotType) => void;
  handleTimeSlotChange: (
    index: number,
    field: keyof TimeSlotType,
    value: string,
  ) => void;
  handleRemoveTimeSlot: (index: number) => void;
  confirmTimeSlot: (index: number, methods: any) => void;
  slotContainerRef: React.RefObject<HTMLDivElement>;
};

const TimeSlot: React.FC<Props> = ({
  slot,
  index,
  handlePeriodToggle,
  handleTimeSlotChange,
  handleRemoveTimeSlot,
  confirmTimeSlot,
  slotContainerRef,
}) => {
  const methods = useFormContext();

  const renderTimeOptions = () => {
    const options: JSX.Element[] = [];
    options.push(
      <option key="00:00" value="00:00" disabled>
        0:00
      </option>,
    );
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const hourFormatted = hour.toString().padStart(2, "0");
        const minuteFormatted = minute.toString().padStart(2, "0");
        const value = `${hourFormatted}:${minuteFormatted}`;
        options.push(
          <option key={value} value={value}>
            {value}
          </option>,
        );
      }
    }
    return options;
  };

  return (
    <div
      className="flex items-center justify-around gap-2 self-stretch bg-[#334F6980] px-3 py-1"
      ref={slotContainerRef}
    >
      <span className="text-white">من</span>
      <div className="flex rounded-sm bg-[#334F6980] text-text-light">
        <button
          type="button"
          onClick={() => handlePeriodToggle(index, "from")}
          className={`rounded-br-sm rounded-tr-sm p-2 ${
            slot.from.period === "AM" ? "bg-[#395875]" : ""
          }`}
          disabled={slot.confirmed}
        >
          AM
        </button>
        <button
          type="button"
          onClick={() => handlePeriodToggle(index, "from")}
          className={`rounded-bl-sm rounded-tl-sm p-2 ${
            slot.from.period === "PM" ? "bg-[#395875]" : ""
          }`}
          disabled={slot.confirmed}
        >
          PM
        </button>
      </div>
      <div className="relative flex items-center">
        <select
          value={`${slot.from.hour}:${slot.from.minute.padStart(2, "0")}`}
          onChange={e => handleTimeSlotChange(index, "from", e.target.value)}
          className="scrollbar cursor-pointer appearance-none rounded-sm bg-[#395875] p-2 pl-6 text-white"
          disabled={slot.confirmed}
        >
          {renderTimeOptions()}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-10 flex items-center px-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>See Options</title>
            <path
              d="M7 15L12 20L17 15M7 9L12 4L17 9"
              stroke="#E6E6E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span className="text-white">إلى</span>
      <div className="flex rounded-sm bg-[#334F6980] text-text-light">
        <button
          type="button"
          onClick={() => handlePeriodToggle(index, "to")}
          className={`rounded-br-sm rounded-tr-sm p-2 ${
            slot.to.period === "AM" ? "bg-[#395875]" : ""
          }`}
          disabled={slot.confirmed}
        >
          AM
        </button>
        <button
          type="button"
          onClick={() => handlePeriodToggle(index, "to")}
          className={`rounded-bl-sm rounded-tl-sm p-2 ${
            slot.to.period === "PM" ? "bg-[#395875]" : ""
          }`}
          disabled={slot.confirmed}
        >
          PM
        </button>
      </div>
      <div className="relative flex items-center">
        <select
          value={`${slot.to.hour}:${slot.to.minute.padStart(2, "0")}`}
          onChange={e => handleTimeSlotChange(index, "to", e.target.value)}
          className="scrollbar cursor-pointer appearance-none rounded-sm bg-[#395875] p-2 pl-6 text-white"
          disabled={slot.confirmed}
        >
          {renderTimeOptions()}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-10 flex items-center px-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>See Options</title>
            <path
              d="M7 15L12 20L17 15M7 9L12 4L17 9"
              stroke="#E6E6E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-1">
        <button type="button" onClick={() => handleRemoveTimeSlot(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Remove Time Spot</title>
            <path
              d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#E6E6E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {slot.confirmed ? null : (
          <button type="button" onClick={() => confirmTimeSlot(index, methods)}>
            <svg
              height="24px"
              width="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Confirm Spot</title>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#E4AC66"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M9 12.5l2.5 2.5L15 10"
                stroke="#E4AC66"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;

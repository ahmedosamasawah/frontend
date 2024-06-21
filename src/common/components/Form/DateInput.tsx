import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid #E4AC66;
    border-radius: 1rem;
    background-color: #E4AC66;
    color: #002343;
  }
  .my-selected:hover:not([disabled]) { 
    // color: blue;
    border-color: #E4AC66;
    background-color: #E4AC66;
    border-radius: 1rem;
  }
  .my-today { 
  border-color: #E4AC66;
  //   background-color: #E4AC66;
    // font-weight: bold;
    // font-size: 140%;
    border-radius: 50%;
    // color: #002343; 
    // background-color: #E4AC66;
  }
`;

const DateInput = ({
  selected,
  setSelected,
  setSelectedDateError,
  selectedDateError,
}) => {
  const [pickerState, setPickerState] = useState(false);
  const today = new Date();
  const afterDate = new Date();
  afterDate.setDate(afterDate.getDate() + 30);
  const disabledDays = {
    before: today,
    after: afterDate,
  };

  return (
    <div className={`relative`}>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded-sm border bg-[#395875] p-4 ${
          selectedDateError ? "border-error" : "border-input-strock"
        }`}
        onClick={() => setPickerState(!pickerState)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
            stroke="#E6E6E7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={"text-base text-text-light"}>
          {selected
            ? `${format(selected, "PP")} - ${selected.toLocaleDateString(
                "ar-EG",
                { weekday: "long" },
              )}`
            : "اختر تاريخ الاستشارة"}
        </span>
      </div>
      <div className={"absolute top-full w-full"}>
        {pickerState && (
          <>
            <style>{css}</style>
            <DayPicker
              disabled={disabledDays}
              showOutsideDays
              fixedWeeks
              mode="single"
              selected={selected}
              onSelect={date => {
                setSelected(date);
                setPickerState(false);
                setSelectedDateError(null);
              }}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
              modifiersStyles={{
                disabled: { fontSize: "75%" },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DateInput;

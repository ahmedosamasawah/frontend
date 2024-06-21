import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  labelText: string;
  list?: Option[];
  error?: string;
  selectedOption?: string | null;
  setSelectedOption?: (value: string | null) => void;
  register?: {
    onChange: (event: {
      target: {
        name: string;
        value: { label: string | undefined; value: string | undefined }[];
      };
    }) => void;
    name: string;
    ref: React.Ref<HTMLInputElement>;
  };
  optionsOpen?: boolean;
  setOptionsOpen?: () => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  labelText,
  list,
  error,
  selectedOption,
  setSelectedOption,
  register,
  optionsOpen,
  setOptionsOpen,
}) => {
  const { onChange, name, ref } = register || {};

  const handleOptionSelect = (index: number) => {
    const option = list?.[index];
    if (option) {
      setSelectedOption?.(option.value);
      setOptionsOpen?.();
      onChange?.({
        target: {
          name: name || "",
          value: [{ value: option?.value, label: option?.label }],
        },
      });
    }
  };

  return (
    <div className="relative">
      {error ? (
        <small className={"mb-1 mr-2 text-sm text-error"}>
          {error === "Expected array, received string" ||
          error === "Expected array, received object"
            ? "الرجاء تحديد خيار!"
            : error}
        </small>
      ) : (
        <small className={"mb-1 mr-2 text-sm opacity-0"}>No Error</small>
      )}
      <div
        className={`mt-2 flex h-14 w-full cursor-pointer items-center justify-between rounded-sm border-[1.5px] bg-[#395875] p-4 text-base font-normal text-white ${
          error ? "border-error" : "border-input-strock"
        }`}
        onClick={() => setOptionsOpen?.()}
      >
        {selectedOption !== null
          ? list?.find(option => option.value === selectedOption)?.label
          : labelText}
        {optionsOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <title>Open Options</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <title>Close Options</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>
      {optionsOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 flex w-full flex-col gap-1 rounded-md bg-[#395875] p-2">
          {list?.map((item, i) => (
            <p
              key={i}
              className={`cursor-pointer px-4 py-2 text-md text-white ${
                selectedOption === item.value ? "bg-[#2b4b6f]" : ""
              } rounded-sm`}
              onClick={() => handleOptionSelect(i)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
      <input
        type="hidden"
        name={name}
        value={
          selectedOption
            ? JSON.stringify([
                {
                  value: selectedOption,
                  label: list?.find(option => option.value === selectedOption)
                    ?.label,
                },
              ])
            : JSON.stringify([])
        }
        ref={ref}
      />
    </div>
  );
};

export default FormSelect;

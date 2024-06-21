import React, { type HTMLInputTypeAttribute, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  name?: string;
  type?: HTMLInputTypeAttribute;
  labelText: string;
  value?: string;
  placeholder: string | undefined;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
};

const TextInput = ({
  name,
  type,
  labelText,
  value,
  placeholder,
  changeHandler,
  error,
  disabled,
  register,
}: Props) => {
  const [passState, setPassState] = useState(false);
  // const [errorState, setErrorState] = useState(false);
  const togglePasswordStateHandler = () => {
    setPassState(!passState);
  };

  if (type !== "email" && passState) {
    type = "text";
  }

  return (
    <div className={"flex flex-col justify-center gap-2"}>
      <label htmlFor={name} className={"text-md text-text-light"}>
        {labelText}
      </label>
      {
        <div className={"relative"}>
          {type === "tel" ? (
            <div
              dir="ltr"
              className={`flex items-center overflow-hidden rounded-sm border-[1.5px] bg-[#395875] ${
                error ? "border-error" : "border-input-strock"
              }`}
            >
              <span className="select-none pl-4 pr-1 text-text-light">
                +966
              </span>
              <input
                className={`w-full rounded-sm bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4`}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={changeHandler}
                placeholder={placeholder}
                disabled={disabled}
                {...register}
                onBlur={() => error && error}
              />
            </div>
          ) : (
            <input
              className={`w-full rounded-sm border-[1.5px] bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4 ${
                error ? "border-error" : "border-input-strock"
              } `}
              type={type}
              name={name}
              id={name}
              value={value}
              onChange={changeHandler}
              placeholder={placeholder}
              disabled={disabled}
              {...register}
              // onFocus={() =>}
              // onBlur={() => (error ? setErrorState(true) : setErrorState(false))}
              onBlur={() => error && error}
            />
          )}
          {error ? (
            <small className={"mr-2 text-sm text-error"}>{error}</small>
          ) : (
            <small className={"mr-2 text-sm opacity-0"}>No Error</small>
          )}
          {type === "password" && !passState && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-5 top-1/3 h-6 w-6 translate-y-[-50%] cursor-pointer text-text-light"
              onClick={togglePasswordStateHandler}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
          {passState && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-5 top-1/3 h-6 w-6 translate-y-[-50%] cursor-pointer text-text-light"
              onClick={togglePasswordStateHandler}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </div>
      }
    </div>
  );
};

export default TextInput;

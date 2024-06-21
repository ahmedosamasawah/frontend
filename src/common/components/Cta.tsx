import React from "react";

type Props = {
  text: React.ReactNode;
  type: "submit" | "button";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Cta = ({ text, onClick, type, disabled }: Props) => {
  if (type === "submit") {
    return (
      <button
        type="submit"
        disabled={disabled}
        onSubmit={onClick}
        className={
          "flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm bg-secondary-normal p-4 text-md hover:bg-secondary-normal-hover"
        }
      >
        {text}
      </button>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        "flex w-full cursor-pointer items-center justify-center place-self-center self-stretch rounded-sm bg-secondary-normal p-4 text-md hover:bg-secondary-normal-hover"
      }
    >
      {text}
    </button>
  );
};

export default Cta;

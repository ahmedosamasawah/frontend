import { useState } from "react";

type Props = {
  name: string;
  labelText: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
};

const TextArea = ({
  name,
  labelText,
  value,
  changeHandler,
  placeholder,
  error,
  disabled,
}: Props) => {
  const [errorState, setErrorState] = useState(false);
  return (
    <div className={"flex flex-col justify-center gap-4"}>
      <label htmlFor={name} className={"text-md text-text-light"}>
        {labelText}
      </label>
      <textarea
        className={`resize-none rounded-sm border-[1.5px] bg-[#395875] p-4 text-text-light-hover outline-0 ${
          errorState ? "border-error" : "border-input-strock"
        } `}
        name={name}
        id={name}
        cols={30}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        disabled={disabled}
        onBlur={() => (error ? setErrorState(true) : setErrorState(false))}
      />
      {errorState && (
        <small className={"mr-2 text-secondary-normal/30"}>{error}</small>
      )}
    </div>
  );
};

export default TextArea;

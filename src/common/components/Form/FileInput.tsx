import { ChangeEvent, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  name: string;
  labelText: string;
  accept?: string;
  error?: string;
  register?: UseFormRegisterReturn & {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  fileName: string;
  setFileName: (fileName: string) => void;
}

const FileInput: FC<FileInputProps> = ({
  name,
  labelText,
  accept,
  error,
  register,
  fileName,
  setFileName,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      setFileName?.(fileList[0].name);
    } else {
      setFileName?.("");
    }

    if (register && register.onChange) {
      register.onChange(event);
    }
  };

  return (
    <div className="mb-2 flex flex-col justify-center">
      {error ? (
        <small className={"mb-1 mr-2 text-sm text-error"}>{error}</small>
      ) : (
        <small className={"mb-1 mr-2 text-sm opacity-0"}>No Error</small>
      )}
      <label
        htmlFor={name}
        className={`${
          error ? "border-error" : "border-input-strock"
        } line-clamp-1 flex h-14 w-full cursor-pointer items-center gap-2 rounded-sm border-[1.5px] bg-[#395875] p-4 text-white`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <title>Upload Image</title>
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
            stroke="#E6E6E7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {fileName ? fileName : labelText}
        <input
          type="file"
          name={name}
          id={name}
          accept={accept}
          className="hidden"
          {...register}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileInput;

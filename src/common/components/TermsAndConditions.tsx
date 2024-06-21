import Link from "next/link";
import React from "react";

type Props = {
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
};

const TermsAndConditions: React.FC<Props> = ({
  termsAccepted,
  setTermsAccepted,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="mt-3 flex items-center text-text-light">
      <div className="relative">
        <input
          id="link-checkbox"
          type="checkbox"
          className="absolute h-6 w-6 cursor-pointer opacity-0"
          checked={termsAccepted}
          onChange={handleCheckboxChange}
        />
        <div className="bg-gray-100 border-gray-300 flex h-6 w-6 items-center justify-center rounded-[4px] border-2 checked:border-primary-normal">
          <svg className="text-blue-600 hidden" viewBox="0 0 24 24">
            <title>Checkbox</title>
            <path
              fill="currentColor"
              d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"
            />
          </svg>
        </div>
      </div>
      <label
        htmlFor="link-checkbox"
        className="text-gray-900 dark:text-gray-300 ms-2 text-sm font-medium"
      >
        أوافق على
        <Link
          href={"/terms"}
          className="text-secondary-normal hover:text-secondary-normal-hover hover:underline"
        >
          &nbsp;&nbsp;شروط الإستخدام
        </Link>
        .
      </label>
      <style jsx>{`
        input[type="checkbox"]:checked + div > svg {
          display: block;
        }
        input[type="checkbox"]:checked + div {
          border-color: #e4ac66;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;

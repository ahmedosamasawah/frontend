import { useState, useEffect } from "react";

const Alert = ({ status, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const alertStyles = `mx-w-sm rounded-[4px] p-6 justify-between max-w-[496px] ${
    status === "greatUser"
      ? "bg-[#334F6980] text-white"
      : status === "success"
        ? "bg-[#ECF9F5] text-success"
        : "bg-[#FDEEEE] text-[#E92727]"
  }`;

  return (
    <div className={alertStyles}>
      <div className="mb-3 flex items-center justify-between">
        {/* user message */}
        {status === "greatUser" && <h2>ريان 👋 ، أهلًا وسهلًا بك.</h2>}
        <button onClick={() => setIsVisible(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke={`${
                status === "greatUser"
                  ? "#fff"
                  : status === "success"
                    ? "#10B981"
                    : "#E92727"
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="text-[14px]">{message}</p>
    </div>
  );
};

export default Alert;

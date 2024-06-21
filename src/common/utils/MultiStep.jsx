const MultiStep = ({
  items,
  active,
  lawyerStep = false,
  consultation = false,
}) => {
  return (
    <div
      className={`container mx-auto flex ${
        consultation ? "justify-around" : "justify-center"
      }`}
    >
      {items.map((item, i) => {
        const isCompleted = i < active;

        return (
          <div
            key={item}
            className={"flex items-start justify-around lg:justify-center"}
          >
            <div
              className={"flex flex-col items-center text-center font-normal"}
            >
              <span
                className={`flex items-center justify-center text-[0.5rem] ${
                  consultation
                    ? "h-[32px] w-[32px] text-sm"
                    : "h-6 w-6 lg:h-12 lg:w-12 lg:text-md"
                } rounded-full border-[2px] ${
                  isCompleted
                    ? "border-secondary-normal bg-secondary-normal text-primary-normal"
                    : i === active
                      ? "border-secondary-normal bg-secondary-normal text-primary-normal"
                      : "border-white text-white"
                } `}
              >
                {i + 1}
              </span>
              <p className={"mt-2 text-sm text-white lg:mt-4"}>{item}</p>
            </div>

            {i < items.length - 1 && (
              <div
                className={`${
                  lawyerStep
                    ? "-mt-2 text-xl text-text-light lg:mt-1"
                    : "h-0.5 w-6 bg-white lg:mt-5"
                } mr-2 mt-3 opacity-0 lg:mr-4 lg:grow lg:opacity-100`}
              >
                {lawyerStep && "."}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiStep;

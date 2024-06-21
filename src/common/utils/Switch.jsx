const Switch = ({ active, firstTitle, secondTitle, switchHandler }) => {
  const className = "bg-background rounded-t-sm md:rounded-t-md";
  return (
    <div
      className={`grid grid-cols-2 border-b border-secondary-normal text-base font-extralight text-white lg:border-b-[3px] lg:text-lg lg:font-normal`}
    >
      <span
        className={`${active && className} cursor-pointer py-4 text-center`}
        onClick={() => switchHandler(true)}
      >
        {firstTitle}
      </span>
      <span
        className={`${
          !active && className
        } cursor-pointer py-4 text-center lg:py-4`}
        onClick={() => switchHandler(false)}
      >
        {secondTitle}
      </span>
    </div>
  );
};

export default Switch;

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="primary-normal"
        className="animate-spin"
      >
        <path
          d="M22 2.10168V10.1017M22 34.1017V42.1017M7.86035 7.96167L13.5204 13.6217M30.4805 30.5817L36.1405 36.2417M2 22.1017H10M34 22.1017H42M7.86035 36.2417L13.5204 30.5817M30.4805 13.6217L36.1405 7.96167"
          stroke="#e4ac66"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="sr-only">Loading...</p>
    </div>
  );
};

export default Loading;

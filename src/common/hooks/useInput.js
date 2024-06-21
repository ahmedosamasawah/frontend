import { useState, useEffect } from "react";

const useInput = (regex, errorMessage) => {
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === "") {
      setIsValid(false);
      setError(null);
    } else {
      const valid = regex.test(value);
      setIsValid(valid);
      setError(valid ? null : errorMessage);
    }
  }, [value, regex, errorMessage]);

  return { value, setValue, isValid, error, setError };
};

export default useInput;

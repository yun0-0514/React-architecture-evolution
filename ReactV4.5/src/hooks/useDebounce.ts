import { useState, useEffect } from "react";
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);
  return debounceValue;
};

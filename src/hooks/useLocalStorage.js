import { useState } from "react";

export default function useLocalStorage(
  key,
  defaultValue
) {
  const [value, setValue] = useState(() => {
    const item =
      localStorage.getItem(key);

    return item
      ? JSON.parse(item)
      : defaultValue;
  });

  const updateValue = (newValue) => {
    setValue(newValue);

    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [value, updateValue];
}
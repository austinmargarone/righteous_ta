"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark">(
    "color-theme",
    "dark", // Default to dark
  );

  useEffect(() => {
    const className = "dark";
    const htmlClass = window.document.documentElement.classList; // Change from body to html

    if (colorMode === "dark") {
      htmlClass.add(className);
    } else {
      htmlClass.remove(className);
    }
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export default useColorMode;

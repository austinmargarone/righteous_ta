"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark" | null>(
    "color-theme",
    null,
  );

  useEffect(() => {
    // On first load: if no saved preference, use system preference
    if (colorMode === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const initialMode = prefersDark ? "dark" : "light";
      setColorMode(initialMode);
      return;
    }

    // Apply saved preference
    const className = "dark";
    const bodyClass = window.document.body.classList;

    if (colorMode === "dark") {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [colorMode, setColorMode]);

  return [colorMode ?? "dark", setColorMode] as const; // fallback to dark if null
};

export default useColorMode;

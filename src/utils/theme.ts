// useTheme.ts
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { choosenTheme } from "../store/storeTheme";

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useRecoilState(choosenTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
};

export default useTheme;

import { atom } from "recoil";

let defTheme = "light";
const prevTheme = localStorage.getItem("theme");
if (prevTheme) {
  defTheme = prevTheme;
} else {
  defTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const choosenTheme = atom({
  key: "choosenTheme",
  default: defTheme,
});

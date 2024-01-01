import { atom } from "recoil";
import { ForecastRoot } from "../types";

// Forecast 5 days atom
export const forecastState = atom<ForecastRoot>({
  key: "forecastState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

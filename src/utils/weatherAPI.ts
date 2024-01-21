import { useFetch } from "./useFetch";
import { DataFetchingResult, ForecastRoot, Root } from "../types";

export const useWeatherAndForecast = (city: string) => {
  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
  }: DataFetchingResult<Root | null> = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`
  );

  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
  }: DataFetchingResult<ForecastRoot> = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`
  );

  const combinedData = {
    weather: weatherData,
    forecast: forecastData,
    loading: weatherLoading || forecastLoading,
    error: weatherError || forecastError,
  };

  return combinedData;
};

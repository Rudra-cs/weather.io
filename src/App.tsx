import AppBar from "./components/AppBar/AppBar";
import WeatherSection from "./components/CurrentWeather/WeatherSection";
import useTheme from "./utils/theme";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { weather } from "./store/weatherStore";
import { forecastState } from "./store/forecastStore";
import { useWeatherAndForecast } from "./utils/weatherAPI";

const App = (): JSX.Element => {
  const [theme] = useTheme();
  const [weatherdata, setWeatherData] = useRecoilState(weather);
  const [forecastdata, setForecastData] = useRecoilState(forecastState);
  const [city] = useState<string>("Bhubaneswar");

  const {
    weather: data,
    forecast: forecast,
    loading,
    error,
  } = useWeatherAndForecast(city);

  useEffect(() => {
    if (data && forecast) {
      setWeatherData(data);
      setForecastData(forecast);
    }
  }, [data, setWeatherData, forecast, setForecastData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error fetching data. Please try again later.</h1>;
  }

  return (
    <div className={`${theme} select-none h-screen `}>
      {weatherdata && forecastdata ? (
        <div className=" dark:bg-slate-800 max-w-screen-xl py-3 px-3 md:py-5 sm:px-6 justify-center items-center mx-auto">
          <AppBar />
          <WeatherSection />
        </div>
      ) : (
        <h1>404 error occured</h1>
      )}
    </div>
  );
};

export default App;

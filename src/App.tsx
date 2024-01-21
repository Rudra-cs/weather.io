// import AppBar from "./components/AppBar/AppBar";
// import WeatherSection from "./components/CurrentWeather/WeatherSection";
import useTheme from "./utils/theme";
import { Suspense, lazy, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { weather } from "./store/weatherStore";
import { forecastState } from "./store/forecastStore";
import { useWeatherAndForecast } from "./utils/weatherAPI";
import Loader from "./components/Loader";
// Lazy load the AppBar component
const LazyAppBar = lazy(() => import("./components/AppBar/AppBar"));

// Lazy load the WeatherSection component
const LazyWeatherSection = lazy(
  () => import("./components/CurrentWeather/WeatherSection")
);

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
    return <Loader />;
  }

  if (error) {
    return <h1>Error fetching data. Please try again later.</h1>;
  }

  return (
    <div
      className={`${theme} dark:bg-slate-800 select-none h-screen overflow-auto`}
    >
      {weatherdata && forecastdata ? (
        <div className="  max-w-screen-xl py-3 px-3 md:py-5 sm:px-6 justify-center items-center mx-auto">
          <Suspense fallback={<Loader />}>
            <LazyAppBar />
            <LazyWeatherSection />
          </Suspense>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;

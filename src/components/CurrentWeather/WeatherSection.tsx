import { useRecoilValue } from "recoil";
import Card from "./Card";
import HourlyForecastCard from "./HourlyForecastCard";
import WeatherCard from "./WeatherCard";
import { weather } from "../../store/weatherStore";
import { useConvertTimeHours } from "../../utils/useConvertTime";

const WeatherSection = () => {
  const weatherData = useRecoilValue(weather);

  return (
    <div className="head">
      <h1 className="my-10 text-3xl font-base ">Today Overview</h1>
      <div className="flex justify-between flex-wrap gap-x-2">
        <div className="w-full sm:w-[49%] md:w-[49%] xl:w-[25%] mb-3">
          <WeatherCard />
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] xl:w-[25%]  bg-slate-50">
          <Card
            image="./animated/wind-speed"
            property="Wind Speed"
            value={weatherData.wind.speed}
            units="km/h"
          />
          <Card
            image="./animated/pressure"
            property="Pressure"
            value={weatherData.main.pressure}
            units="hPa"
          />
          <Card
            image="./animated/sunrise"
            property="Sunrise"
            value={useConvertTimeHours(weatherData.sys.sunrise)}
            units=""
          />
        </div>
        <div className="w-full sm:w-[49%] sm:order-4 xl:order-none md:w-[49%] xl:w-[25%] ">
          <Card
            image="./animated/humidity"
            property="humidity"
            value={weatherData.main.humidity}
            units="%"
          />
          <Card
            image="./animated/visibility"
            property="visibility"
            value={weatherData.visibility / 1000}
            units="km"
          />
          <Card
            image="./animated/sunset"
            property="Sunset"
            value={useConvertTimeHours(weatherData.sys.sunset)}
            units=""
          />
        </div>
        <div className="w-full sm:w-[49%] md:w-[49%] xl:w-[22%] mb-3 bg-gray-50 h-full rounded-lg">
          <HourlyForecastCard />
          <HourlyForecastCard />
          <HourlyForecastCard />
          <HourlyForecastCard />
          <HourlyForecastCard />
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;

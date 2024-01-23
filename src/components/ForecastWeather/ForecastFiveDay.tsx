import React from "react";
import { useRecoilValue } from "recoil";
import { forecastState } from "../../store/forecastStore";
import { AreaChart, Card, Title } from "@tremor/react";
import ForecastCard from "./ForecastCard";
import { Link } from "react-router-dom";

interface TemperatureInfo {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  windDirection: number;
  visibility: number;
}

interface Weather {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}

const valueFormatter = function (number: number) {
  return new Intl.NumberFormat("us").format(number).toString() + " °C";
};

const ForecastFiveDay: React.FunctionComponent = () => {
  const weatherList = useRecoilValue(forecastState);
  const temperatureInfo: { [date: string]: TemperatureInfo } = {};

  weatherList.list.forEach((weather: Weather) => {
    const date = weather.dt_txt.split(" ")[0];
    const main = weather.main;
    const weatherDetails = weather.weather[0];
    const wind = weather.wind;

    if (!temperatureInfo[date]) {
      temperatureInfo[date] = {
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        pressure: main.pressure,
        humidity: main.humidity,
        description: weatherDetails.description,
        icon: weatherDetails.icon,
        windSpeed: wind.speed,
        windDirection: wind.deg,
        visibility: weather.visibility,
      };
    } else {
      temperatureInfo[date].temp_min = Math.min(
        temperatureInfo[date].temp_min,
        main.temp_min
      );
      temperatureInfo[date].temp_max = Math.max(
        temperatureInfo[date].temp_max,
        main.temp_max
      );

      temperatureInfo[date].pressure = main.pressure;
      temperatureInfo[date].humidity = main.humidity;
      temperatureInfo[date].description = weatherDetails.description;
      temperatureInfo[date].icon = weatherDetails.icon;
      temperatureInfo[date].windSpeed = wind.speed;
      temperatureInfo[date].windDirection = wind.deg;
      temperatureInfo[date].visibility = weather.visibility;
    }
  });

  const forecastData = Object.entries(temperatureInfo).map(
    ([date, tempInfo]) => {
      // Convert the date to the "DD MMM" format
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });

      return {
        date: formattedDate,
        temp: tempInfo.temp,
        temp_max: Math.round(tempInfo.temp_max),
        temp_min: Math.round(tempInfo.temp_min),
        pressure: tempInfo.pressure,
        humidity: tempInfo.humidity,
        description: tempInfo.description,
        icon: tempInfo.icon,
        windSpeed: tempInfo.windSpeed,
        windDirection: tempInfo.windDirection,
        sunrise: weatherList.city.sunrise,
        sunset: weatherList.city.sunset,
        visibility: tempInfo.visibility,
      };
    }
  );

  const graphData = Object.entries(temperatureInfo).map(([date, tempInfo]) => {
    // Convert the date to the "DD MMM" format
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    return {
      date: formattedDate,
      "Max Temp": Math.round(tempInfo.temp_max),
      "Min Temp": Math.round(tempInfo.temp_min),
    };
  });

  return (
    <div>
      <h1 className="my-10 text-3xl font-base dark:text-white font-mono">
        5-Day Forecast
      </h1>
      <div>
        {/* Graph */}
        <Card className="bg-gray-100 dark:bg-slate-900">
          <Title>Temperature over time (°C)</Title>
          <AreaChart
            className="h-72 mt-4 "
            data={graphData}
            index="date"
            yAxisWidth={50}
            categories={["Max Temp", "Min Temp"]}
            colors={["red", "indigo"]}
            showAnimation={true}
            animationDuration={2000}
            valueFormatter={valueFormatter}
          />
        </Card>
      </div>
      {/* Forecast Element Card */}
      <div className="flex flex-col my-2  bg-transparent rounded-lg">
        {forecastData.map((info) => (
          <ForecastCard weatherData={info} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <p className="dark:text-white text-slate-500 font-mono  ">
          Made with ❤ By
          <Link
            className="hover:text-blue-500 hover:dark:text-blue-500"
            to={"https://github.com/Rudra-cs"}
          >
            {" "}
            Rudra Behera.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForecastFiveDay;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { forecastState } from "../../store/forecastStore";
import { weather } from "../../store/weatherStore";

const GetLocation = () => {
  const [weatherdata, setWeatherData] = useRecoilState(weather);
  const [forecastdata, setForecastData] = useRecoilState(forecastState);

  const getWeatherAndForecast = (lat: number, lon: number) => {
    // api call
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecastData(data);
      });
  };

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  type Coordinates = { coords: { latitude: number; longitude: number } };

  function success(position: Coordinates) {
    const latitude: number = position.coords.latitude;
    const longitude: number = position.coords.longitude;

    // Make API call to OpenWeatherMap
    getWeatherAndForecast(latitude, longitude);
  }

  function error() {
    console.log("Unable to retrieve your location");
    console.log(weatherdata);
    console.log(forecastdata);
    alert("Please enable location permission!!");
  }

  return (
    <>
      <div
        className="bg-gray-100 px-4 py-3 justify-center items-center flex rounded-lg hover:scale-90 transition ease-out cursor-pointer dark:bg-slate-900"
        onClick={handleLocationClick}
      >
        <img
          className="transition ease-out hover:scale-125 dark:invert"
          src="location.svg"
          alt=""
        />
      </div>
    </>
  );
};

export default GetLocation;

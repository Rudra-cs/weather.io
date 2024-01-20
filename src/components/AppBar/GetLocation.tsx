import { useState } from "react";

const GetLocation = () => {
  type LatLong = {
    latitude: number;
    longitude: number;
  };
  const [location, setLocation] = useState<LatLong | null>(null);

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

    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
  }

  function error() {
    console.log("Unable to retrieve your location");
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
      {location?.latitude}
      {/* <div>
        {!location ? (
          <button onClick={handleLocationClick}>Get Location</button>
        ) : null}
        {location && !weather ? <p>Loading weather data...</p> : null}
        {weather ? (
          <div>
            <p>Location: {weather}</p>
            <p>Temperature: {weather} °C</p>
            <p>Weather: {weather}</p>
          </div>
        ) : null}
      </div> */}
    </>
  );
};

export default GetLocation;

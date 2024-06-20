import React, { useState } from "react";
import { MdSunny, MdCloud, MdError } from "react-icons/md"; // Material Design Icons
import { WiRain, WiHumidity, WiStrongWind } from "react-icons/wi"; // Weather Icons

const myKEY = "7ae39b780889c219c1dc9f86348111cb";

const WeatherBoard = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("karaikal");
  const [isError, setIsError] = useState(false);

  // Fetch weather data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myKEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }
      const data = await response.json();
      setIsError(false);
      setWeather(data);
    } catch (err) {
      setIsError(true);
      console.log(err.message);
    }
  };

  // Handle button click
  const handleClick = () => {
    fetchData();
  };

  // Map weather conditions to icons
  const getWeatherIcon = (condition) => {
    if (!condition) return null; // No icon if no condition

    const mainCondition = condition.toLowerCase();
    if (mainCondition.includes("clear")) return <MdSunny size={50} />;
    if (mainCondition.includes("cloud")) return <MdCloud size={50} />;
    if (mainCondition.includes("rain")) return <WiRain size={50} />;
    // Add more conditions and icons as needed

    return null; // No default icon for unknown conditions
  };

  return (
    <div className="w-board">
      {isError ? (
        <ErrorPage />
      ) : (
        <div>
          <div className="temp-weather">
            <p className="temp">{weather.main?.temp} °C</p>
            <div className="secon">
              {getWeatherIcon(weather.weather?.[0]?.main)}
              <p>{weather.weather?.[0]?.description}</p>
            </div>
          </div>
          <div className="middle-div">
            <div className="humidity">
              <WiHumidity size={40} />
              <h1>{weather.main?.humidity} %</h1>
            </div>
            <div className="wind">
              <WiStrongWind size={40} />
              <h1>{weather.wind?.speed} m/s</h1>
            </div>
          </div>
          <div className="bottum">
            <input
              type="text"
              placeholder="Search location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleClick}>Get Weather</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div>
      <MdError size={50} />
      <h1>The Location Was Wrong. Please Check!</h1>
    </div>
  );
};

export default WeatherBoard;

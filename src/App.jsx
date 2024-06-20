import React from "react";
import "./App.css";
import WeatherBoard from "./Components/WeatherBoard.jsx";

const App = () => {
  return (
    <div className="app">
      {/* <p>Weather App</p> */}
      <WeatherBoard />
    </div>
  );
};

export default App;

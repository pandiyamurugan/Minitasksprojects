import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { WiCloud, WiHumidity, WiStrongWind } from "react-icons/wi";

function App() {
  const [search, setSearch] = useState("karur");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    const cityName = search.trim() === "" ? "karur" : search;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=93a536bc8b44dce8d89738b33d6c1256&units=metric`
    );

    const data = await response.json();
    setWeather(data);
  };

 
  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="weather-box">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeatherData()}
        />
        <FaSearch className="search-icon" onClick={getWeatherData} />
      </div>

      <WiCloud size={120} style={{ margin: "20px auto" }} />

              <p>Search the city you want to know the weather concdition and <span className="press-enter"> (PRESS ENTER) </span></p>


      <h1 className="temp-text">{weather?.main?.temp}°C</h1>
      <h2 className="city-text">{weather?.name}</h2>

      <div className="info-row">
        <div className="info-col">
          <WiHumidity size={40} className="weather-range"  />
          <div>
            <p>{weather?.main?.humidity}%</p>
            <small>Humidity</small>
          </div>
        </div>

        <div className="info-col">
          <WiStrongWind size={40} className="weather-range" />
          <div>
            <p>{weather?.wind?.speed} km/h</p>
            <small>Wind</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

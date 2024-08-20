import React, { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherIcon = (weather) => {
    switch(weather.toLowerCase()) {
      case 'clear':
        return <WbSunnyIcon />;
      case 'clouds':
        return <CloudIcon />;
      case 'snow':
        return <AcUnitIcon />;
      case 'rain':
      case 'drizzle':
        return <GrainIcon />;
      default:
        return <CloudIcon />;  // Default icon for unknown weather types
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await fetch(`/get_weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.error);
        setWeatherData(null);
      }
    } catch (error) {
      setError('An error occurred while fetching the weather data.');
      setWeatherData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.city}</h2>
          {getWeatherIcon(weatherData.weather)}
          <p>{weatherData.weather}</p>
          <p>{weatherData.temperature}ºF</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default WeatherApp;
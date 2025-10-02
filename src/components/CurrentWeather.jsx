import React from 'react';
import { convertTemperature, getWeatherIcon } from '../utils/weatherAPI';

const CurrentWeather = ({ data, unit, isCurrentLocation }) => {
  if (!data) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    visibility,
    sys: { sunrise, sunset }
  } = data;

  const currentTemp = convertTemperature(temp + 273.15, unit);
  const feelsLikeTemp = convertTemperature(feels_like + 273.15, unit);
  const weatherInfo = weather[0];

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get background class based on weather condition
  const getWeatherBackgroundClass = () => {
    const main = weatherInfo.main.toLowerCase();
    if (main.includes('clear')) return 'weather-bg-sunny';
    if (main.includes('rain')) return 'weather-bg-rainy';
    if (main.includes('cloud')) return 'weather-bg-cloudy';
    if (main.includes('snow')) return 'weather-bg-snowy';
    if (main.includes('thunderstorm')) return 'weather-bg-stormy';
    if (main.includes('drizzle')) return 'weather-bg-drizzle';
    return 'weather-bg-default';
  };

  return (
    <div className={`current-weather ${getWeatherBackgroundClass()}`}>
      <div className="weather-content">
        <div className="weather-header">
          <h2>
            {name}, {country}
            {isCurrentLocation && <span className="current-location-indicator">📍</span>}
          </h2>
          <p className="weather-description">{weatherInfo.description}</p>
          {isCurrentLocation && (
            <div className="current-location-message">
              Showing weather for your current location
            </div>
          )}
        </div>

        <div className="weather-main">
          <div className="temperature-section">
            <div className="current-temp">
              {currentTemp}°{unit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="weather-icon-container">
              <img 
                src={getWeatherIcon(weatherInfo.icon)} 
                alt={weatherInfo.description}
                className="weather-icon"
              />
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{feelsLikeTemp}°</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{humidity}%</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{pressure} hPa</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sunrise</span>
                <span className="detail-value">{formatTime(sunrise)}</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
               <span className="detail-label">Sunset&nbsp;</span>
                <span className="detail-value">{formatTime(sunset)}</span>
              </div>
              <div className="detail-item empty-item">
                {/* Empty item for alignment */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
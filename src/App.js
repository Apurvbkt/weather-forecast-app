import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useTheme } from './context/ThemeContext';
import { 
  getCurrentWeather, 
  getForecast, 
  getWeatherByCoords 
} from './utils/weatherAPI';
import './App.css';

function App() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('celsius');
  const [city, setCity] = useState('');
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit) {
      setUnit(savedUnit);
    }

    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    setLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use getWeatherByCoords for both current and forecast
            const current = await getWeatherByCoords(latitude, longitude);
            const forecast = await getForecastByCityName(current.name); // Use city name from current weather
            
            setWeatherData(current);
            setForecastData(forecast);
            setCity(current.name);
            setIsCurrentLocation(true);
            setError('');
            
          } catch (err) {
            console.log('Current location failed:', err);
            tryFallbackToSavedCity();
          } finally {
            setLoading(false);
            setLocationLoading(false);
          }
        },
        (error) => {
          console.log('Location access denied:', error);
          tryFallbackToSavedCity();
          setLocationLoading(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      console.log('Geolocation not supported');
      tryFallbackToSavedCity();
      setLocationLoading(false);
    }
  };

  // Helper function to get forecast by city name
  const getForecastByCityName = async (cityName) => {
    try {
      return await getForecast(cityName);
    } catch (error) {
      throw new Error('Failed to get forecast data');
    }
  };

  const tryFallbackToSavedCity = () => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    
    if (savedCity) {
      console.log('Loading saved city:', savedCity);
      fetchWeatherData(savedCity);
    } else {
      setLoading(false);
      setError('Please allow location access or search for a city to see weather data.');
      setIsCurrentLocation(false);
    }
  };

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    setIsCurrentLocation(false);
    
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName)
      ]);
      
      setWeatherData(current);
      setForecastData(forecast);
      setCity(cityName);
      
      localStorage.setItem('lastSearchedCity', cityName);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const current = await getWeatherByCoords(lat, lon);
      const forecast = await getForecastByCityName(current.name);
      
      setWeatherData(current);
      setForecastData(forecast);
      setCity(current.name);
      setIsCurrentLocation(true);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data for your location');
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  const getWeatherBackground = () => {
    if (!weatherData) return 'default-bg';
    
    const main = weatherData.weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'sunny-bg';
    if (main.includes('rain')) return 'rainy-bg';
    if (main.includes('cloud')) return 'cloudy-bg';
    if (main.includes('snow')) return 'snow-bg';
    return 'default-bg';
  };

  const clearSavedData = () => {
    localStorage.removeItem('lastSearchedCity');
    getCurrentLocationWeather();
  };

  return (
    <div className={`app ${getWeatherBackground()} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <button 
          onClick={toggleDarkMode}
          className="dark-mode-toggle"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <header className="app-header">
          <h1>Weather Forecast</h1>
          <p>Get accurate weather information worldwide</p>
          
          {locationLoading && (
            <div className="location-loading">
              <p>🔍 Detecting your location...</p>
              <small>Please allow location access for best experience</small>
            </div>
          )}
          
          {city && !locationLoading && (
            <div className="location-info">
              <div className="current-location-badge">
                {isCurrentLocation ? '📍 Your Current Location' : '🌍 Searched Location'}
              </div>
              <div className="last-saved-info">
                <small>Showing: {city}</small>
                {!isCurrentLocation && (
                  <button onClick={clearSavedData} className="clear-btn">
                    Clear History
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        <SearchBar 
          onSearch={fetchWeatherData} 
          onLocationClick={fetchWeatherByCoordinates}
        />

        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorMessage 
            message={error} 
            onRetry={isCurrentLocation ? getCurrentLocationWeather : () => fetchWeatherData(city)} 
          />
        )}

        {weatherData && !loading && (
          <>
            <div className="unit-toggle">
              <button 
                onClick={toggleUnit}
                className={`toggle-btn ${unit === 'celsius' ? 'active' : ''}`}
              >
                °C
              </button>
              <button 
                onClick={toggleUnit}
                className={`toggle-btn ${unit === 'fahrenheit' ? 'active' : ''}`}
              >
                °F
              </button>
            </div>

            <CurrentWeather 
              data={weatherData} 
              unit={unit} 
              isCurrentLocation={isCurrentLocation}
            />

            {forecastData && (
              <Forecast 
                data={forecastData} 
                unit={unit} 
              />
            )}
          </>
        )}

        {!isCurrentLocation && weatherData && !loading && (
          <div className="current-location-footer">
            <button 
              onClick={getCurrentLocationWeather}
              className="current-location-btn"
            >
              📍 See Weather for My Current Location
            </button>
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="welcome-message">
            <h3>Welcome to Weather App! 🌤️</h3>
            <p>Allow location access to see your local weather, or search for any city above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
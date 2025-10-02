import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Check if API key is missing
if (!API_KEY) {
  console.error('❌ REACT_APP_WEATHER_API_KEY is missing. Please check your .env file');
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Get current weather by city name
export const getCurrentWeather = async (city) => {
  try {
    // Check API key before making request
    if (!API_KEY) {
      throw new Error('Weather API key not configured. Please check your environment variables.');
    }

    const response = await api.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.message.includes('API key')) {
      throw error; // Re-throw our custom API key error
    } else {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }
};

// Get forecast by city name
export const getForecast = async (city) => {
  try {
    // Check API key before making request
    if (!API_KEY) {
      throw new Error('Weather API key not configured. Please check your environment variables.');
    }

    const response = await api.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.message.includes('API key')) {
      throw error; // Re-throw our custom API key error
    }
    throw new Error('Failed to fetch forecast data.');
  }
};

// Get current weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  try {
    // Check API key before making request
    if (!API_KEY) {
      throw new Error('Weather API key not configured. Please check your environment variables.');
    }

    const response = await api.get('/weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.message.includes('API key')) {
      throw error; // Re-throw our custom API key error
    }
    throw new Error('Failed to fetch weather data for your location.');
  }
};

// Temperature conversion
export const convertTemperature = (kelvin, unit) => {
  if (unit === 'celsius') {
    return Math.round(kelvin - 273.15);
  }
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};

// Weather icon URL
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

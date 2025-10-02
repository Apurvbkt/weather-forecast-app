import React from 'react';
import { convertTemperature, getWeatherIcon } from '../utils/weatherAPI';

const Forecast = ({ data, unit }) => {
  if (!data || !data.list) return null;

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Group forecasts by date
  const dailyForecasts = {};
  
  data.list.forEach(item => {
    const itemDate = new Date(item.dt * 1000);
    itemDate.setHours(0, 0, 0, 0); // Normalize to midnight
    const dateString = itemDate.toDateString();
    
    // Include dates from today onwards
    if (itemDate >= today) {
      if (!dailyForecasts[dateString]) {
        dailyForecasts[dateString] = {
          temps: [],
          weather: item.weather[0],
          date: itemDate.getTime() / 1000,
          feels_like: [],
          humidity: [],
          wind: []
        };
      }
      dailyForecasts[dateString].temps.push(item.main.temp);
      dailyForecasts[dateString].feels_like.push(item.main.feels_like);
      dailyForecasts[dateString].humidity.push(item.main.humidity);
      dailyForecasts[dateString].wind.push(item.wind.speed);
    }
  });

  // Sort by date
  const sortedDates = Object.keys(dailyForecasts).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  // Take first 5 dates (today + next 4)
  const forecastItems = sortedDates
    .slice(0, 5)
    .map((dateString, index) => {
      const forecast = dailyForecasts[dateString];
      const maxTemp = Math.max(...forecast.temps);
      const minTemp = Math.min(...forecast.temps);
      const avgHumidity = Math.round(forecast.humidity.reduce((a, b) => a + b, 0) / forecast.humidity.length);
      const avgWind = (forecast.wind.reduce((a, b) => a + b, 0) / forecast.wind.length).toFixed(1);
      
      // Day names
      const forecastDate = new Date(dateString);
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[forecastDate.getDay()];
      
      // Day display logic
      let displayDay;
      if (index === 0) {
        displayDay = 'Today';
      } else if (index === 1) {
        displayDay = 'Tomorrow';
      } else {
        displayDay = dayName;
      }
      
      return {
        date: forecast.date,
        day: displayDay,
        fullDate: forecastDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        maxTemp: convertTemperature(maxTemp + 273.15, unit),
        minTemp: convertTemperature(minTemp + 273.15, unit),
        weather: forecast.weather,
        humidity: avgHumidity,
        wind: avgWind,
        isToday: index === 0,
        isTomorrow: index === 1
      };
    });

  return (
    <div className="forecast">
      <h3>5-Day Weather Forecast</h3>
      <div className="forecast-items">
        {forecastItems.map((item, index) => (
          <div key={index} className={`forecast-item ${item.isToday ? 'today' : ''} ${item.isTomorrow ? 'tomorrow' : ''}`}>
            <div className="forecast-header">
              <div className="forecast-day">{item.day}</div>
              <div className="forecast-date">{item.fullDate}</div>
            </div>
            
            <img 
              src={getWeatherIcon(item.weather.icon)} 
              alt={item.weather.description}
              className="forecast-icon"
            />
            
            <div className="forecast-temps">
              <span className="forecast-max">{item.maxTemp}°</span>
              <span className="forecast-min">{item.minTemp}°</span>
            </div>
            
            <div className="forecast-desc">{item.weather.description}</div>
            
            <div className="forecast-details">
              <div className="forecast-detail">
                <span>💧</span>
                <span>{item.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span>💨</span>
                <span>{item.wind} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
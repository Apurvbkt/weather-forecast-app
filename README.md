# 🌤️ Weather Forecast App

A modern, responsive weather application built with React that provides real-time current weather conditions and 5-day forecasts for any city worldwide.

## ✨ Features

- **Current Weather** - Real-time temperature, humidity, wind speed, pressure, and visibility
- **5-Day Forecast** - Detailed weather predictions for tomorrow and next 4 days
- **City Search** - Find weather for any city globally
- **Current Location** - Automatic location detection with geolocation API
- **Dark Mode** - Toggle between light and dark themes
- **Temperature Units** - Switch between Celsius and Fahrenheit
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Local Storage** - Remembers user preferences and last searched city

## 🚀 Live Demo

(https://final-weather-app-apurva.netlify.app/)

## 🛠️ Tech Stack

- **Frontend:** React 18, CSS3
- **API:** OpenWeatherMap API
- **HTTP Client:** Axios
- **State Management:** React Context API + useState
- **Storage:** localStorage for user preferences

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/Apurvbkt/weather-forecast-app.git
cd weather-forecast-app
```
### Step 2: Install Dependencies
```bash
npm install
```
### Step 3: Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add your API key
# Add this line to .env file:
# REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```
### Step 4: Get API Key:
- Go to OpenWeatherMap
- Create free account
- Get API key from dashboard
- Add it to .env file

### Step 5: Run the Application
```bash
npm start
```




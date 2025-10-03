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
## 🎯 Design Choices & Assumptions

### 🏗️ Architecture Decisions

**Component Structure**
- **Functional Components with Hooks**: Used modern React patterns for better readability and testing
- **Context API for Theme Management**: Implemented global state for dark/light mode without over-engineering
- **Separation of Concerns**: Dedicated components for Search, Current Weather, Forecast, and UI elements

**State Management**
- **Local State**: Component-specific data (loading states, user input)
- **Context API**: Cross-component themes and user preferences
- **localStorage**: Persistent user settings (theme, unit preference, last city)

### 🎨 UI/UX Design Choices

**Responsive Design**
- **Mobile-First Approach**: Prioritized mobile experience with progressive enhancement
- **CSS Grid & Flexbox**: Modern layout techniques for consistent cross-device experience
- **Dynamic Backgrounds**: Weather-based gradient backgrounds for immersive experience

**User Experience**
- **Progressive Enhancement**: Core functionality works without JavaScript enhancements
- **Graceful Degradation**: Features degrade elegantly when dependencies are unavailable
- **Loading States**: Clear feedback during API calls and data processing

### 🔧 Technical Implementation

**API Integration**
- **OpenWeatherMap API**: Reliable weather data source with comprehensive features
- **Axios HTTP Client**: Robust error handling and request management
- **Error Boundaries**: Graceful handling of API failures and network issues

**Performance Optimization**
- **Efficient Re-renders**: Optimized dependency arrays and memoization
- **Smart Caching**: localStorage for user preferences and API response caching
- **Code Splitting**: Ready for lazy loading implementation

### 🤔 Assumptions Made

**User Environment**
- Modern browsers with ES6+ support and geolocation capabilities
- Reasonable network connectivity for API calls
- Standard screen sizes and input methods

**Business Rules**
- Metric system (Celsius) as default temperature unit
- 5-day forecast provides sufficient planning information
- Current location detection enhances user experience

**Technical Constraints**
- OpenWeatherMap free tier rate limits are adequate
- localStorage availability for persistence
- React 18 compatibility and lifecycle understanding

### 🔮 Future Considerations

**Scalability**
- Component structure supports easy feature additions
- State management ready for complex data flows
- API layer prepared for multiple data sources

**Maintainability**
- Clear separation between presentation and logic
- Reusable utility functions and custom hooks
- Comprehensive error handling and validation

---

*These design choices prioritize user experience, code maintainability, and performance while making reasonable assumptions about the target environment and user needs.*



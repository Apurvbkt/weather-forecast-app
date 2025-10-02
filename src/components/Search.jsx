import React, { useState } from 'react';

const SearchBar = ({ onSearch, onLocationClick }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (onLocationClick) {
            onLocationClick(latitude, longitude);
          }
        },
        (error) => {
          alert('Location access denied. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
      
      <button onClick={handleLocation} className="location-btn">
        📍 Get My Current Location
      </button>
    </div>
  );
};

export default SearchBar;
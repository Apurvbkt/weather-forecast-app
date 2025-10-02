export const localStorageService = {
  getLastSearchedCity: () => {
    return localStorage.getItem('lastSearchedCity');
  },

  setLastSearchedCity: (city) => {
    localStorage.setItem('lastSearchedCity', city);
  },

  getRecentCities: () => {
    const recent = localStorage.getItem('recentCities');
    return recent ? JSON.parse(recent) : [];
  },

  addToRecentCities: (city) => {
    const recent = localStorageService.getRecentCities();
    const filtered = recent.filter(c => c.toLowerCase() !== city.toLowerCase());
    const updated = [city, ...filtered].slice(0, 5);
    localStorage.setItem('recentCities', JSON.stringify(updated));
    return updated;
  },

  clearRecentCities: () => {
    localStorage.removeItem('recentCities');
    return [];
  },

  clearAllWeatherData: () => {
    localStorage.removeItem('lastSearchedCity');
    localStorage.removeItem('recentCities');
  }
};
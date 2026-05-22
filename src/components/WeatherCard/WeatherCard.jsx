import { useState, useEffect } from 'react';
import { getWeather } from '../../services/weatherApi';
import './WeatherCard.css';

function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Şəhər dəyişəndə yenidən yüklənir
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    getWeather(city)
      .then((data) => {
        if (isMounted) {
          setWeather(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Hava məlumatı yüklənə bilmədi.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [city]);

  if (loading) return <div className="weather-box">Loading weather...</div>;
  if (error) return <div className="weather-box error">{error}</div>;

  return (
    <div className="weather-box">
      <img 
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
        alt={weather.condition} 
        className="weather-icon"
      />
      <div className="weather-main">
        <span className="weather-temp">{weather.temp}°C</span>
        <span className="weather-desc">{weather.description}</span>
      </div>
      <div className="weather-details">
        <span>💧 {weather.humidity}%</span>
        <span>💨 {weather.wind} m/s</span>
      </div>
    </div>
  );
}

export default WeatherCard;
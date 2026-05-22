import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCountryData } from '../services/countriesApi';
import Checklist from '../components/Checklist/Checklist';
import BudgetCalculator from '../components/BudgetCalculator/BudgetCalculator';
import TripPlanner from '../components/TripPlanner/TripPlanner';
import './DestinationPage.css';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';

function DestinationPage() {
  const { city } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    fetchCountryData(city)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load country data. Please check the spelling.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [city]);

  if (loading) {
    return (
      <div className="dest-page">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <div className="loading-box">Loading data for {city}...</div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="dest-page">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <div className="error-box">{error}</div>
      </div>
    );
  }

  return (
    <div className="dest-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>

      <div className="dest-header">
        <img src={data.flag} alt={data.name} className="country-flag" />
        <h1 className="city-title">{data.name}</h1>
        <p className="country-sub">{data.region} {data.subregion && `• ${data.subregion}`}</p>
      </div>

      <PhotoGallery city={data.capital || data.name} />


      <WeatherCard city={data.capital || data.name} />

      <div className="info-grid">
        <div className="info-card">
          <h3>Capital</h3>
          <p>{data.capital}</p>
        </div>
        <div className="info-card">
          <h3>Population</h3>
          <p>{data.population}</p>
        </div>
        <div className="info-card">
          <h3>Language</h3>
          <p>{data.language}</p>
        </div>
        <div className="info-card">
          <h3>Currency</h3>
          <p>{data.currency} ({data.currencyCode})</p>
        </div>
      </div>

      <Checklist country={data.name} />
      <BudgetCalculator destinationCurrency={data.currencyCode || 'USD'} />
      <TripPlanner />
    </div>
  );
}

export default DestinationPage;
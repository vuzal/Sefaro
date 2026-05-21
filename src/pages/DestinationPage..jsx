import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDestinationData } from '../services/mockDestinationData';
import Checklist from '../components/Checklist/Checklist';
import BudgetCalculator from '../components/BudgetCalculator/BudgetCalculator';
import TripPlanner from '../components/TripPlanner/TripPlanner';
import './DestinationPage.css';

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

    getDestinationData(city)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load destination data.');
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
        <h1 className="city-title">{data.city}</h1>
        <p className="country-sub">{data.country}</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Weather</h3>
          <p>{data.temp}°C | {data.condition}</p>
        </div>
        <div className="info-card">
          <h3>Currency</h3>
          <p>{data.currency}</p>
        </div>
        <div className="info-card">
          <h3>Language</h3>
          <p>{data.language}</p>
        </div>
      </div>

      <Checklist country={data.country} />
      <BudgetCalculator destinationCurrency={data.currency} />
      <TripPlanner />
    </div>
  );
}

export default DestinationPage;
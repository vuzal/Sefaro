import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDestinationData } from '../services/mockDestinationData';
import Checklist from '../components/Checklist/Checklist';
import './DestinationPage.css';

function DestinationPage() {
  const { city } = useParams(); // URL-dən şəhər adını oxuyur (məs: /destination/Paris)
  const navigate = useNavigate(); // Başqa səhifəyə keçmək üçün

  const [data, setData] = useState(null); // Gələn məlumatı burada saxlayırıq
  const [loading, setLoading] = useState(true); // Yüklənir vəziyyəti
  const [error, setError] = useState(''); // Səhv olduqda göstəriləcək mesaj

  // Səhifə açılan kimi (və ya şəhər dəyişəndə) bu hissə işləyir
  useEffect(() => {
    let isMounted = true; // Səhifədən tez çıxsaq state yenilənməsin deyə

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

    // Təmizləmə funksiyası (komponent silinən və ya şəhər dəyişən zaman işləyir)
    return () => { isMounted = false; };
  }, [city]); // city dəyişəndə yenidən işə düşür

  // 1. Yüklənir vəziyyəti
  if (loading) {
    return (
      <div className="dest-page">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <div className="loading-box">Loading data for {city}...</div>
      </div>
    );
  }

  // 2. Səhv vəziyyəti
  if (error) {
    return (
      <div className="dest-page">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <div className="error-box">{error}</div>
      </div>
    );
  }

  // 3. Uğurlu yüklənmə
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
    </div>
  );
}

export default DestinationPage;
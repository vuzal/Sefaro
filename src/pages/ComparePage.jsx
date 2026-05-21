import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { compareCountries } from '../services/mockCompareData';
import './ComparePage.css';

function ComparePage(){
    const navigate=useNavigate();
    const [country1, setCountry1]=useState('France');
    const [country2, setCountry2]=useState('Japan');
    const [data, setData]=useState(null);
    const [ loading, setLoading]=useState(false);

    const countryList=['France', 'Japan', 'Azerbaijan', 'Turkey', 'United States'];

    const loadComparison=function(){
        setLoading(true);
        compareCountries(country1,country2)
        .then(function(result){
            setData(result);
            setLoading(false)
        });
    };

    useEffect(function(){
        loadComparison();

    },[country1,country2])

    return (
    <div className="compare-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
      
      <h1 className="page-title">🌍 Compare Destinations</h1>

      {/* Ölkə seçimi */}
      <div className="selectors">
        <div className="input-group">
          <label>Country 1</label>
          <select value={country1} onChange={(e) => setCountry1(e.target.value)}>
            {countryList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label>Country 2</label>
          <select value={country2} onChange={(e) => setCountry2(e.target.value)}>
            {countryList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Yüklənir göstəricisi */}
      {loading ? (
        <div className="loading-box">Loading comparison data...</div>
      ) : data ? (
        <div className="compare-grid">
          {/* Sol sütun */}
          <div className="compare-col">
            <h2>{country1}</h2>
            <ul className="info-list">
              <li><strong>Capital:</strong> {data.country1.capital}</li>
              <li><strong>Population:</strong> {data.country1.population}</li>
              <li><strong>Language:</strong> {data.country1.language}</li>
              <li><strong>Currency:</strong> {data.country1.currency}</li>
              <li><strong>Safety:</strong> {data.country1.safety}</li>
              <li><strong>Best Month:</strong> {data.country1.bestMonth}</li>
            </ul>
          </div>
          {/* Sağ sütun */}
          <div className="compare-col">
            <h2>{country2}</h2>
            <ul className="info-list">
              <li><strong>Capital:</strong> {data.country2.capital}</li>
              <li><strong>Population:</strong> {data.country2.population}</li>
              <li><strong>Language:</strong> {data.country2.language}</li>
              <li><strong>Currency:</strong> {data.country2.currency}</li>
              <li><strong>Safety:</strong> {data.country2.safety}</li>
              <li><strong>Best Month:</strong> {data.country2.bestMonth}</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );


}

export default ComparePage;
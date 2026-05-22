import { useState } from 'react';
import { getExchangeRate } from '../../services/exchangeRateApi';
import './BudgetCalculator.css';

function BudgetCalculator({ destinationCurrency }) {
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState({
    hotel: 100,
    food: 50,
    transport: 30,
    entertainment: 40
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBudgetChange = (category, value) => {
    const num = parseInt(value) || 0;
    setBudget(prev => ({ ...prev, [category]: num }));
  };

  const calculateBudget = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    const dailyTotal = budget.hotel + budget.food + budget.transport + budget.entertainment;
    const totalAZN = dailyTotal * days * travelers;

    try {
      const conversion = await getExchangeRate('AZN', destinationCurrency || 'USD', totalAZN);
      
      setResult({
        totalAZN,
        converted: conversion.converted,
        currency: conversion.to,
        perPerson: Math.round((totalAZN / travelers) * 100) / 100,
        perDay: Math.round(dailyTotal * 100) / 100,
        rate: conversion.rate
      });
    } catch (err) {
      setError(err.message || 'Valyuta hesablanarkən xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="budget">
      <h3 className="budget-title">💰 Budget Planner</h3>

      <div className="budget-inputs">
        <div className="input-group">
          <label>Days</label>
          <input type="number" min="1" value={days} onChange={(e) => setDays(parseInt(e.target.value) || 1)} />
        </div>
        <div className="input-group">
          <label>Travelers</label>
          <input type="number" min="1" value={travelers} onChange={(e) => setTravelers(parseInt(e.target.value) || 1)} />
        </div>
      </div>

      <div className="budget-categories">
        <div className="cat-input">
          <span>🏨 Hotel (per day)</span>
          <input type="number" min="0" value={budget.hotel} onChange={(e) => handleBudgetChange('hotel', e.target.value)} />
        </div>
        <div className="cat-input">
          <span>🍽️ Food (per day)</span>
          <input type="number" min="0" value={budget.food} onChange={(e) => handleBudgetChange('food', e.target.value)} />
        </div>
        <div className="cat-input">
          <span>🚕 Transport (per day)</span>
          <input type="number" min="0" value={budget.transport} onChange={(e) => handleBudgetChange('transport', e.target.value)} />
        </div>
        <div className="cat-input">
          <span>🎭 Entertainment (per day)</span>
          <input type="number" min="0" value={budget.entertainment} onChange={(e) => handleBudgetChange('entertainment', e.target.value)} />
        </div>
      </div>

      <button className="calc-btn" onClick={calculateBudget} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Total'}
      </button>

      {error && <p className="budget-error">⚠️ {error}</p>}

      {result && (
        <div className="budget-result">
          <div className="result-row">
            <span>Total (AZN):</span>
            <strong>{result.totalAZN} AZN</strong>
          </div>
          <div className="result-row highlight">
            <span>Total ({result.currency}):</span>
            <strong>{result.converted} {result.currency}</strong>
          </div>
          <div className="result-row">
            <span>Exchange Rate (1 AZN = {result.rate.toFixed(4)} {result.currency})</span>
          </div>
          <div className="result-row">
            <span>Per person:</span>
            <span>{result.perPerson} AZN</span>
          </div>
          <div className="result-row">
            <span>Per day (all travelers):</span>
            <span>{result.perDay} AZN</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetCalculator;
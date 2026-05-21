import { useState, useEffect } from 'react';
import { getSavedTrips, addTripToStorage, deleteTripFromStorage } from '../../services/localStorageTrips';
import './MyTrips.css';
import TripStats from '../TripStats/TripStats';

function MyTrips() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const saved = getSavedTrips();
    setTrips(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim() || !startDate || !endDate) return;

    const newTrip = {
      destination: destination.trim(),
      startDate,
      endDate,
      budget: Number(budget) || 0,
      notes: notes.trim()
    };

    const updated = addTripToStorage(newTrip);
    setTrips(updated);

    setDestination('');
    setStartDate('');
    setEndDate('');
    setBudget('');
    setNotes('');
  };

  const handleDelete = (id) => {
    const updated = deleteTripFromStorage(id);
    setTrips(updated);
  };

  return (
    <div className="my-trips">
        <TripStats trips={trips} />
      <h2 className="trips-title">💾 My Trips</h2>

      <form className="trip-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="Destination (e.g., Paris)" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-row">
          <input type="number" placeholder="Budget (AZN)" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <input type="text" placeholder="Quick notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button type="submit" className="add-trip-btn">+ Add Trip</button>
        </div>
      </form>

      <div className="trips-list">
        {trips.length === 0 ? (
          <p className="empty-msg">No trips saved yet. Plan your first adventure!</p>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <div className="trip-header">
                <h3>{trip.destination}</h3>
                <button className="delete-btn" onClick={() => handleDelete(trip.id)}>🗑️</button>
              </div>
              <p className="trip-dates">{trip.startDate} → {trip.endDate}</p>
              <p className="trip-budget">Budget: {trip.budget} AZN</p>
              {trip.notes && <p className="trip-notes">📝 {trip.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTrips;
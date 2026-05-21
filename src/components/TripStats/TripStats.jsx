import './TripStats.css';

function TripStats({ trips }) {
  const stats = {
    totalTrips: trips.length,
    totalBudget: trips.reduce((sum, t) => sum + (t.budget || 0), 0),
    totalDays: 0,
    countryCounts: {}
  };

  trips.forEach((trip) => {
    if (trip.startDate && trip.endDate) {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const diffTime = Math.abs(end - start);
      stats.totalDays += Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    }
    const country = trip.destination.split(',')[0].trim() || trip.destination;
    stats.countryCounts[country] = (stats.countryCounts[country] || 0) + 1;
  });

  stats.uniqueCountries = Object.keys(stats.countryCounts).length;
  const countryEntries = Object.entries(stats.countryCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = countryEntries.length > 0 ? countryEntries[0][1] : 1;

  return (
    <div className="trip-stats">
      <h3 className="stats-title">📊 Travel Statistics</h3>

      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-value">{stats.totalTrips}</span>
          <span className="stat-label">Total Trips</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.uniqueCountries}</span>
          <span className="stat-label">Countries</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalBudget} AZN</span>
          <span className="stat-label">Total Budget</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalDays}</span>
          <span className="stat-label">Days Planned</span>
        </div>
      </div>

      {countryEntries.length > 0 && (
        <div className="chart-section">
          <h4>Most Visited Destinations</h4>
          <div className="bar-chart">
            {countryEntries.map(([country, count]) => (
              <div key={country} className="bar-row">
                <span className="bar-label">{country}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TripStats;
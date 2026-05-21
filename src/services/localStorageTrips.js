export const getSavedTrips = () => {
  const stored = localStorage.getItem('sefaro_trips');
  return stored ? JSON.parse(stored) : [];
};

export const saveTripsToStorage = (trips) => {
  localStorage.setItem('sefaro_trips', JSON.stringify(trips));
};

export const addTripToStorage = (newTrip) => {
  const trips = getSavedTrips();
  const updated = [...trips, { ...newTrip, id: Date.now() }];
  saveTripsToStorage(updated);
  return updated;
};

export const deleteTripFromStorage = (tripId) => {
  const trips = getSavedTrips();
  const updated = trips.filter((trip) => trip.id !== tripId);
  saveTripsToStorage(updated);
  return updated;
};
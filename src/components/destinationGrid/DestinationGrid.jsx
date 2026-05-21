import { useNavigate } from 'react-router-dom';
import './DestinationGrid.css';

// Müvəqqəti olaraq şəhərləri birbaşa burada saxlayırıq
const cities = [
  { id: 1, name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { id: 2, name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { id: 3, name: "Baku", country: "Azerbaijan", image: "https://images.unsplash.com/photo-1623668900553-417b53489338?w=800&q=80" },
  { id: 4, name: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" }
];

function DestinationGrid() {
  const navigate = useNavigate(); // Başqa səhifəyə keçmək üçün

  return (
    <section className="destinations">
      <h2 className="destinations__heading">Popular Destinations</h2>
      <div className="destinations__grid">
        {/* Hər şəhər üçün kart yaradırıq */}
        {cities.map((city) => (
          <div
            key={city.id}
            className="destinations__card"
            // Karta klikləyəndə URL dəyişir və yeni səhifə açılır
            onClick={() => navigate(`/destination/${city.name}`)}
          >
            <img src={city.image} alt={city.name} className="destinations__img" />
            <div className="destinations__info">
              <h3 className="destinations__city">{city.name}</h3>
              <p className="destinations__country">{city.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DestinationGrid;
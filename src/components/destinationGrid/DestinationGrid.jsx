import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import './DestinationGrid.css';

const POPULAR = [
  { name: "France", city: "Paris", tag: "Romance & Art", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { name: "Japan", city: "Tokyo", tag: "Culture & Food", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { name: "Azerbaijan", city: "Baku", tag: "History & Modernity", image: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Turkey", city: "Istanbul", tag: "East meets West", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" },
  { name: "United Arab Emirates", city: "Dubai", tag: "Luxury & Desert", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { name: "Spain", city: "Barcelona", tag: "Beach & Architecture", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80" },
];

function DestinationGrid({ searchQuery }) {
  const [destinations, setDestinations] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const results = await Promise.all(
          POPULAR.map(async (dest) => {
            const res = await fetch(`https://restcountries.com/v3.1/name/${dest.name}?fullText=true`);
            const data = await res.json();
            const country = data[0];
            return {
              ...dest,
              flag: country.flags.svg,
              region: country.region,
            };
          })
        );
        setDestinations(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResult(null);
      setSearchError('');
      return;
    }
    const search = async () => {
      setSearchLoading(true);
      setSearchError('');
      setSearchResult(null);
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
        if (!res.ok) throw new Error('Country not found');
        const data = await res.json();
        const country = data[0];
        setSearchResult({
          name: country.name.common,
          city: country.capital?.[0] || country.name.common,
          tag: country.region,
          image: `https://source.unsplash.com/800x600/?${country.name.common},city`,
          flag: country.flags.svg,
          region: country.region,
        });
      } catch (err) {
        setSearchError(`No results found for "${searchQuery}"`);
      } finally {
        setSearchLoading(false);
      }
    };
    search();
  }, [searchQuery]);

  const renderCard = (dest, key) => (
    <Link key={key} to={`/destination/${dest.name}`} className="dest-card">
      <div className="dest-card-img-wrapper">
        <img src={dest.image} alt={dest.city} className="dest-card-img" />
        <div className="dest-card-overlay"></div>
        <span className="dest-card-tag">{dest.tag}</span>
        <img src={dest.flag} alt="flag" className="dest-card-flag" />
      </div>
      <div className="dest-card-body">
        <div className="dest-card-info">
          <div>
            <h3 className="dest-card-city">{dest.city}</h3>
            <p className="dest-card-country">
              <MapPin size={13} />
              {dest.name}
            </p>
          </div>
          <div className="dest-card-arrow">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="destinations">
      {searchQuery ? (
        <div className="destinations-search-result">
          <div className="destinations-header">
            <div>
              <p className="destinations-label">Search Result</p>
              <h2 className="destinations-heading">"{searchQuery}"</h2>
            </div>
          </div>
          {searchLoading && <div className="dest-loading">Searching...</div>}
          {searchError && <div className="dest-error">{searchError}</div>}
          {searchResult && renderCard(searchResult, 'search')}
        </div>
      ) : (
        <>
          <div className="destinations-header">
            <div>
              <p className="destinations-label">EXPLORE THE WORLD</p>
              <h2 className="destinations-heading">Popular Destinations</h2>
            </div>
            <p className="destinations-sub">Hand-picked places loved by travelers worldwide</p>
          </div>
          {loading ? (
            <div className="dest-loading-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="dest-skeleton"></div>
              ))}
            </div>
          ) : (
            <div className="destinations-grid">
              {destinations.map((dest) => renderCard(dest, dest.name))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default DestinationGrid;
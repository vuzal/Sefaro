import React from 'react';
import { Search, MapPin } from 'lucide-react';
import './HeroSearch.css';

export default function HeroSearch({ onSearch, onOpenQuiz }) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <MapPin size={14} />
          <span>Discover the world</span>
        </div>
        <h1 className="hero-title">Where to <span className="hero-title-highlight">next?</span></h1>
        <p className="hero-subtitle">Discover destinations, plan your trip, and stay on budget</p>
        <form className="hero-form" onSubmit={handleSubmit}>
          <div className="hero-input-wrapper">
            <Search size={18} className="hero-search-icon" />
            <input
              type="text"
              className="hero-input"
              placeholder="Search city or country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="hero-btn">Search</button>
        </form>
        <button className="hero-quiz-btn" onClick={onOpenQuiz}>
          ✨ Not sure where to go? Take a 30-sec quiz
        </button>
      </div>
    </section>
  );
}
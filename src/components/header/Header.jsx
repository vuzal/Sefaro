import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Menu, X } from 'lucide-react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo">
          <div className="header-logo-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#2563eb" />
              <path d="M10 22 L18 8 L26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M8 26 Q18 20 28 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="18" cy="18" r="2" fill="white" />
            </svg>
          </div>
          <span className="header-logo-text">Sefaro</span>
        </NavLink>

        <nav className={`header-nav ${menuOpen ? 'header-nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `header-link ${isActive ? 'header-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) => `header-link ${isActive ? 'header-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Compare
          </NavLink>
          <NavLink
            to="/my-trips"
            className={({ isActive }) => `header-link ${isActive ? 'header-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            My Trips
          </NavLink>
        </nav>

        <div className="header-right">
          <button className="header-cta">Login</button>
          <button
            className="header-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} color="#0f172a" /> : <Menu size={22} color="#0f172a" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
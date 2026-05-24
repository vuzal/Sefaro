import { NavLink } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <NavLink to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#2563eb" />
                <path d="M10 22 L18 8 L26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M8 26 Q18 20 28 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="18" cy="18" r="2" fill="white" />
              </svg>
            </div>
            <span className="footer-logo-text">Sefaro</span>
          </NavLink>
          <p className="footer-desc">Plan your next adventure with ease. Discover destinations, track budgets, and travel smarter.</p>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Quick Links</h4>
          <NavLink to="/" className="footer-link">Home</NavLink>
          <NavLink to="/compare" className="footer-link">Compare</NavLink>
          <NavLink to="/my-trips" className="footer-link">My Trips</NavLink>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Explore</h4>
          <a href="#" className="footer-link">Popular Destinations</a>
          <a href="#" className="footer-link">Travel Tips</a>
          <a href="#" className="footer-link">Budget Guide</a>
        </div>

        <div className="footer-contact">
          <h4 className="footer-title">Contact</h4>
          <a href="mailto:support@sefaro.com" className="footer-link">
            <Mail size={14} />
            support@sefaro.com
          </a>
          <p className="footer-location">
            <MapPin size={14} />
            Baku, Azerbaijan
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Sefaro. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo da indi səhifə keçidi edir */}
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">✈️</span>
          <h1 className="header__logo-text">Sefaro</h1>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/compare" className="header__link">Compare</Link>
        </nav>

        <button className="header__cta">Login</button>
      </div>
    </header>
  );
}

export default Header;
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo">✈️</span>
          <h3>Sefaro</h3>
          <p>Plan your next adventure with ease.</p>
        </div>
        <div className="footer__links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/compare">Compare</a>
          <a href="/my-trips">My Trips</a>
        </div>
        <div className="footer__info">
          <h4>Contact</h4>
          <p>support@sefaro.com</p>
          <p>© 2026 Sefaro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
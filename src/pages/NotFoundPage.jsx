import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">Page Not Found</h2>
        <p className="not-found__desc">The destination you're looking for doesn't exist. Let's get you back on track.</p>
        <button className="not-found__btn" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
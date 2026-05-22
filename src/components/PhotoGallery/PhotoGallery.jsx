import { useState, useEffect } from 'react';
import { getCityPhotos } from '../../services/unsplashApi';
import './PhotoGallery.css';

function PhotoGallery({ city }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    getCityPhotos(city)
      .then((data) => {
        if (isMounted) {
          setPhotos(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Şəkillər yüklənə bilmədi.");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [city]);

  if (loading) return <div className="gallery-box">Loading photos...</div>;
  if (error) return <div className="gallery-box error">{error}</div>;
  if (photos.length === 0) return <div className="gallery-box">No photos found for {city}.</div>;

  return (
    <div className="gallery-box">
      <h3 className="gallery-title">📸 {city} in Photos</h3>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <a
            key={photo.thumb}
            href={photo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-item"
          >
            <img src={photo.thumb} alt={photo.alt} loading="lazy" />
            <div className="gallery-overlay">
              <span>📷 {photo.photographer}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
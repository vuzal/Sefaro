const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getCityPhotos = async (city) => {
  if (!ACCESS_KEY) throw new Error("Unsplash API key tapılmadı. .env faylını yoxla.");

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&per_page=6&orientation=landscape`,
    {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
    }
  );

  if (!response.ok) throw new Error("Şəkillər yüklənə bilmədi.");

  const data = await response.json();

  return data.results.map((img) => ({
    thumb: img.urls.small,       
    full: img.urls.regular,    
    alt: img.alt_description || "City photo",
    photographer: img.user.name,
    link: img.links.html         
  }));
};
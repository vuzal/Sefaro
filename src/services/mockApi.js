export const getPopularDestinations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, city: "Paris", country: "Fransa", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
        { id: 2, city: "Tokyo", country: "Yaponiya", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
        { id: 3, city: "Bakı", country: "Azərbaycan", image: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFrdXxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 4, city: "İstanbul", country: "Türkiyə", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" },
      ]);
    }, 800);
  });
};

export const getQuizRecommendation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🇮🇹 İtaliya – Mədəniyyət, tarix və dadlı yeməklər üçün ideal seçimdir!");
    }, 1000);
  });
};
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (city) => {
  if (!API_KEY) throw new Error("API key tapılmadı. .env faylını yoxla.");

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`
  );

  if (!response.ok) throw new Error("Bu şəhər üçün hava məlumatı tapılmadı.");

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    city: data.name,
    country: data.sys.country
  };
};
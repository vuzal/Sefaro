export const fetchCountryData = async (countryName) => {
  // Boşluqlu ölkə adları üçün (məs: "United States") kodlaşdırma vacibdir
  const encodedName = encodeURIComponent(countryName);
  
  const response = await fetch(`https://restcountries.com/v3.1/name/${encodedName}`);
  
  if (!response.ok) {
    throw new Error('Country data not found');
  }

  const data = await response.json();
  const country = data[0];

  return {
    name: country.name.common,
    capital: country.capital ? country.capital[0] : 'Unknown',
    population: country.population.toLocaleString(),
    currency: country.currencies ? Object.values(country.currencies)[0].name : 'Unknown',
    currencyCode: country.currencies ? Object.keys(country.currencies)[0] : '',
    language: country.languages ? Object.values(country.languages)[0] : 'Unknown',
    flag: country.flags.svg,
    region: country.region || '',
    subregion: country.subregion || ''
  };
};
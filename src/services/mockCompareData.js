export const compareCountries = function(country1, country2) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const data = {
        France: { capital: "Paris", population: "67M", language: "French", currency: "EUR", safety: "High", bestMonth: "June" },
        Japan: { capital: "Tokyo", population: "125M", language: "Japanese", currency: "JPY", safety: "Very High", bestMonth: "April" },
        Azerbaijan: { capital: "Baku", population: "10M", language: "Azerbaijani", currency: "AZN", safety: "High", bestMonth: "May" },
        Turkey: { capital: "Ankara", population: "84M", language: "Turkish", currency: "TRY", safety: "Medium", bestMonth: "September" },
        "United States": { capital: "Washington D.C.", population: "331M", language: "English", currency: "USD", safety: "Medium", bestMonth: "October" }
      };

      const defaultInfo = { capital: "Unknown", population: "-", language: "-", currency: "-", safety: "-", bestMonth: "-" };

      resolve({
        country1: data[country1] || defaultInfo,
        country2: data[country2] || defaultInfo
      });
    }, 600);
  });
};
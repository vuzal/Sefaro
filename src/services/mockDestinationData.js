export const getDestinationData = function(city) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const mockData = {
        Paris: { country: "France", temp: 22, condition: "Sunny", currency: "EUR", language: "French" },
        Tokyo: { country: "Japan", temp: 28, condition: "Cloudy", currency: "JPY", language: "Japanese" },
        Baku: { country: "Azerbaijan", temp: 25, condition: "Partly Cloudy", currency: "AZN", language: "Azerbaijani" },
        Istanbul: { country: "Turkey", temp: 26, condition: "Clear", currency: "TRY", language: "Turkish" }
      };

      if (mockData[city]) {
        resolve({ city: city, country: mockData[city].country, temp: mockData[city].temp, condition: mockData[city].condition, currency: mockData[city].currency, language: mockData[city].language });
      } else {
        resolve({ city: city, country: "Unknown", temp: 20, condition: "Clear", currency: "USD", language: "English" });
      }
    }, 1000);
  });
};
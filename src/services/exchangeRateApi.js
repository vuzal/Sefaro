export const getExchangeRate = async (fromCurrency, toCurrency, amount) => {
  if (fromCurrency === toCurrency) {
    return { converted: amount, rate: 1, from: fromCurrency, to: toCurrency };
  }

  const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
  
  if (!response.ok) {
    throw new Error("Valyuta məlumatı yüklənə bilmədi.");
  }

  const data = await response.json();
  const rate = data.rates[toCurrency];

  if (!rate) {
    throw new Error(`${toCurrency} valyutası tapılmadı.`);
  }

  return {
    converted: Math.round(amount * rate * 100) / 100,
    rate: rate,
    from: fromCurrency,
    to: toCurrency
  };
};
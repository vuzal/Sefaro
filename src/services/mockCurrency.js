export const convertCurrency = function(amountAZN, targetCurrency) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const rates = {
        EUR: 0.55,
        USD: 0.59,
        JPY: 85.2,
        TRY: 19.8,
        GBP: 0.47,
        AZN: 1
      };

      const rate = rates[targetCurrency] || 1;
      const converted = amountAZN * rate;

      resolve({
        original: amountAZN,
        converted: Math.round(converted * 100) / 100,
        currency: targetCurrency,
        rate: rate
      });
    }, 500);
  });
};
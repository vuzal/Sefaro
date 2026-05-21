export const getVisaInfo = function(country) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const visaData = {
        France: { required: true, type: "Schengen Visa", processing: "15-30 days", note: "Apply at French Embassy in Baku" },
        Japan: { required: true, type: "Tourist Visa", processing: "5-7 days", note: "E-visa available" },
        Azerbaijan: { required: false, type: "No visa needed", processing: "0 days", note: "You are home!" },
        Turkey: { required: false, type: "Visa-free", processing: "0 days", note: "Stay up to 90 days" },
        "United States": { required: true, type: "B1/B2 Visa", processing: "30-60 days", note: "Interview required" }
      };

      if (visaData[country]) {
        resolve(visaData[country]);
      } else {
        resolve({ required: true, type: "Check with embassy", processing: "Varies", note: "Visa policies change often" });
      }
    }, 800);
  });
};
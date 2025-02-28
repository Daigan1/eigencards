require('dotenv').config()

async function getMarketSentiment() {
    const coinmarketApi = process.env.COINMARKET_API;

    const url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest";

    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-CMC_PRO_API_KEY': coinmarketApi,
              'Accept': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const marketSentiment = data.data.value_classification; // Adjust this based on the actual API response structure
      return marketSentiment;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

module.exports = {
    getMarketSentiment
}
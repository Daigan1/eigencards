require('dotenv').config()

async function getMarketSentiment() {
    const coinmarketApi = process.env.COINMARKET_API;

    const url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest";
    let marketSentiment = '';

    fetch(url, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': coinmarketApi,
        'Accept': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      marketSentiment = data.data.value_classification;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null
    });

    return marketSentiment;
}

module.exports = {
    getMarketSentiment
}
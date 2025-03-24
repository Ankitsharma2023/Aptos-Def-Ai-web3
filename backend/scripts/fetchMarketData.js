const axios = require("axios");

const fetchMarketData = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd");
    console.log("Aptos Price:", response.data.aptos.usd);
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
};

fetchMarketData();


const axios = require('axios');
const Cryptocurrency = require('../models/cryptocurrency');

async function fetchCryptoJob() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum,litecoin,ripple&vs_currencies=inr&include_market_cap=true&include_24hr_change=true');
    const { bitcoin, 'matic-network': matic, ethereum, litecoin, ripple } = response.data;
    console.log('Fetched crypto data:', response.data);
    // Store data in MongoDB
   
    await Cryptocurrency.insertMany([
      { name: 'Bitcoin', price: bitcoin.inr, marketCap: bitcoin.inr_market_cap, change24h: bitcoin.inr_24h_change },
      { name: 'Matic', price: matic.inr, marketCap: matic.inr_market_cap, change24h: matic.inr_24h_change },
      { name: 'Ethereum', price: ethereum.inr, marketCap: ethereum.inr_market_cap, change24h: ethereum.inr_24h_change },
      { name: 'Litecoin', price: litecoin.inr, marketCap: litecoin.inr_market_cap, change24h: litecoin.inr_24h_change },
      { name: 'Ripple', price: ripple.inr, marketCap: ripple.inr_market_cap, change24h: ripple.inr_24h_change },
    ]);
    
    console.log('Crypto data fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}

module.exports = fetchCryptoJob;

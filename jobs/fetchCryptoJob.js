const axios = require('axios');
const Cryptocurrency = require('../models/cryptocurrency');

async function fetchCryptoJob() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum,litecoin,ripple&vs_currencies=usd&include_market_cap=true&include_24hr_change=true');
    const { bitcoin, 'matic-network': matic, ethereum, litecoin, ripple } = response.data;
    console.log('Fetched crypto data:', response.data);
    // Store data in MongoDB
   
    await Cryptocurrency.insertMany([
      { name: 'Bitcoin', price: bitcoin.usd, marketCap: bitcoin.usd_market_cap, change24h: bitcoin.usd_24h_change },
      { name: 'Matic', price: matic.usd, marketCap: matic.usd_market_cap, change24h: matic.usd_24h_change },
      { name: 'Ethereum', price: ethereum.usd, marketCap: ethereum.usd_market_cap, change24h: ethereum.usd_24h_change },
      { name: 'Litecoin', price: litecoin.usd, marketCap: litecoin.usd_market_cap, change24h: litecoin.usd_24h_change },
      { name: 'Ripple', price: ripple.usd, marketCap: ripple.usd_market_cap, change24h: ripple.usd_24h_change },
    ]);
    
    console.log('Crypto data fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}

module.exports = fetchCryptoJob;

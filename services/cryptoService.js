const axios = require('axios');
const Crypto = require('../models/cryptocurrency'); // Adjust the path based on your structure

// Function to fetch and store cryptocurrency data
const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const promises = coins.map(coin =>
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`)
        );

        const results = await Promise.all(promises);

        for (let i = 0; i < coins.length; i++) {
            const coinData = results[i].data[coins[i]];
            const crypto = new Crypto({
                name: coins[i], // Ensure this matches your model's field
                price: coinData.usd,
                marketCap: coinData.usd_market_cap,
                change24h: coinData.usd_24h_change
            });

            await crypto.save(); // Save to MongoDB
        }

        console.log('Crypto data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

// Existing function to fetch cryptocurrency stats
const getStats = async (coin) => {
    if (!coin) {
        throw new Error('Coin parameter is required.');
    }
    const cryptoData = await Crypto.findOne({ name: coin }).sort({ createdAt: -1 });
    if (!cryptoData) {
        throw new Error('Data not found for the specified coin.');
    }
    return {
        price: cryptoData.price,
        marketCap: cryptoData.marketCap,
        "24hChange": cryptoData.change24h
    };
};

// Existing function to calculate the standard deviation of cryptocurrency prices
const getDeviation = async (coin) => {
    if (!coin) {
        throw new Error('Coin parameter is required.');
    }
    const cryptoData = await Crypto.find({ name: coin }).sort({ createdAt: -1 }).limit(100);
    if (cryptoData.length === 0) {
        throw new Error('No data found for the specified coin.');
    }

    const prices = cryptoData.map(record => record.price);

    // Calculate the mean
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

    // Calculate the variance
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;

    // Calculate the standard deviation
    const standardDeviation = Math.sqrt(variance);

    return { deviation: standardDeviation };
};

// Export all the service functions
module.exports = {
    fetchCryptoData,
    getStats,
    getDeviation
};

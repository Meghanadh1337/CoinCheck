const axios = require('axios');
const Crypto = require('../models/cryptocurrency'); // Adjust the path based on your structure

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
    getStats,
    getDeviation
};

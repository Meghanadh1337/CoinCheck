const cryptoService = require('../services/cryptoService'); // Import the service

// Function to fetch cryptocurrency stats
exports.getStats = async (req, res) => {
    const coin = req.query.coin; // Get the coin from query params

    try {
        const cryptoStats = await cryptoService.getStats(coin); // Use service function
        res.json(cryptoStats); // Send the response
    } catch (error) {
        console.error(error.message);
        if (error.message === 'Coin parameter is required.') {
            return res.status(400).json({ message: error.message });
        } else if (error.message === 'Data not found for the specified coin.') {
            return res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Function to calculate the standard deviation of cryptocurrency prices
exports.getDeviation = async (req, res) => {
    const coin = req.query.coin; // Get the coin from query params

    try {
        const cryptoDeviation = await cryptoService.getDeviation(coin); // Use service function
        res.json(cryptoDeviation); // Send the response
    } catch (error) {
        console.error(error.message);
        if (error.message === 'Coin parameter is required.') {
            return res.status(400).json({ message: error.message });
        } else if (error.message === 'No data found for the specified coin.') {
            return res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

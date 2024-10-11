// index.js
const express = require('express');
const connectDB = require('./config/db'); // Import your connectDB function
const cryptoRoutes = require('./routes/cryptoRoutes'); // Import your routes
const { fetchCryptoData } = require('./services/cryptoService'); // Import the fetchCryptoData function from the service

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Use your routes
app.use('/api', cryptoRoutes); // Prefix all routes with /api

// Fetch data every 2 hours (7200000 milliseconds)
setInterval(fetchCryptoData, 7200000);

// Initial fetch
fetchCryptoData();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

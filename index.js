// index.js
const express = require('express');
const connectDB = require('./config/db'); // Import your connectDB function
const cryptoRoutes = require('./routes/cryptoRoutes'); // Import your routes
const fetchCryptoJob = require('./jobs/fetchCryptoJob'); // Import the fetchCryptoJob function
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB
connectDB();

// Use your routes
app.use('/api', cryptoRoutes); // Prefix all routes with /api

// Fetch data every 2 hours (7200000 milliseconds)
setInterval(fetchCryptoJob, 7200000);

// Initial fetch
fetchCryptoJob();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

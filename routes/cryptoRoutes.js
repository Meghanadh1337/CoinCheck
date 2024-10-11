// routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const { getStats, getDeviation } = require('../controllers/cryptoController'); // Import your controller

// Define your routes
router.get('/stats', getStats); // Get stats for a specific coin
router.get('/deviation', getDeviation); // Get deviation for a specific coin

module.exports = router;

// src/routes/index.js

const express = require('express');
const router = express.Router();

// const v2NasabahRoutes = require('./v2/nasabahRoutes');
// router.use('/v2/nasabahs', v2NasabahRoutes);

const nasabahRoutes = require('./v1/nasabahRoutes');
const akunRoutes = require('./v1/akunRoutes');
const transaksiRoutes = require('./v1/transaksiRoutes');

router.use('/v1/nasabahs', nasabahRoutes);
router.use('/v1/akuns', akunRoutes);
router.use('/v1/transaksis', transaksiRoutes);

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const Sentry = require('./config/sentry');

const app = express();

// Setup Sentry request handler
app.use(Sentry.Handlers.requestHandler());  // Pastikan Sentry diinisialisasi dengan benar

// Middleware untuk parsing request body
app.use(express.json());

// Tambahkan rute aplikasi Anda di sini
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error handler dari Sentry
app.use(Sentry.Handlers.errorHandler());

// Middleware default untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost/my-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;

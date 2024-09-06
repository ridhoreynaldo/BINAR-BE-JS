const app = require('./app');
require('dotenv').config(); // Tambahkan ini di awal file server.js

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;

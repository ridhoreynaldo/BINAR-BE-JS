const express = require('express');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swagger');
const nasabahRoutes = require('./routes/nasabah');
const profileRoutes = require('./routes/profile');
const bankAkunRoutes = require('./routes/bankAkun');
const transaksiRoutes = require('./routes/transaksi');
const authRoutes = require('./routes/auth'); // Pastikan path ini benar

const app = express();

app.use(bodyParser.json());

app.use('/nasabah', nasabahRoutes);
app.use('/profile', profileRoutes);
app.use('/bankAkun', bankAkunRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/auth', authRoutes);

// Swagger setup
swaggerDocs(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;

require('dotenv').config();
const express = require('express');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

app.use(express.json());
app.use('/api', imageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

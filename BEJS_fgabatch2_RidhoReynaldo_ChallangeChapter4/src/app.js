// src/app.js

const express = require('express');
const routes = require('./routes');
const { port } = require('./config');

const app = express();

app.use(express.json());
app.use('/api', routes);

module.exports = app;

// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

// Koneksi database
connectDB().catch((err) => {
  console.error('Database connection error:', err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Employee Service Received Request: ${req.method} ${req.url}`);
  next();
});
app.use('/api/employees', employeeRoutes);
app.get('/', (req, res) => {
  res.send('Employee Service is running!');
});

module.exports = app;
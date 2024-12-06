require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/leaveRoutes');
const cors = require('cors');

connectDB().catch((err) => {
    console.error('Database connection error:', err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Leaves Service Received Request: ${req.method} ${req.url}`);
    next();
});
app.use('/api/leaves', employeeRoutes);
app.get('/', (req, res) => {
    res.send('Laeaves Service is running!');
});

module.exports = app;
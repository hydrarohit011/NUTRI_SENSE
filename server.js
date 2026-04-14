const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Placeholder for MongoDB connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided. Running without database persistence for prototype.');
}

// Simple healthcheck API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'NutriSense' });
});

// For Cloud Run deployment, serve the Vite built files from "frontend/dist"
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Catch-all route to serve React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

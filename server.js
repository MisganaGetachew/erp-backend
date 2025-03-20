const express = require('express');
require('dotenv').config();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(logger); // Log requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
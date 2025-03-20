const express = require('express');
const router = express.Router();

// Mock register endpoint
router.post('/register', (req, res) => {
  const { email, password, tenant_id } = req.body;
  if (!email || !password || !tenant_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Mock response
  res.status(201).json({
    message: 'User registered successfully',
    token: 'mock-jwt-token-12345',
    user: { email, tenant_id },
  });
});

// Mock login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Mock response
  res.json({
    message: 'Login successful',
    token: 'mock-jwt-token-67890',
    user: { email, tenant_id: 'mock-tenant' },
  });
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/config');

// Hardcoded user 
const fakeUser = { id: 1, username: 'testuser', password: 'password123' };

let refreshTokens = [];

// Login: Generate access and refresh tokens
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== fakeUser.username || password !== fakeUser.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const userPayload = { id: fakeUser.id, username: fakeUser.username };
  const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(userPayload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

  refreshTokens.push(refreshToken); // Store refresh token
  res.json({ accessToken, refreshToken });
});

// Refresh: Get new access token using refresh token
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid or missing refresh token' });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Expired or invalid refresh token' });
    }

    const userPayload = { id: decoded.id, username: decoded.username };
    const newAccessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    res.json({ accessToken: newAccessToken });
  });
});

// Logout: Remove refresh token
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;









// const express = require('express');
// const router = express.Router();

// // Mock register endpoint
// router.post('/register', (req, res) => {
//   const { email, password, tenant_id } = req.body;
//   if (!email || !password || !tenant_id) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }
//   // Mock response
//   res.status(201).json({
//     message: 'User registered successfully',
//     token: 'mock-jwt-token-12345',
//     user: { email, tenant_id },
//   });
// });

// // Mock login endpoint
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }
//   // Mock response
//   res.json({
//     message: 'Login successful',
//     token: 'mock-jwt-token-67890',
//     user: { email, tenant_id: 'mock-tenant' },
//   });
// });

// module.exports = router;
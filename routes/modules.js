const express = require('express');
const router = express.Router();

// Mock modules list
const mockModules = [
  { id: 1, name: 'Inventory', description: 'Manage stock and warehouses' },
  { id: 2, name: 'Accounting', description: 'Track finances and ledgers' }
  
];

// Get all modules
router.get('/', (req, res) => {
  res.json(mockModules);
});

// Select modules
router.post('/select', (req, res) => {
  const { module_ids } = req.body;
  if (!Array.isArray(module_ids) || module_ids.length === 0) {
    return res.status(400).json({ message: 'Invalid module_ids' });
  }
  // Mock response
  res.status(201).json({
    message: 'Modules selected successfully',
    selected: module_ids.map(id => mockModules.find(m => m.id === id)),
  });
});

// Provision modules
router.post('/provision', (req, res) => {
  // Mock user ID and tenant ID (since no auth)
  const user_id = 1; // Mocked for testing
  const tenant_id = 'tenant1'; // Mocked for testing

  // Mock response
  res.json({
    message: 'Modules provisioned successfully',
    modules: mockModules.filter(m => [1, 2].includes(m.id)), // Mock selection
    user_id,
    tenant_id,
  });
});

module.exports = router;
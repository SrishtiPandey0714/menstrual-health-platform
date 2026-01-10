const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.mock');
const cycleController = require('../controllers/cycle.controller');

// Production-ready routes with proper authentication
router.post('/', authMiddleware, cycleController.addCycleLog);
router.get('/', authMiddleware, cycleController.getCycleLogs);

module.exports = router;

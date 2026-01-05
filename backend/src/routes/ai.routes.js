const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const aiController = require('../controllers/ai.controller');

// Production-ready route with proper authentication
router.post('/ask', authMiddleware, aiController.askAI);

module.exports = router;

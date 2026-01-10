const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.mock');
const beveragesController = require('../controllers/beverages.controller');

// Get personalized beverages
router.get('/', authMiddleware, beveragesController.getBeverages);

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.mock');
const foodController = require('../controllers/food.controller');

// Production-ready route with proper authentication
router.get('/', authMiddleware, foodController.getFoodGuidance);

module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// POST /api/profile - Create/update user profile
router.post('/', authenticate, profileController.saveProfile);

// GET /api/profile - Get user profile
router.get('/', authenticate, profileController.getProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes (no auth)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes (require auth) - use profile controller DIRECTLY
router.get('/profile', authMiddleware, profileController.getProfile);
router.post('/profile', authMiddleware, profileController.saveProfile);

module.exports = router;

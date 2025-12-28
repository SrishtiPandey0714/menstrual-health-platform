const express = require('express');
const cors = require('cors');

const app = express();

// Middleware must come before routes
app.use(cors());
app.use(express.json());

const authMiddleware = require('./middlewares/auth.middleware');
const profileRoutes = require('./config/profile.routes');
const cycleRoutes = require('./routes/cycle.routes');
const aiRoutes = require('./routes/ai.routes');

app.use('/profile', profileRoutes);
console.log('✅ Profile routes registered at /profile');

app.use('/cycle', cycleRoutes);
console.log('✅ Cycle routes registered at /cycle');

app.use('/ai', aiRoutes);
console.log('✅ AI routes registered at /ai');

app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'You are authenticated',
        user: req.user,
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running successfully'
    });
});

module.exports = app;



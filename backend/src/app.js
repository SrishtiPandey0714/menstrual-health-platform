const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration - allow frontend on any localhost port
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow any localhost port
        if (origin.match(/^http:\/\/localhost:\d+$/)) {
            return callback(null, true);
        }

        // Allow specific network IP
        if (origin.startsWith('http://10.')) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const authMiddleware = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
// const profileRoutes = require('./routes/profile.routes'); // REMOVED - profile now in auth routes
const cycleRoutes = require('./routes/cycle.routes');
const aiRoutes = require('./routes/ai.routes');
const foodRoutes = require('./routes/food.routes');
const beveragesRoutes = require('./routes/beverages.routes');
const translateRoutes = require('./routes/translate.routes');

// Auth routes (no middleware - public endpoints)
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes registered');


// Temporarily disabled - profile endpoint now in auth routes
// app.use('/api/profile', profileRoutes);
// console.log('✅ Profile routes registered');

app.use('/api/cycle', cycleRoutes);
console.log('✅ Cycle routes registered');

app.use('/api/food', foodRoutes);
console.log('✅ Food routes registered');

app.use('/api/beverages', beveragesRoutes);
console.log('✅ Beverages routes registered');

app.use('/api/translate', translateRoutes);
console.log('✅ Translate routes registered');

app.use('/api/ai', aiRoutes);
console.log('✅ AI routes registered');

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



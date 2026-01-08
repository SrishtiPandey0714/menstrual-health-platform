const User = require('../models/User');

// Mock signup for development
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            email,
            password, // In development, storing plain password
            language: 'en',
        });

        await newUser.save();

        // Mock token
        const mockToken = Buffer.from(JSON.stringify({
            header: { alg: 'none' },
        })).toString('base64') + '.' +
            Buffer.from(JSON.stringify({
                sub: newUser._id.toString(),
                email: newUser.email,
            })).toString('base64') + '.mock_signature';

        res.status(201).json({
            message: 'User registered',
            token: mockToken,
            user: { id: newUser._id, email: newUser.email },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mock login for development
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Mock token
        const mockToken = Buffer.from(JSON.stringify({
            header: { alg: 'none' },
        })).toString('base64') + '.' +
            Buffer.from(JSON.stringify({
                sub: user._id.toString(),
                email: user.email,
            })).toString('base64') + '.mock_signature';

        res.json({
            token: mockToken,
            user: {
                id: user._id,
                email: user.email,
                language: user.language || 'en',
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mock logout
exports.logout = async (req, res) => {
    res.json({ message: 'Logged out' });
};

// Get profile - delegates to profile controller
exports.getProfile = async (req, res) => {
    const profileController = require('./profile.controller');
    return profileController.getProfile(req, res);
};

// Save profile - delegates to profile controller  
exports.saveProfile = async (req, res) => {
    const profileController = require('./profile.controller');
    return profileController.saveProfile(req, res);
};

module.exports = exports;

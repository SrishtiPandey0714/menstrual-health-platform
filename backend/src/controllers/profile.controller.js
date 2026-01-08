const User = require('../models/User');

// Save/Update Profile
exports.saveProfile = async (req, res) => {
    try {
        const userId = req.user.sub; // Changed from req.user.id
        const {
            ageGroup,
            country,
            language,
            diet,
            dietaryRestrictions,
            aiConsent,
        } = req.body;

        // Convert ageGroup to approximate age
        let age = 25; // default
        if (ageGroup === '13-17') age = 15;
        else if (ageGroup === '18-25') age = 21;
        else if (ageGroup === '26-40') age = 33;
        else if (ageGroup === '40+') age = 45;

        // Parse dietary restrictions and allergies from text
        const allergies = dietaryRestrictions
            ? dietaryRestrictions.split(',').map(a => a.trim()).filter(a => a)
            : [];

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                age,
                country,
                language: language || 'en',
                dietaryPreferences: diet ? [diet] : [],
                allergies,
                region: country, // using country as region for now
                hasCompletedOnboarding: true,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('✅ Profile updated for user:', updatedUser.email);

        res.json({
            message: 'Profile saved successfully',
            profile: {
                id: updatedUser._id,
                email: updatedUser.email,
                age: updatedUser.age,
                country: updatedUser.country,
                language: updatedUser.language,
                dietaryPreferences: updatedUser.dietaryPreferences,
                allergies: updatedUser.allergies,
                hasCompletedOnboarding: updatedUser.hasCompletedOnboarding,
            },
        });
    } catch (error) {
        console.error('Profile save error:', error);
        res.status(500).json({ message: 'Server error saving profile' });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.sub; // Changed from req.user.id

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            profile: {
                id: user._id,
                email: user.email,
                name: user.name,
                age: user.age,
                country: user.country,
                language: user.language,
                dietaryPreferences: user.dietaryPreferences,
                allergies: user.allergies,
                hasCompletedOnboarding: user.hasCompletedOnboarding,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};
